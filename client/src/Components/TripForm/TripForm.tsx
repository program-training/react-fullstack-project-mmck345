import styles from './TripForm.module.css'
import { useContext, useState } from "react";
import { PageContext } from "../../Contexts/PageContext";
import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools'
import { TripFormInterface } from '../../Interfaces/TripInterface';
import axios from 'axios';
import { TokenContext } from '../../Contexts/AuthUserToken';

interface Props {
    trip: Partial<TripFormInterface>,
    action: "update" | "create"
}
 
const TripForm = ({trip, action }: Props) => {

  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  
  const tokenContext = useContext(TokenContext);
  if (!tokenContext) return;
  const {token} = tokenContext;

  const formNewTrip  = useForm<TripFormInterface>();
  const {register, control, handleSubmit} = formNewTrip;


  const postTripToServer = async (data: TripFormInterface) => {
    if (!token) {
      console.log('You must be connected to make this action');
      return
    }
    const post = await axios.post(
      `http://localhost:3000/api/trips`,
       data,
      {
        headers: {
          'Authorization': token
        }
      }
    )
    console.log(post.status);
  }

  
  const updateTripToServer = async (data: TripFormInterface) => {
    if (!token) {
      console.log('You must be connected to make this action');
      return
    }
    const put = await axios.put(
      `http://localhost:3000/api/trips/${trip.id}`,
       data,
      {
        headers: {
          'Authorization': token
        }
      }
    )
    console.log(put.status);
  }

  const onSubmit = (data: TripFormInterface) => {
    let strActivities = data.activities as unknown as string;
    data.activities = strActivities.split(",");
    console.log(data);
    action === "create" ? postTripToServer(data) : updateTripToServer(data);
  }


  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
        
        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="nameTrip">Trip Name: </label>
          <input type="text" className={`form-control`} id="inputNameTripId" {...register('name')} defaultValue={trip.name}/>
        </div>

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="destination">Destination: </label>
          <input type="text" className={`form-control`}  id="inputDestinationId" {...register('destination')} defaultValue={trip.destination}/>
        </div>

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="startDate">Start Date: </label>
          <input type="text" className={`form-control`}  id="inputStartDateId" {...register('startDate')} defaultValue={trip.startDate}/>
        </div>

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="endDate">End Date: </label>
          <input type="text" className={`form-control`} id="inputEndDateId" {...register('endDate')} defaultValue={trip.endDate}/>
        </div>

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="description">Description: </label>
          <input type="text" className={`form-control`} id="inputDescriptionId" {...register('description')} defaultValue={trip.description}/>
        </div>

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="price">Price: </label>
          <input type="text" className={`form-control`} id="inputPriceId" {...register('price')} defaultValue={trip.price}/>
        </div>
          
        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="image">Image link: </label>
          <input type="text" className={`form-control`} id="inputImageId" {...register('image')} defaultValue={trip.image}/>
        </div>

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="activities">Activities: </label>
          <input type="text" className={`form-control`} id="inputActivitiesId" {...register('activities')} defaultValue={trip.activities}/>
        </div>

        <button type="submit" className={`btn btn-primary`}>Submit</button>
      </form>

      <DevTool control={control}/>
    </div>

  );
};

export default TripForm;
