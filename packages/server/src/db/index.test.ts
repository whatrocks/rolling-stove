import { describe, it, expect } from '@jest/globals'

import { getAllFoodTrucks, filterTrucks } from './index'
import { FoodTruck } from 'types/foodTruck'
import { TruckParams } from 'types/params'

describe('getAllFoodTrucks', () => {
  it('fetchs all trucks in our database', async () => {
    expect(getAllFoodTrucks().length).toBe(1000)
  })
})

const mockTrucks: FoodTruck[] = [
  {
    dayOfWeek: 0,
    startTime: '10:00',
    endTime: '19:00',
    address: '123 Main St',
    lat: 37.71,
    lon: -122.4,
    description: 'test1',
    name: 'same-as-user-location',
    id: '1'
  },
  {
    dayOfWeek: 0,
    startTime: '09:00',
    endTime: '22:00',
    address: '234 Main St',
    lat: 37.7,
    lon: -122.4,
    description: 'test2',
    name: 'second-closest-to-user-location',
    id: '2'
  },
  {
    dayOfWeek: 0,
    startTime: '09:00',
    endTime: '22:00',
    address: '234 Main St',
    lat: 37.711,
    lon: -122.4,
    description: 'test3',
    name: 'third-closest-to-user-location',
    id: '3'
  },
  {
    dayOfWeek: 0,
    startTime: '09:00',
    endTime: '22:00',
    address: '234 Main St',
    lat: 37.7111,
    lon: -122.4,
    description: 'test4',
    name: 'fourth-closest-to-user-location',
    id: '4'
  },
  {
    dayOfWeek: 0,
    startTime: '09:00',
    endTime: '22:00',
    address: '234 Main St',
    lat: 39.71,
    lon: -122.4,
    description: 'test2',
    name: 'far-away-from-user-location',
    id: '5'
  },
  {
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '22:00',
    address: '234 Main St',
    lat: 37.7,
    lon: -122.4,
    description: 'test7',
    name: 'different-day',
    id: '6'
  },
  {
    dayOfWeek: 1,
    startTime: '18:00',
    endTime: '22:00',
    address: '234 Main St',
    lat: 37.7,
    lon: -122.4,
    description: 'test7',
    name: 'different-day-not-open',
    id: '7'
  },
  {
    dayOfWeek: 2,
    startTime: '09:00',
    endTime: '22:00',
    address: '234 Main St',
    lat: 37.7,
    lon: -122.4,
    description: 'test7',
    name: 'third-day-same-as-user-location',
    id: '8'
  },
  {
    dayOfWeek: 2,
    startTime: '18:00',
    endTime: '22:00',
    address: '234 Main St',
    lat: 50.7,
    lon: -122.4,
    description: 'test7',
    name: 'third-day-faraway',
    id: '9'
  },
  {
    dayOfWeek: 3,
    startTime: '09:00',
    endTime: '22:00',
    address: '234 Main St',
    lat: 37.7,
    lon: -122.4,
    description: 'duplicate',
    name: 'duplicate',
    id: '10'
  },
  {
    dayOfWeek: 3,
    startTime: '18:00',
    endTime: '22:00',
    address: '234 Main St',
    lat: 37.7,
    lon: -122.4,
    description: 'duplicate',
    name: 'duplicate',
    id: '11'
  }
]

describe('filterTrucks', () => {
  it('filters out trucks for different days', async () => {
    const params: TruckParams = {
      lat: 37.7,
      lon: -122.4,
      time: '12:00',
      dayOfWeek: 0
    }
    const results = filterTrucks(mockTrucks, params)
    expect(results.length).toBe(3)
  })
  it('filters out trucks that are not currently open', async () => {
    const params: TruckParams = {
      lat: 37.7,
      lon: -122.4,
      time: '09:30',
      dayOfWeek: 1
    }
    const results = filterTrucks(mockTrucks, params)
    expect(results.length).toBe(1)
  })
  // TODO: remove once location data model is available
  it('filters out duplicate trucks based on name', async () => {
    const params: TruckParams = {
      lat: 37.7,
      lon: -122.4,
      time: '09:30',
      dayOfWeek: 3
    }
    const results = filterTrucks(mockTrucks, params)
    expect(results.length).toBe(1)
  })
  it('filters out any results more than 5 miles radius away', async () => {
    const params: TruckParams = {
      lat: 37.71,
      lon: -122.4,
      time: '12:00',
      dayOfWeek: 2
    }
    const results = filterTrucks(mockTrucks, params)
    expect(results.length).toBe(1)
  })
  it('sorts results based on haversine distance', async () => {
    const params: TruckParams = {
      lat: 37.71,
      lon: -122.4,
      time: '12:00',
      dayOfWeek: 0
    }
    const results = filterTrucks(mockTrucks, params)
    expect(results.length).toBe(3)
    expect(results[0].name).toBe('same-as-user-location')
  })
  it('returns up to 3 max results', async () => {
    const params: TruckParams = {
      lat: 37.71,
      lon: -122.4,
      time: '12:00',
      dayOfWeek: 0
    }
    const results = filterTrucks(mockTrucks, params)
    expect(results.length).toBe(3)
  })
})
