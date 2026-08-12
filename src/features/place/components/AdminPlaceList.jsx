import Pagination from "@/components/common/Pagination";
import useAdminPlaces from "../hooks/useAdminPlaces";
import AdminPlaceItem from "./AdminPlaceItem";
import { Loader2, Inbox } from "lucide-react"; 

const AdminPlaceList = ({ tab, page, onPageChange }) => {
  const { data, isLoading } = useAdminPlaces({ tab, page });
  const places = data?.content || [];
  const totalPages = data?.totalPages;
  
  // Trạng thái đang tải
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 h-full min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400 mb-4" />
        <p className="text-sm font-medium">Đang tải dữ liệu...</p>
      </div>
    );
  }

  // Trạng thái trống (Không có dữ liệu)
  if (places.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 h-full min-h-[300px]">
        <Inbox className="w-12 h-12 mb-3 opacity-50" />
        <p className="text-sm font-medium text-slate-500">Chưa có địa điểm nào trong mục này.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {places.map((place) => (
        <AdminPlaceItem key={place.id} place={place} tab={tab} />
      ))}

      <Pagination onPageChange={onPageChange} totalPages={totalPages} currentPage={data?.pageable.pageNumber} ></Pagination>
    </div>
  );
};

export default AdminPlaceList;