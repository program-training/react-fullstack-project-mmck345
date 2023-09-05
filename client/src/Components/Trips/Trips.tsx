import styles from './Trips.module.css'
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../../Contexts/PageContext";
import { TripInterface } from "../../Interfaces/TripInterface";
import axios from "axios";
import TripCard from "../TripCard/TripCard";

const Trips = () => {
  const [tripsData, setTripsData] = useState<TripInterface[] | null>([])
  const pageContext = useContext(PageContext);
  if (!pageContext) return;


  const fetchData = async () => {
    const dataTrips = await axios.get("http://localhost:3000/api/trips/");
    setTripsData([...dataTrips.data])
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    console.log(tripsData);
  }, [tripsData])

  return (
    <div>
      <button type="button" onClick={() => pageContext.setPage({currentPage: "Home"})}>
          Go To Home
      </button>
      <button type="button" onClick={() => pageContext.setPage({currentPage: "NewTripForm"})}>
          Create New Trip
      </button>
      <div className={styles.containerCards}>
        {
          tripsData && tripsData.map((trip: TripInterface) => <TripCard refreshTripsInParent={fetchData} key={trip.id} trip={trip}/>)
        }
      </div>
    </div>
    
  );
};

export default Trips;
