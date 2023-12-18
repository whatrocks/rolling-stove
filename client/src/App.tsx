import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";

interface FoodTruck {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  address: string;
  lat: number;
  lon: number;
  description: string;
  distance: number;
  name: string;
  id: number;
}

type LocationState = {
  latitude: number | null;
  longitude: number | null;
};

function App() {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
  });
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleClick = async () => {
    // handle location not there 
    if (!location.latitude || !location.longitude) {
      // show error on screen!
      return;
    }
    setIsLoading(true);
    try {
      const now = new Date();
      const newParams = new URLSearchParams({
        dayOfWeek: now.getDay().toString(),
        time: now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        lat: location.latitude?.toString() || "",
        lon: location.longitude?.toString() || "",
      });
      const paramsString = newParams.toString();
      // adjust proxy to get rid of localhost
      const response = await fetch(
        `http://localhost:8080/api/trucks?${paramsString}`
      );
      const json = await response.json();
      const data: FoodTruck[] = json.data;
      setFoodTrucks(data);
      console.log("data", data);
      setIsLoading(false);
    } catch (error) {
      // show error on screen!
      console.log("error", error);
      setIsLoading(false);
    }
  };

  console.log("location", location);

  return (
    <>
      <div
        className={
          "h-screen flex flex-col space-y-4 items-center justify-center bg-slate-100"
        }
      >
        <Button onClick={handleClick}>Find Food Trucks Open Now</Button>
        {isLoading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          foodTrucks.map((truck) => {
            return (
            <Card className="w-[350px] text-left text-sm" key={truck.id}>
              <CardHeader>
                <CardTitle>{truck.name}</CardTitle>
                <CardDescription>{truck.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Distance: {truck.distance.toPrecision(2)}</p>
              </CardContent>
            </Card>
            );
          })
        )}
      </div>
    </>
  );
}

export default App;
