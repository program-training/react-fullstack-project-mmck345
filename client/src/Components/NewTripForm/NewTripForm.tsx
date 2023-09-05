import styles from './NewTripForm.module.css'
import { useContext } from "react";
import { PageContext } from "../../Contexts/PageContext";
import TripForm from '../TripForm/TripForm';
 
const NewTripForm = () => {

  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  return (
    <div className={styles.mainContainer}>
      <button type="button" onClick={() => console.log("OnClickFromNewTripForm")}>
        Show More Details
      </button>

      <TripForm trip={{}} action='create'></TripForm>
    </div>
  );
};

export default NewTripForm;
