import { Truck } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FoodTruck } from "../App";

interface TruckCardProps {
    truck: FoodTruck;
    onClick: (id: string) => void;
}

export default function TruckCard({ truck, onClick }: TruckCardProps) {
  return (
    <Card className="w-[350px] text-left text-sm cursor-pointer" key={truck.id}>
      <CardHeader onClick={() => onClick(truck.id)}>
        <div className="flex items-center space-x-4">
          <Truck className="h-4 w-4" />
          <CardTitle>{truck.name}</CardTitle>
        </div>
        <CardDescription>
          Distance: {truck.distance.toPrecision(2)}m
        </CardDescription>
        <p>Directions</p>
      </CardHeader>
    </Card>
  );
}
