export interface TripInterface {
    id: string
    name: string
    destination: string
    startDate: string
    endDate: string
    image: string
  }

  export interface TripDetailsInterface {
    id: string
    name: string
    destination: string
    startDate: string
    endDate: string
    description: string
    price: number
    image: string
    activities: string[]
  }
  

  
  export interface TripFormInterface {
    id: string
    name: string
    destination: string
    startDate: string
    endDate: string
    description: string
    price: number
    image: string
    activities: string[]
  }
  