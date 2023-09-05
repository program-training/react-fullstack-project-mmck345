import styles from './TripForm.module.css'
import { useContext, useState } from "react";
import { PageContext } from "../../Contexts/PageContext";
import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools'
import { TripFormInterface } from '../../Interfaces/TripInterface';
import axios from 'axios';

interface Props {
    trip: Partial<TripFormInterface>,
    action: "update" | "create"
}
 
const TripForm = ({trip, action }: Props) => {

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

  
  const updateTripToServer = async (data: string) => {
    //FIXME: activities can be not type array and map not a function -> send to server array
    const put = await axios.put(
      `http://localhost:3000/api/trips/${trip.id}`,
       data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'test-token'
        }
      }
    )
    console.log(put.status);
  }

  const onSubmit = (data: TripFormInterface) => {
    action === "create" ? postTripToServer(JSON.stringify(data)) : updateTripToServer(JSON.stringify(data));
  }


  return (
    <div>
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
