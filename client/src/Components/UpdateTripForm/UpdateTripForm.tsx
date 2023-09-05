import styles from './UpdateTripForm.module.css'
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../../Contexts/PageContext";
import TripForm from "../TripForm/TripForm";
import { TripDetailsInterface } from "../../Interfaces/TripInterface";
import axios from "axios";

const UpdateTripFrom = () => {

  
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
    <div className={styles.mainContainer}>
      <button type="button" onClick={() => console.log("OnClickFromUpdateTripFrom")}>
        Show More Details
      </button>

      
      <TripForm trip={tripData ? tripData : {}} action='update'></TripForm>
    </div>
  );
};

export default UpdateTripFrom;


