import { useSearchParams } from "react-router-dom";
import AdminPlaceList from "../components/AdminPlaceList";

const AdminPlaceManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "pending";
  const page = searchParams.get("page") || "0";

  const getStatusLabel = (status) => {
    if (status === "PENDING") return "Chờ duyệt";
    if (status === "APPROVED") return "Đã duyệt";
    if (status === "REJECTED") return "Bị từ chối";
    return status;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header khu vực quản lý */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Quản lý địa điểm
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Duyệt và quản lý các địa điểm do người dùng đề xuất
          </p>
        </div>

        {/* Control Tab */}
        <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/60 shrink-0">
          {["PENDING", "APPROVED", "REJECTED"].map((placeStatus) => {
            const isActive = tab === placeStatus.toLowerCase();

            return (
              <button
                key={placeStatus}
                type="button"
                onClick={() =>
                  setSearchParams({
                    tab: placeStatus.toLowerCase(),
                    page: "0",
                  })
                }
                className={`
                  px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
                  ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }
                `}
              >
                {getStatusLabel(placeStatus)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Khu vực Render List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 md:p-4 min-h-[500px]">
        <AdminPlaceList
          tab={tab}
          page={page}
          onPageChange={(newPage) => setSearchParams({ tab, page: newPage })}
        ></AdminPlaceList>
      </div>
    </div>
  );
};

export default AdminPlaceManage;
