import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MapIcon from "./MapIcon";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

interface Position {
  lat: number;
  lon: number;
  id?: string;
  name?: string;
  description?: string;
}

interface MapperProps {
  currentPos: Position;
  trucks: Position[];
  selectedTruckId: string | null;
}

export default function Mapper({
  currentPos,
  trucks,
  selectedTruckId,
}: MapperProps) {
  const focusPos = trucks.find((truck) => truck.id === selectedTruckId) || currentPos;
  return (
    <MapContainer
      className="absolute"
      center={[currentPos.lat, currentPos.lon]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100%" }}
    >
      <ChangeView center={[focusPos.lat - 0.03, focusPos.lon - 0.03]} zoom={13} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[currentPos.lat, currentPos.lon]} icon={MapIcon("mobile-device.png")} />
      {trucks.map((truck) => {
        const truckImage =
          selectedTruckId === truck.id ? "bullseye.png" : "truck.png";
        return (
          <Marker
            key={truck.id}
            position={[truck.lat, truck.lon]}
            icon={MapIcon(truckImage)}
          >
            <Popup>
              {truck.name}
              <br />
              {truck.description}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
