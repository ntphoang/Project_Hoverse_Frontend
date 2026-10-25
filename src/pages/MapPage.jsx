import Header from "@/components/common/Header";
import MapCenterUpdater from "@/features/gps/components/MapCenterUpdater";
import useGpsOfUser from "@/features/gps/hooks/useGpsOfUser";
import usePlaceForMap from "@/features/place/hooks/usePlaceForMap";
import { LocateFixed, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import { Link } from "react-router-dom";

const MapPage = () => {
  const { data: places } = usePlaceForMap();
  const { location, isGpsLoaded, getGpsOfUser } = useGpsOfUser();
  const [keyword, setKeyword] = useState("");

  const filteredPlace = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return places?.filter((place) =>
      place.title.toLowerCase().includes(normalizedKeyword),
    );
  }, [keyword, places]);

  return (
    <div className="relative h-[100dvh] w-full bg-slate-50 overflow-hidden">
      {/* HEADER (Toggle tự động nằm ở góc top-4, right-4) */}
      <Header isMapPage={true} />

      {/* THANH TÌM KIẾM */}
      {/* Căn top-4 để thẳng hàng ngang với Toggle. 
          Trên Mobile: left-4 và right-20 để không đè lên Toggle.
          Trên Desktop: Căn giữa màn hình. */}
      <div className="absolute left-4 right-20 top-4 z-[1001] md:left-1/2 md:right-auto md:w-full md:max-w-[400px] md:-translate-x-1/2">
        <div className="w-full">
          {/* Fix cứng h-11 để bằng chính xác chiều cao của icon Toggle */}
          <div className="flex h-11 items-center gap-3 rounded-full border border-slate-200/80 bg-white/95 px-4 shadow-lg shadow-slate-900/10 backdrop-blur-md transition-all duration-200 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200/80">
            <Search size={19} className="shrink-0 text-slate-400" />

            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm địa điểm..."
              aria-label="Tìm kiếm địa điểm"
              className="min-w-0 flex-1 bg-transparent text-[16px] font-medium text-slate-900 outline-none placeholder:text-slate-400 md:text-sm"
            />

            {keyword && (
              <button
                type="button"
                onClick={() => setKeyword("")}
                aria-label="Xóa nội dung tìm kiếm"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CONTAINER CHỨA BẢN ĐỒ */}
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={15}
        zoomControl={false}
        className="absolute inset-0 z-0 h-full w-full outline-none"
        maxZoom={24}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={19}
          maxZoom={24}
        />

        <MapCenterUpdater location={location} isGpsLoaded={isGpsLoaded} />

        <Marker position={[location.latitude, location.longitude]}>
          <Tooltip permanent direction="top" offset={[0, -10]}>
            <span className="font-semibold text-slate-900">Vị trí của bạn</span>
          </Tooltip>
        </Marker>

        {filteredPlace?.map((place) => (
          <Marker key={place.id} position={[place.latitude, place.longitude]}>
            <Tooltip permanent direction="top" offset={[0, -10]}>
              <span className="font-medium text-slate-700">{place.title}</span>
            </Tooltip>

            <Popup>
              <div className="flex w-[200px] max-w-[75vw] flex-col !gap-2 p-0.5 sm:w-[220px]">
                {place.coverImageUrl && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-100">
                    <img
                      src={place.coverImageUrl}
                      alt={place.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col px-1">
                  <h3 className="line-clamp-2 !m-0 text-base font-bold leading-tight text-slate-900">
                    {place.title}
                  </h3>
                  <p className="!m-0 mt-1 text-xs font-medium text-slate-500">
                    ⭐ {place.avgRating ?? 0} ({place.reviewCount ?? 0} đánh
                    giá)
                  </p>
                </div>

                <Link
                  to={`/places/${place.id}`}
                  className="mt-1 block w-full rounded-full bg-slate-900 px-4 py-2.5 text-center text-sm font-medium !text-white shadow-sm transition-all hover:bg-slate-800 active:scale-[0.98]"
                >
                  Xem chi tiết
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* NÚT LẤY LẠI VỊ TRÍ HIỆN TẠI */}
      {/* Cố định right-4 và h-11 w-11 để thẳng hàng và bằng kích thước với nút Toggle */}
      <button
        type="button"
        onClick={getGpsOfUser}
        title="Về vị trí hiện tại"
        aria-label="Về vị trí hiện tại"
        className="absolute bottom-6 right-4 z-[1000] flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-lg backdrop-blur-md transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95"
      >
        <LocateFixed size={22} />
      </button>
    </div>
  );
};

export default MapPage;
