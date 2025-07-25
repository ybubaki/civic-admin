import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const StatsMapView = ({ data }) => {
  const customIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const markers = data.map((item) => {
    if (!item.latitude || !item.longitude) {
      return <></>;
    }
    return (
      <Marker
        key={item.id}
        position={[item.latitude, item.longitude]}
        icon={customIcon}
      ></Marker>
    );
  });

  return (
    <MapContainer center={[7.9465, 1.0232]} zoom={6} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
};

export default StatsMapView;
