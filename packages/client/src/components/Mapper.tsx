import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Mapper() {
  return (
    <MapContainer className="absolute" center={[51, 0]} zoom={13} scrollWheelZoom={false} style={{width: "100%", height: "100%"}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[51,0]} />
  </MapContainer>
  );
}
