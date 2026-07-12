import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";

function LocationMaker({ onSelectAddress, latitude, longitude }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      onSelectAddress(lat, lng);
    },
  });
  if (latitude == null || longitude == null) {
    return null;
  }
  return <Marker position={[latitude, longitude]}></Marker>;
}

const MapPicker = ({ latitude, longitude, onSelectAddress }) => {
  return (
    <MapContainer
      center={[latitude ?? 10.8231, longitude ?? 106.6297]}
      zoom={13}
      style={{ height: "150px", width: "100%", borderRadius: "20px" }}
    >
      <TileLayer
        attribution="..."
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></TileLayer>

      <LocationMaker
        onSelectAddress={onSelectAddress}
        latitude={latitude}
        longitude={longitude}
      ></LocationMaker>
    </MapContainer>
  );
};

export default MapPicker;
