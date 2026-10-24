import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapCenterUpdater = ({ location, isGpsLoaded }) => {
  const map = useMap();

  useEffect(() => {
    if (!isGpsLoaded) {
      return;
    }
    map.setView([location.latitude, location.longitude], map.getZoom());
  }, [map, isGpsLoaded, location]);

  return null;
};

export default MapCenterUpdater;
