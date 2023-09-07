import styles from './TripCard.module.css';
import { TripInterface } from "../../Interfaces/TripInterface";
import { useContext } from 'react';
import { PageContext } from '../../Contexts/PageContext';
import axios from 'axios';
import { TokenContext } from '../../Contexts/AuthUserToken';

type Props = {
    trip: TripInterface;
    refreshTripsInParent: () => void
};

const TripCard = ({trip, refreshTripsInParent}: Props) => {
  
  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  
  const tokenContext = useContext(TokenContext);
  if (!tokenContext) return;
  const {token} = tokenContext;

  function handleClickTrip() {
    if (!pageContext) return;
    pageContext.setPage({
      currentPage: "TripDetail",
      arg: {
        currentTripId: trip.id
      }
    })
  }

  async function handleDeleteTrip(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation()
    if (!token) {
      console.log('You must be connected to make this action');
      return
    }
    try {
      const post = await axios.delete(`http://localhost:3000/api/trips/${trip.id}`, {headers: {'Authorization': token}})
      if (post.status === 200) {
        refreshTripsInParent()
      }
    }
    catch (error) {
      if (error && axios.isAxiosError(error) ) {
        error.response?.status === 401 && pageContext && pageContext.setPage({currentPage: "UserLogin"})
      }
    }
  }

  function handleEditTrip(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.stopPropagation();
    if (!token) {
      console.log('You must be connected to make this action');
      return
    }
    if (!pageContext) return;
    pageContext.setPage({
      currentPage: "UpdateTripForm",
      arg: {
        currentTripId: trip.id
      }
    })
  }

  return (
    <div className={`${styles.card} card`} onClick={handleClickTrip}>
          <div className={`bg-image hover-overlay ripple`} data-mdb-ripple-color="light" >
            <img src={trip.image} className={`${styles.imgFluid}, img-fluid`} style={{borderRadius:"7px", maxHeight:"250px"}} />
            <a href="#!">
            <div className="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}>

            </div>
          </a>
          </div>
            <div className={`${styles.cardBody} card-body`}>
              <div className={`${styles.divLocation} div-location`}>
                <h5 className={`card-title`}>{trip.name}</h5>
                <div className={`${styles.textLocation} text-location`}>
                  <span className="material-symbols-outlined">distance</span>
                  <p className={`${styles.cardText} card-text`}>{trip.destination}</p>
                </div>
              </div>
              <div className={styles.divDates}>
                <p className={`${styles.cardText} ${styles.textDates} card-text`}>Start: {trip.startDate}</p>
                <p className={`${styles.cardText} ${styles.textDates} card-text`}>End: {trip.endDate}</p>
              </div>
          </div>
          <div className={styles.divButtonsInCard}>
            <button type="button" className={styles.btnInCard} onClick={(e) => {handleDeleteTrip(e)}}><span className="material-symbols-outlined">delete</span></button>
            <button type="button" className={styles.btnInCard} onClick={(e) => {handleEditTrip(e)}}><span className="material-symbols-outlined">edit</span></button>
          </div>
          
      </div>
  );
};

export default TripCard;
