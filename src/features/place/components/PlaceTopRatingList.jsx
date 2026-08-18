import { Loader2, Map } from "lucide-react";
import usePlacesTopRating from "../hooks/usePlacesTopRating";
import PlaceTopRatingItem from "./PlaceTopRatingItem";

const PlaceTopRatingList = () => {
  const { data: placesTopRating, isLoading } = usePlacesTopRating();
  const places = placesTopRating || [];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-slate-300 mb-4" />
        <p className="text-sm font-medium text-slate-500">
          Đang tải bảng xếp hạng...
        </p>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[320px] bg-slate-50/50 rounded-xl border border-slate-200 border-dashed">
        <div className="w-16 h-16 mb-4 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
          <Map className="w-8 h-8 text-slate-300" />
        </div>
        <p className="text-sm font-medium text-slate-500">
          Chưa có địa điểm nào được đánh giá.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-5">
      {places.map((place, index) => (
        <PlaceTopRatingItem key={place.id} place={place} rank={index + 1} />
      ))}
    </div>
  );
};

export default PlaceTopRatingList;