import { readFileSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

import { FoodTruck } from 'types/foodTruck'

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
    id: uuidv4(),
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function getAllFoodTrucks(): FoodTruck[] {
  const data = JSON.parse(readFileSync(path.join(__dirname, 'fixtures.json'), 'utf8'))
  const mappedData: FoodTruck[] = data.map(mapJSONtoFoodTruck)
  return mappedData
}
