import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import LoadingSkeleton from './components/LoadingSkeleton'
import AlertMsg from './components/AlertMsg'
import Mapper from './components/Mapper'
import TruckCard from './components/TruckCard'

export interface FoodTruck {
  dayOfWeek: number
  startTime: string
  endTime: string
  address: string
  lat: number
  lon: number
  description: string
  distance: number
  name: string
  id: string
}

type LocationState = {
  latitude: number
  longitude: number
}

function App() {
  const [location, setLocation] = useState<LocationState>({
    latitude: 37.7749,
    longitude: -122.4194
  })
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [selectedTruckId, setSelectedTruckId] = useState<string>('')

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        () => {
          console.log('Unable to retrieve your location')
        }
      )
    }
  }

  // Grab the user's location on app load
  useEffect(() => {
    getLocation()
  }, [])

  const handleClick = async () => {
    if (!location.latitude || !location.longitude) {
      setError(`Unable to get your location.`)
      return
    }
    setIsLoading(true)
    try {
      const now = new Date()
      const newParams = new URLSearchParams({
        dayOfWeek: now.getDay().toString(),
        time: now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        lat: location.latitude?.toString() || '',
        lon: location.longitude?.toString() || ''
      })
      const paramsString = newParams.toString()
      // TODO: Adjust proxy to get rid of localhost
      const response = await fetch(`http://localhost:8080/api/trucks?${paramsString}`)
      const json = await response.json()
      const data: FoodTruck[] = json.data
      setFoodTrucks(data)
      if (data.length === 0) {
        setError(`Nothing nearby or open right now! Get moving!`)
      }
      setIsLoading(false)
    } catch (error) {
      setError(`Unable to get any trucks right now.`)
      setIsLoading(false)
    }
  }

  const handleTruckClick = (id: string) => {
    const truck = foodTrucks.find((truck) => truck.id === id)
    if (truck) {
      setSelectedTruckId(truck.id)
    }
  }
  const truckPositions = foodTrucks.map((truck) => {
    return {
      id: truck.id,
      lat: truck.lat,
      lon: truck.lon,
      name: truck.name,
      description: truck.description
    }
  })
  return (
    <>
      <div className="relative h-screen flex flex-col space-y-4 items-center justify-center">
        <Mapper
          currentPos={{
            lat: location.latitude,
            lon: location.longitude
          }}
          trucks={truckPositions}
          selectedTruckId={selectedTruckId}
        />
        <div style={{ zIndex: 10000 }}>
          <div className="flex flex-col items-center justify-center space-y-4">
            {error && <AlertMsg error={error} />}
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
                    currentPos={{
                      lat: location.latitude,
                      lon: location.longitude
                    }}
                    truck={truck}
                    onClick={handleTruckClick}
                  />
                )
              })
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App

/*

*/
