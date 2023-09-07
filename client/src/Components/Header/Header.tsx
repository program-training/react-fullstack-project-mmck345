import { useContext } from 'react';
import styles from './Header.module.css'
import { PageContext } from '../../Contexts/PageContext';
import { TokenContext } from '../../Contexts/AuthUserToken';


export default function Header() {

    const pageContext = useContext(PageContext);
    if (!pageContext) return;

    
  const tokenContext = useContext(TokenContext);
  if (!tokenContext) return;
  const {token, setToken} = tokenContext;


  function logout() {
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
  }

  return (
    <header className={styles.Header}>
      <div className="navbar">
        <button type="button" onClick={() => {pageContext.setPage({currentPage: "Home"})}}>Home</button>
        {pageContext.page.currentPage === "Trips" && <button type="button" onClick={() => {pageContext.setPage({currentPage: "NewTripForm"})}}>Create Trip</button> }
        {pageContext.page.currentPage === "TripDetail" && <button type="button" onClick={() => {pageContext.setPage({currentPage: "Trips"})}}>Go To Trips</button> }
        {
          token ? 
          <span style={{display:"flex"}}>
            <button type="button" onClick={logout}>Log Out</button>
            <h2 className={styles.userEmailHeader}>{localStorage.getItem("userEmail")}</h2>
          </span>
          :
          <span>
            <button type="button" onClick={() => {pageContext.setPage({currentPage: "UserLogin"})}}>Login</button>
          </span>
        }
      </div>
    </header>
  );
}
