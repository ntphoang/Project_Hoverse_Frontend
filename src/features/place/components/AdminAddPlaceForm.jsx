import { useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import { toast } from "react-toastify";
import useCreatePlaceByAdmin from "../hooks/useCreatePlaceByAdmin";

const INITIAL_JSON = `{
  "place": {
    "title": "",
    "address": "",
    "latitude": 10.8231,
    "longitude": 106.6297,
    "categoryId": 1,
    "description": "",
    "tagIds": []
  },
  "sourceUrl": "",
  "creatorUsername": "",
  "permissionGrantedAt": "",
  "permissionConfirmed": true
}`;

const normalizeUrl = (value) => {
  if (typeof value !== "string") return value;

  let url = value.trim();

  // Trường hợp Markdown link: [text](https://...)
  const markdownMatch = url.match(
    /^\[(?:[^\]]*)\]\((https?:\\?\/\\?\/[^)]+)\)$/,
  );

  if (markdownMatch) {
    url = markdownMatch[1];
  }

  // Loại bỏ escape do AI tạo: https\://www\.tiktok\.com
  url = url.replace(/\\([.:/])/g, "$1");

  return url.trim();
};

const validateRequest = (value) => {
  let request;

  try {
    request = JSON.parse(value);
  } catch {
    throw new Error("JSON không hợp lệ. Vui lòng kiểm tra lại cú pháp.");
  }

  if (!request || typeof request !== "object" || Array.isArray(request)) {
    throw new Error("JSON phải là một object.");
  }

  const { place } = request;

  if (!place || typeof place !== "object" || Array.isArray(place)) {
    throw new Error('JSON phải có object "place".');
  }

  if (!place.title?.trim()) {
    throw new Error('Thiếu trường "place.title".');
  }

  if (!place.address?.trim()) {
    throw new Error('Thiếu trường "place.address".');
  }

  if (
    typeof place.latitude !== "number" ||
    !Number.isFinite(place.latitude) ||
    place.latitude < -90 ||
    place.latitude > 90
  ) {
    throw new Error('"place.latitude" phải là tọa độ hợp lệ.');
  }

  if (
    typeof place.longitude !== "number" ||
    !Number.isFinite(place.longitude) ||
    place.longitude < -180 ||
    place.longitude > 180
  ) {
    throw new Error('"place.longitude" phải là tọa độ hợp lệ.');
  }

  if (
    !Number.isInteger(Number(place.categoryId)) ||
    Number(place.categoryId) <= 0
  ) {
    throw new Error('"place.categoryId" phải là ID danh mục hợp lệ.');
  }

  if (
    place.tagIds !== undefined &&
    (!Array.isArray(place.tagIds) ||
      !place.tagIds.every(
        (id) => Number.isInteger(Number(id)) && Number(id) > 0,
      ))
  ) {
    throw new Error('"place.tagIds" phải là mảng các ID tag hợp lệ.');
  }

  request.sourceUrl = normalizeUrl(request.sourceUrl);

  if (!request.sourceUrl) {
    throw new Error('Thiếu trường "sourceUrl".');
  }

  try {
    const url = new URL(request.sourceUrl);

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error();
    }
  } catch {
    throw new Error('"sourceUrl" phải là URL hợp lệ.');
  }

  if (
    typeof request.creatorUsername !== "string" ||
    !request.creatorUsername.trim()
  ) {
    throw new Error('Thiếu trường "creatorUsername".');
  }

  if (
    typeof request.permissionGrantedAt !== "string" ||
    !request.permissionGrantedAt.trim() ||
    Number.isNaN(Date.parse(request.permissionGrantedAt))
  ) {
    throw new Error(
      '"permissionGrantedAt" phải là thời gian cấp quyền hợp lệ.',
    );
  }

  if (request.permissionConfirmed !== true) {
    throw new Error(
      '"permissionConfirmed" phải là true khi đã xác nhận quyền sử dụng.',
    );
  }

  return {
    ...request,
    place: {
      ...place,
      categoryId: Number(place.categoryId),
      tagIds: (place.tagIds ?? []).map(Number),
    },
  };
};

