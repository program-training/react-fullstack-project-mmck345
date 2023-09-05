import styles from './TripCard.module.css';
import { TripInterface } from "../../Interfaces/TripInterface";
import { useContext } from 'react';
import { PageContext } from '../../Contexts/PageContext';
import axios from 'axios';

type Props = {
    trip: TripInterface;
    refreshTripsInParent: () => void
};

const TripCard = ({trip, refreshTripsInParent}: Props) => {
  
  const pageContext = useContext(PageContext);
  if (!pageContext) return;

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
    const post = await axios.delete(
      `http://localhost:3000/api/trips/${trip.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'test-token'
        }
      }
    )
    console.log(post.status);
    
    if (post.status as number === 200) {
      refreshTripsInParent()
    }
  }

  function handleEditTrip(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.stopPropagation();
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
          <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
            <img src={trip.image} className={`${styles.imgFluid}, img-fluid`} />
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
