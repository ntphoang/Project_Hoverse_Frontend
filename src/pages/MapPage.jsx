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
    <div className="relative h-screen w-full bg-slate-50">
      {/* HEADER */}
      <Header
        className="absolute left-0 right-0 top-0 z-[1000]"
        isMapPage={true}
      />

      {/* THANH TÌM KIẾM */}
      <div className="absolute left-1/2 top-4 z-[1001] w-[calc(100%-7rem)] max-w-md -translate-x-1/2 sm:top-5 sm:w-[40%]">
        <div className="mx-auto w-full max-w-md">
          <div className="flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/95 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-md transition-all duration-200 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200/80">
            <Search size={19} className="shrink-0 text-slate-400" />

            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm địa điểm..."
              aria-label="Tìm kiếm địa điểm"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
            />

            {keyword && (
              <button
                type="button"
                onClick={() => setKeyword("")}
                aria-label="Xóa nội dung tìm kiếm"
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CONTAINER CHỨA BẢN ĐÒ */}
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={15}
        zoomControl={false}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
              <div className="flex min-w-[180px] flex-col !gap-1 p-0.5">
                {place.coverImageUrl && (
                  <img
                    src={place.coverImageUrl}
                    alt={place.title}
                    className="h-24 w-full rounded-2xl border border-slate-100 object-cover"
                  />
                )}

                <div className="flex flex-col px-1">
                  <h3 className="!m-0 line-clamp-1 text-base font-semibold text-slate-900">
                    {place.title}
                  </h3>
                  <p className="!m-0 text-sm font-medium text-slate-500">
                    ⭐ {place.avgRating ?? 0} ({place.reviewCount ?? 0} đánh
                    giá)
                  </p>
                </div>

                <Link
                  to={`/places/${place.id}`}
                  className="mt-1 block w-full rounded-full bg-black px-4 py-2 text-center text-sm font-medium !text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
                >
                  Xem chi tiết
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Nút lấy lại vị trí hiện tại */}
      <button
        type="button"
        onClick={getGpsOfUser}
        title="Về vị trí hiện tại"
        aria-label="Về vị trí hiện tại"
        className="absolute bottom-6 right-4 z-[1000] flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:bg-slate-50 active:scale-95"
      >
        <LocateFixed size={22} />
      </button>
    </div>
  );
};

export default MapPage;
