import styles from "./RootComponent.module.css";
import { useContext } from "react";
import PageContextProvider, { PageContext } from "../../Contexts/PageContext";
import TokenContextProvider from "../../Contexts/AuthUserToken";
import Home from "../Home/Home";
import NewTripForm from "../NewTripForm/NewTripForm";
import TripDetail from "../TripDetail/TripDetail";
import Trips from "../Trips/Trips";
import UpdateTripForm from "../UpdateTripForm/UpdateTripForm";
import UserLogin from "../UserLogin/UserLogin";
import UserRegistration from "../UserRegistration/UserRegistration";
import Header from "../Header/Header";

const Root = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) return;
  const { page } = pageContext;

  return (
      <TokenContextProvider>
        <div className={styles.rootComponent}>
          <Header/>
          <main className={styles.main}>
            {(function (page: PageObj): JSX.Element {
              switch (page.currentPage) {
                case "Home":
                  return <Home />;
                case "Trips":
                  return <Trips />;
                case "TripDetail":
                  return <TripDetail />;
                case "UserLogin":
                  return <UserLogin />;
                case "UserRegistration":
                  return <UserRegistration />;
                case "NewTripForm":
                  return <NewTripForm />;
                case "UpdateTripForm":
                  return <UpdateTripForm />;
                default:
                  return <></>;
              }
            })(page)}
          </main>
          <footer>

          </footer>
          
          
        </div>
      </TokenContextProvider>
  );
};

export default Root;
