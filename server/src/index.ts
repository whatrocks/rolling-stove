import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import haversine from 'haversine'

import { FoodTruck } from './types/foodTruck'
import { TruckParams } from 'types/params'
import getAllFoodTrucks from './data'

const app: Express = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
})

// Load our "database"
const trucks: FoodTruck[] = getAllFoodTrucks()

function parseTime(timeString: string): number {
  const date = new Date()
  const [hours, minutes] = timeString.split(':').map((s) => parseInt(s, 10))
  return date.setHours(hours, minutes, 0, 0)
}

function getTrucks(params: TruckParams) {
  const currentTime = parseTime(params.time)
  return trucks
    .filter((truck) => {
      return truck.dayOfWeek === params.dayOfWeek
    })
    .filter((truck) => {
      const truckStartTime = parseTime(truck.startTime)
      const truckEndTime = parseTime(truck.endTime)
      return currentTime >= truckStartTime && currentTime <= truckEndTime
    })
    .map((truck) => {
      const truckLocation = { latitude: truck.lat, longitude: truck.lon }
      const userLocation = { latitude: params.lat, longitude: params.lon }
      const distance = haversine(userLocation, truckLocation)
      return { ...truck, distance }
    })
    .sort((a, b) => {
      return a.distance - b.distance
    })
    .slice(0, 3)
}

app.get('/api/trucks', (req: Request, res: Response) => {
  const params: TruckParams = {
    lat: req.query.lat ? parseFloat(req.query.lat as string) : 0,
    lon: req.query.lon ? parseFloat(req.query.lon as string) : 0,
    dayOfWeek: req.query.dayOfWeek ? parseInt(req.query.dayOfWeek as string) : 0,
    time: req.query.time ? (req.query.time as string) : ''
  }
  res.json({ data: getTrucks(params) })
})

app.listen(8080, async () => {
  console.log('Server is running at http://localhost:8080')
})
