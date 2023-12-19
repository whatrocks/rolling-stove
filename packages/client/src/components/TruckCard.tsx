import { Truck, Clock, LandPlot, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { FoodTruck } from "../App";
import { googleMapsUrl } from "../lib/utils";

interface TruckCardProps {
  truck: FoodTruck;
  currentPos: { lat: number; lon: number };
  onClick: (id: string) => void;
}

export default function TruckCard({
  truck,
  currentPos,
  onClick,
}: TruckCardProps) {
  return (
    <Card className="w-[275px] text-left text-sm cursor-pointer" key={truck.id}>
      <CardHeader onClick={() => onClick(truck.id)}>
        <div className="flex items-center space-x-4">
          <Truck className="h-6 w-6" />
          <CardTitle>{truck.name}</CardTitle>
        </div>
        <CardDescription>{`${truck.description.slice(0, 50)}...`}</CardDescription>
      </CardHeader>
      <CardContent className="flex space-x-4 items-stretch items-start">
        <div>
          <LandPlot className="h-4 w-4" />
          <span>{truck.distance.toPrecision(2)}m</span>
        </div>

        <div className="hover:underline">
          <ArrowUpRight className="h-4 w-4" />
          <a
            href={googleMapsUrl(
              { lat: currentPos.lat, lon: currentPos.lon },
              { lat: truck.lat, lon: truck.lon }
            )}
            target="_blank"
          >
            Directions
          </a>
        </div>
        <div>
          <Clock className="h-4 w-4" />
          <span>{truck.startTime}-{truck.endTime}</span>
        </div>
      </CardContent>
    </Card>
  );
}
