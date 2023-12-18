import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSkeleton from "./components/LoadingSkeleton";
import Mapper from "./components/Mapper";

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
  id: string;
}

type LocationState = {
  latitude: number;
  longitude: number;
};

// const defaultCenter = [37.7636, -122.4174];

function App() {
  const [location, setLocation] = useState<LocationState>({
    latitude: 37.7749,
    longitude: -122.4194,
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
      setIsLoading(false);
    } catch (error) {
      // show error on screen!
      console.log("error", error);
      setIsLoading(false);
    }
  };
  const truckPositions = foodTrucks.map((truck) => {
    return { id: truck.id, lat: truck.lat, lon: truck.lon };
  });
  return (
    <>
      <div className="relative h-screen flex flex-col space-y-4 items-center justify-center">
        <Mapper
          currentPos={{ id: "user", lat: location.latitude, lon: location.longitude }}
          trucks={truckPositions}
        />
        <div style={{ zIndex: 10000 }}>
          <Button onClick={handleClick}>Find Food Trucks Open Now</Button>
          {isLoading ? (
            <div className="flex flex-col align-left space-y-4">
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </div>
          ) : (
            foodTrucks.map((truck) => {
              return (
                <Card className="w-[350px] text-left text-sm" key={truck.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Truck className="h-4 w-4" />
                      <CardTitle>{truck.name}</CardTitle>
                    </div>
                    <CardDescription>{truck.description}</CardDescription>
                    <p>Distance: {truck.distance.toPrecision(2)}m</p>
                  </CardHeader>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default App;

/*

*/