const AdminAddPlaceForm = ({ isOpen, onClose }) => {
  const [jsonInput, setJsonInput] = useState(INITIAL_JSON);
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const previewUrlsRef = useRef([]);
  const fileInputRef = useRef(null);

  const createPlaceMutation = useCreatePlaceByAdmin();
  const isPending = createPlaceMutation.isPending;

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const resetForm = () => {
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));

    previewUrlsRef.current = [];
    setJsonInput(INITIAL_JSON);
    setFiles([]);
    setPreviewUrls([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    if (isPending) return;
    resetForm();
    onClose?.();
  };

  const handleFilesChange = (event) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (selectedFiles.length === 0) return;

    const invalidFile = selectedFiles.find(
      (file) => !file.type.startsWith("image/"),
    );

    if (invalidFile) {
      toast.error("Chỉ được tải lên file hình ảnh.");
      event.target.value = "";
      return;
    }

    const newUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    previewUrlsRef.current = [...previewUrlsRef.current, ...newUrls];

    setFiles((prev) => [...prev, ...selectedFiles]);
    setPreviewUrls((prev) => [...prev, ...newUrls]);

    event.target.value = "";
  };

  const handleRemoveFile = (index) => {
    const removedUrl = previewUrls[index];

    if (removedUrl) {
      URL.revokeObjectURL(removedUrl);
      previewUrlsRef.current = previewUrlsRef.current.filter(
        (url) => url !== removedUrl,
      );
    }

    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let request;

    try {
      request = validateRequest(jsonInput);
    } catch (error) {
      toast.error(error.message);
      return;
    }

    if (files.length === 0) {
      toast.error("Vui lòng chọn ít nhất một ảnh địa điểm.");
      return;
    }

    createPlaceMutation.mutate(
      { request, files },
      {
        onSuccess: () => {
          toast.success("Thêm địa điểm thành công!");
          resetForm();
          onClose?.();
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message ||
              "Không thể tạo địa điểm. Vui lòng thử lại.",
          );
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm transition-all"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-900 tracking-tight">
              Thêm địa điểm (Admin)
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Dán JSON và tải ảnh lên để tạo địa điểm nhanh.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 disabled:opacity-50"
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 custom-scrollbar">
          <form
            id="admin-add-place-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="place-json"
                className="text-sm font-medium text-slate-700 ml-1"
              >
                JSON địa điểm <span className="text-danger">*</span>
              </label>

              <textarea
                id="place-json"
                value={jsonInput}
                onChange={(event) => setJsonInput(event.target.value)}
                spellCheck={false}
                required
                rows={16}
                disabled={isPending}
                placeholder="Dán JSON do AI tạo vào đây..."
                className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[1.5rem] font-mono text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 transition-all resize-y disabled:opacity-60"
              />

              <p className="mt-1 ml-1 text-xs text-slate-500">
                Dán JSON thuần, không bao gồm dấu ```json ở đầu và cuối. JSON
                phải có object place cùng thông tin nguồn và quyền sử dụng.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Hình ảnh đính kèm <span className="text-danger">*</span>
              </label>
              <div className="w-full">
                <input
                  ref={fileInputRef}
                  id="place-images"
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={isPending}
                  onChange={handleFilesChange}
                  className="block w-full text-sm text-slate-500 
                    file:mr-4 file:py-3 file:px-6 
                    file:rounded-full file:border-0 
                    file:text-sm file:font-semibold 
                    file:bg-slate-900 file:text-white 
                    hover:file:bg-slate-800 
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 
                    transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {files.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${file.size}-${index}`}
                      className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-200 bg-slate-100"
                    >
                      <img
                        src={previewUrls[index]}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        disabled={isPending}
                        title="Xóa ảnh này"
                        className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-danger hover:bg-white shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all disabled:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
                      >
                        <X size="{14}" strokeWidth="{3}" />
                      </button>

                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 rounded-md bg-slate-900/80 backdrop-blur-sm px-2 py-1 text-xs font-medium text-white">
                          Ảnh bìa
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-100 bg-white shrink-0 flex flex-col-reverse sm:flex-row justify-end gap-3 rounded-b-[2rem]">
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="w-full sm:w-auto px-6 py-3 md:py-3.5 rounded-full text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-50"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            form="admin-add-place-form"
            disabled={isPending}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 md:py-3.5 rounded-full text-sm font-medium text-white bg-black hover:bg-slate-800 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Đang tạo...
              </>
            ) : (
              "Tạo địa điểm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddPlaceForm;
