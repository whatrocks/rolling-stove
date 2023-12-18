import Router from 'express-promise-router'
import { Request, Response } from 'express'

import { getAllFoodTrucks, filterTrucks } from '../db'

import { TruckParams } from 'types/params'
import { FoodTruck } from 'types/foodTruck'

const router = Router()

// Load our "trucks" db into memory
const trucks: FoodTruck[] = getAllFoodTrucks()

router.get('/', (req: Request, res: Response) => {
  const params: TruckParams = {
    lat: req.query.lat ? parseFloat(req.query.lat as string) : 0,
    lon: req.query.lon ? parseFloat(req.query.lon as string) : 0,
    dayOfWeek: req.query.dayOfWeek ? parseInt(req.query.dayOfWeek as string) : 0, // default to Sunday
    time: req.query.time ? (req.query.time as string) : ''
  }
  if (params.lat === 0 || params.lon === 0 || params.time === '') {
    res.status(400).json({ error: 'Missing required query parameters' })
    return
  }
  res.json({ data: filterTrucks(trucks, params) })
})

export default router
