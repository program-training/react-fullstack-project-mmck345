import styles from './TripCardDetails.module.css'
import { TripDetailsInterface } from "../../Interfaces/TripInterface";

type Props = {
    trip: TripDetailsInterface;
};

const TripCardDetails = ({trip}: Props) => {

  return (
    <div className={`${styles.card} card`}>
          <div className={`${styles.imgWid} bg-image hover-overlay ripple`} data-mdb-ripple-color="light">
            <img src={trip.image} className={`img-fluid`} />
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
                <div className={styles.divDescriptionAndActivities}>
                  <h4>Description:</h4>
                  <p>{trip.description}</p>
                  <h4>Activities:</h4>
                  <ul>
                    {
                      trip.activities.length > 0 && trip.activities.map((active) => <li>{active}</li>)
                    }
                  </ul>
                </div>
              </div>
              <div className={styles.divDates}>
                <p className={`${styles.cardText} ${styles.textDates} card-text`}>Start: {trip.startDate}</p>
                <p className={`${styles.cardText} ${styles.textDates} card-text`}>End: {trip.endDate}</p>
              </div>
                
              
          </div>
          <div className={styles.divBottomCard}>
            <div className={styles.divButtonsInCard}>
              <button type="button" className={styles.btnInCard}><span className="material-symbols-outlined">delete</span></button>
              <button type="button" className={styles.btnInCard}><span className="material-symbols-outlined">edit</span></button>
            </div>
            <div className={styles.divPrice}>
              <h4>{`Price: ${trip.price}$`}</h4>
            </div>
          </div>
          
      </div>
  );
};

export default TripCardDetails;
