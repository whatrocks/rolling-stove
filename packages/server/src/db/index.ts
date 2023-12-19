import { readFileSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import haversine from 'haversine'

import { FoodTruck } from 'types/foodTruck'
import { TruckParams } from 'types/params'
import { parseTime } from '../utils/date'

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapJSONtoFoodTruck(json: any): FoodTruck {
  return {
    dayOfWeek: parseInt(json.dayorder),
    startTime: json.start24,
    endTime: json.end24,
    address: json.location,
    lat: parseFloat(json.latitude),
    lon: parseFloat(json.longitude),
    description: json.optionaltext,
    name: json.applicant,
    id: uuidv4()
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function getAllFoodTrucks(): FoodTruck[] {
  const data = JSON.parse(readFileSync(path.join(__dirname, 'fixtures.json'), 'utf8'))
  const mappedData: FoodTruck[] = data.map(mapJSONtoFoodTruck)
  return mappedData
}

export function filterTrucks(trucks: FoodTruck[], params: TruckParams) {
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
    .reduce((acc: FoodTruck[], truck: FoodTruck) => {
      if (!acc.find((t: FoodTruck) => t.name === truck.name)) {
        acc.push(truck)
      }
      return acc
    }, [])
    .map((truck) => {
      const truckLocation = { latitude: truck.lat, longitude: truck.lon }
      const userLocation = { latitude: params.lat, longitude: params.lon }
      const distance = haversine(userLocation, truckLocation, { unit: 'mile' })
      return { ...truck, distance }
    })
    .filter((truck) => {
      return truck.distance <= 5 // Needs to be > 5 for my local testing :)
    })
    .sort((a, b) => {
      return a.distance - b.distance
    })
    .slice(0, 3)
}
