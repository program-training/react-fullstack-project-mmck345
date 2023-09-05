import styles from './NewTripForm.module.css'
import { useContext, useState } from "react";
import { PageContext } from "../../Contexts/PageContext";
import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools'
import { TripFormInterface } from '../../Interfaces/TripInterface';
import axios from 'axios';
 
const NewTripForm = () => {

  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  const formNewTrip  = useForm<TripFormInterface>();
  const {register, control, handleSubmit} = formNewTrip;


  const postTripToServer = async (data: string) => {
    //FIXME: activities can be not type array and map not a function -> send to server array
    const post = await axios.post(
      `http://localhost:3000/api/trips`,
       data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'test-token'
        }
      }
    )
    console.log(post.status);
    
  }

  const onSubmit = (data: TripFormInterface) => {
    console.log('Form Submitted', data);
    postTripToServer(JSON.stringify(data))
  }


  return (
    <div className={styles.mainContainer}>
      <button type="button" onClick={() => console.log("OnClickFromNewTripForm")}>
        Show More Details
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
        
        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="nameTrip">Trip Name: </label>
          <input type="text" className={`form-control`} id="inputNameTripId" {...register('name')}/>
        </div>

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="destination">Destination: </label>
          <input type="text" className={`form-control`}  id="inputDestinationId" {...register('destination')}/>
        </div>

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="startDate">Start Date: </label>
          <input type="text" className={`form-control`}  id="inputStartDateId" {...register('startDate')}/>
        </div>

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="endDate">End Date: </label>
          <input type="text" className={`form-control`} id="inputEndDateId" {...register('endDate')}/>
        </div>

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="description">Description: </label>
          <input type="text" className={`form-control`} id="inputDescriptionId" {...register('description')}/>
        </div>

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="price">Price: </label>
          <input type="text" className={`form-control`} id="inputPriceId" {...register('price')}/>
        </div>
          

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="image">Image link: </label>
          <input type="text" className={`form-control`} id="inputImageId" {...register('image')}/>
        </div>

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="activities">Activities: </label>
          <input type="text" className={`form-control`} id="inputActivitiesId" {...register('activities')}/>
        </div>

        <button type="submit" className={`btn btn-primary`}>Submit</button>
      </form>

      <DevTool control={control}/>
    </div>
  );
};

export default NewTripForm;
