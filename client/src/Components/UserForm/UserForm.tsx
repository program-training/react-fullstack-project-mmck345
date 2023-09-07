import styles from './UserForm.module.css'
import { useContext } from "react";
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
  const {setToken} = tokenContext;

  const userForm  = useForm<UserData>();
  const {register, control, handleSubmit} = userForm;

  const registerUser = async (data: UserData) => {
    try {
      const post = await axios.post(`http://localhost:3000/api/auth/register`, {email: data.email, password: data.password})
      if (post.status === 201) {
        console.log(post.data.message);
        pageContext && pageContext.setPage({currentPage: "UserLogin"});
      }
    }
    catch (error) {
      if (error && axios.isAxiosError(error) ) {
        console.log(error);
        error.response?.data.error === "User already exists" && pageContext.setPage({currentPage: "UserLogin"})
        //TODO: handle others error
      }
    }
  }

  const loginUser = async (data: UserData) => {

    try {
      const post = await axios.post(`http://localhost:3000/api/auth/login`, {email: data.email, password: data.password})
      if (post.status === 200) {
        let token = post.data.responseObj.token;
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', post.data.responseObj.user.email);
        setToken(token ? token : null);
        console.log(post.data.message);
        pageContext && pageContext.setPage({currentPage: "Trips"});
      }
    }
    catch (error) {
      if (error && axios.isAxiosError(error) ) {
        console.log(error);
        error.response?.data.error === "Invalid credentials" && console.log("Invalid credentials");
        //TODO: handle others error
      }
    }

    
  }
  

  const onSubmit = (data: UserData) => {
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
              <input type="password" className={`form-control`}  id="inputRePasswordId" {...register('rePassword')}/>
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
