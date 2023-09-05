import styles from './TripDetail.module.css'
import TripCardDetails from "../TripCardDetails/TripCardDetails";
import { useContext, useEffect, useState } from 'react'
import { TripDetailsInterface } from "../../Interfaces/TripInterface";
import { PageContext } from '../../Contexts/PageContext';
import axios from 'axios';


const TripDetail = () => {
  
  const [tripData, setTripData] = useState<TripDetailsInterface | null>()
  const pageContext = useContext(PageContext);
  if (!pageContext) return;
  
  useEffect(() => {
    const fetchData = async () => {
      const dataTrips = await axios.get(`http://localhost:3000/api/trips/${pageContext.page.arg?.currentTripId}`);
      setTripData(dataTrips.data)
    }
    fetchData()
  }, [])

  

  return (
    <div>
      <button type="button" onClick={() => pageContext.setPage({currentPage: "Trips"})}>
          Go To Trips
      </button>

      <div className={styles.DivPreviewTrip}>
        {
          tripData && <TripCardDetails trip={tripData}></TripCardDetails>
        }
      </div>
    </div>
  );
};

export default TripDetail;
