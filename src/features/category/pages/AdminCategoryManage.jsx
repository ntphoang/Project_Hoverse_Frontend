import { useSearchParams } from "react-router-dom";
import AdminCategoryList from "../components/AdminCategoryList";

const AdminCategoryManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isActive = searchParams.get("isActive") || "true";

  const getStatusLabel = (isActive) => {
    if (isActive === "true") return "Đang hoạt động";
    if (isActive === "false") return "Ngừng hoạt động";
    return isActive;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header khu vực quản lý */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Quản lý danh mục
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Duyệt và quản lý các danh mục của hệ thống
          </p>
        </div>

        {/* Control Tab */}
        <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/60 shrink-0">
          {["true", "false"].map((categoryStatus) => {
            const isSelected = isActive === categoryStatus;

            return (
              <button
                key={categoryStatus}
                type="button"
                onClick={() =>
                  setSearchParams({
                    isActive: categoryStatus,
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
                {getStatusLabel(categoryStatus)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Khu vực Render List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 md:p-4 min-h-[500px]">
        <AdminCategoryList isActive={isActive} />
      </div>
    </div>
  );
};

export default AdminCategoryManage;
