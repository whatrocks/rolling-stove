import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "./components/LoadingSkeleton";
import Mapper from "./components/Mapper";
import TruckCard from "./components/TruckCard";

export interface FoodTruck {
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

function App() {
  const [location, setLocation] = useState<LocationState>({
    latitude: 37.7749,
    longitude: -122.4194,
  });
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTruckId, setSelectedTruckId] = useState<string>("");

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

  const handleTruckClick = (id: string) => {
    const truck = foodTrucks.find((truck) => truck.id === id);
    if (truck) {
      // console.log("truck is ", truck.id)
      setSelectedTruckId(truck.id);
    }
  };
  const truckPositions = foodTrucks.map((truck) => {
    return {
      id: truck.id,
      lat: truck.lat,
      lon: truck.lon,
      name: truck.name,
      description: truck.description,
    };
  });
  return (
    <>
      <div className="relative h-screen flex flex-col space-y-4 items-center justify-center">
        <Mapper
          currentPos={{
            lat: location.latitude,
            lon: location.longitude,
          }}
          trucks={truckPositions}
          selectedTruckId={selectedTruckId}
        />
        <div style={{ zIndex: 10000 }}>
          <div className="flex flex-col items-center justify-center space-y-4">
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
                  <TruckCard
                    key={truck.id}
                    truck={truck}
                    onClick={handleTruckClick}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

/*

*/
