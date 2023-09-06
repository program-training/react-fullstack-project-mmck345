import styles from './UserForm.module.css'
import { useContext, useState } from "react";
import { PageContext } from "../../Contexts/PageContext";
import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools'
import axios from 'axios';
import { TokenContext } from '../../Contexts/AuthUserToken';

interface Props {
    action: "register" | "login"
}

interface UserData {
  email: string,
  password: string,
  rePassword: string
}

 
const UserForm = ({ action }: Props) => {

  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  
  const tokenContext = useContext(TokenContext);
  if (!tokenContext) return;
  const {token, setToken} = tokenContext;

  const userForm  = useForm<UserData>();
  const {register, control, handleSubmit} = userForm;

  const registerUser = async (data: UserData) => {
    const post = await axios.post(
      `http://localhost:3000/api/auth/register`,
       {
        email: data.email,
        password: data.password
       }
    )
    console.log(post);
  }

  const loginUser = async (data: UserData) => {
    const post = await axios.post(
      `http://localhost:3000/api/auth/login`,
       {
        email: data.email,
        password: data.password
       }
    )
    console.log(post);
    let token = post.data.responseObj.token;
    localStorage.setItem('token', token);
    setToken(token ? token : null);

  }
  

  const onSubmit = (data: UserData) => {
    console.log(data);
    action === "register" ? registerUser(data) : loginUser(data);
  }


  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
        
        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="email">Email:</label>
          <input type="email" className={`form-control`} id="inputEmailId" {...register('email')}/>
        </div>

        <div className={`${styles.formGroup} form-group`}>
          <label htmlFor="password">Password: </label>
          <input type="password" className={`form-control`}  id="inputPasswordId" {...register('password')}/>
        </div>

        {
          action === "register" && (
            <div className={`${styles.formGroup} form-group`}>
              <label htmlFor="rePassword">Type password again: </label>
              <input type="rePassword" className={`form-control`}  id="inputRePasswordId" {...register('rePassword')}/>
            </div>
            )
        }

        <button type="submit" className={`btn btn-primary`}>Submit</button>
      </form>

      <DevTool control={control}/>
    </div>

  );
};

export default UserForm;
