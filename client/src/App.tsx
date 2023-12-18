import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import "./App.css";

interface FoodTruck {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  address: string;
  lat: number;
  lon: number;
  description: string;
  name: string;
  id: number;
}

function App() {
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      // TODO: proxy
      const response = await fetch("http://localhost:8080/api/trucks");
      const json = await response.json();
      const data: FoodTruck[] = json.data;
      setFoodTrucks(data);
      console.log("data", data);
      setIsLoading(false);
    } catch (error) {
      // show error on screen!
      console.log("error", error)
      setIsLoading(false);
    }    
  };

  return (
    <>
      <div
        className={
          "h-screen flex flex-col space-y-4 items-center justify-center"
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
            return <Button key={truck.id}>{truck.name}</Button>;
          })
        )}
      </div>
    </>
  );
}

export default App;

