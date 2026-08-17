import { useSearchParams } from "react-router-dom";
import AdminTagList from "../components/AdminTagList";

const AdminTagManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isActive = searchParams.get("activeOnly") || "true";

  const getStatusLabel = (status) => {
    if (status == "true") return "Đang hoạt động";
    if (status == "false") return "Ngừng hoạt động";
  };
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header khu vực quản lý */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Quản lý tag
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Duyệt và quản lý các tag của hệ thống
          </p>
        </div>

        {/* Control Tab */}
        <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/60 shrink-0">
          {["true", "false"].map((tagStatus) => {
            const isSelected = isActive === tagStatus;

            return (
              <button
                key={tagStatus}
                type="button"
                onClick={() =>
                  setSearchParams({
                    activeOnly: tagStatus,
                  })
                }
                className={`
                  px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
                  ${
                    isSelected
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }
                `}
              >
                {getStatusLabel(tagStatus)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Khu vực Render List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 md:p-4 min-h-[500px]">
        <AdminTagList isActive={isActive}></AdminTagList>
      </div>
    </div>
  );
};

export default AdminTagManage;
