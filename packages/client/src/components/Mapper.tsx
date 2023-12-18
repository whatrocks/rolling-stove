import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

interface Position {
  lat: number;
  lon: number;
  id: string;
}

interface MapperProps {
  currentPos: Position;
  trucks: Position[];
}

export default function Mapper({ currentPos, trucks }: MapperProps) {
  // console.log(currentLat, currentLon);
  return (
    <MapContainer
      className="absolute"
      center={[currentPos.lat, currentPos.lon]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <ChangeView center={[currentPos.lat, currentPos.lon]} zoom={13} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[currentPos.lat, currentPos.lon]} />
      {trucks.map((truck) => {
        return <Marker key={truck.id} position={[truck.lat, truck.lon]} />;
      })}
      <Marker position={[51, 0]} />
    </MapContainer>
  );
}
