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
      style={{ height: "100%", width: "100%", zIndex: 0 }}
    >
      <TileLayer
        attribution="..."
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMaker
        onSelectAddress={onSelectAddress}
        latitude={latitude}
        longitude={longitude}
      />
    </MapContainer>
  );
};

export default MapPicker;