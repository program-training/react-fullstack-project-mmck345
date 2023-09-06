import styles from './NewTripForm.module.css'
import { useContext } from "react";
import { PageContext } from "../../Contexts/PageContext";
import TripForm from '../TripForm/TripForm';
 
const NewTripForm = () => {

  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  return (
    <div>
      <TripForm trip={{}} action='create'></TripForm>
    </div>
  );
};

export default NewTripForm;
