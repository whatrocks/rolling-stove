import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app: Express = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
})

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

const trucks: FoodTruck[] = [
    {
        dayOfWeek: 1,
        startTime: "7AM",
        endTime: "8AM",
        address: "1420 YOSEMITE AVE",
        lat: 37.725009258328875,
        lon: -122.388305168263358,
        description: "Cold Truck: Pre-packaged sandwiches, snacks, fruit, various beverages",
        name: "My Cool Truck",
        id: 1,
    },
    {
        dayOfWeek: 1,
        startTime: "7AM",
        endTime: "12PM",
        address: "100 Cool Street",
        lat: 37.725009258328875,
        lon: -122.388305168263358,
        description: "awesome",
        name: "Number 2",
        id: 2,
    },
    {
        dayOfWeek: 1,
        startTime: "7AM",
        endTime: "8AM",
        address: "1420 YOSEMITE AVE",
        lat: 37.725009258328875,
        lon: -122.388305168263358,
        description: "Cold Truck: Pre-packaged sandwiches, snacks, fruit, various beverages",
        name: "My Cool Truck",
        id: 3,
    },
    {
        dayOfWeek: 2,
        startTime: "7AM",
        endTime: "8AM",
        address: "1420 YOSEMITE AVE",
        lat: 37.725009258328875,
        lon: -122.388305168263358,
        description: "Cold Truck: Pre-packaged sandwiches, snacks, fruit, various beverages",
        name: "My Cool Truck",
        id: 4,
    }
];


interface TruckParams {
    lat: number;
    lon: number;
    dayOfWeek: number; // 0-6
    time: string;
}

function getTrucks() {
    // TODO
    // filter by day of week, hours, then sort by distance
    return trucks.slice(0,2);
}


app.get("/api/trucks", (req: Request, res: Response) => {
    // todo use query params for lat lon (and other filter items)
    const trucks = getTrucks();
    res.json({ data: trucks });
});

app.listen(8080, async () => {
  console.log('Server is running at http://localhost:8080')
})