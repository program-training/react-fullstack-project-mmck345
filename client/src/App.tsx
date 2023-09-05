import './App.css'
import { useContext } from 'react'
import { PageContext } from './Contexts/PageContext'
import Home from './Components/Home/Home';
import Trips from './Components/Trips/Trips';
import TripDetail from './Components/TripDetail/TripDetail';
import NewTripForm from './Components/NewTripForm/NewTripForm';
import UpdateTripForm from './Components/UpdateTripForm/UpdateTripForm';
import UserLogin from './Components/UserLogin/UserLogin';
import UserRegistration from './Components/UserRegistration/UserRegistration';

function App() {

  const pageContext = useContext(PageContext);
  
  if (!pageContext) return;
  const { page } = pageContext;
  
  return (
    <>
        {
          function (page: PageObj): JSX.Element {
            switch (page.currentPage) {
              case "Home":
                return <Home/>
              case "Trips":
                return <Trips/>
              case "TripDetail":
                return <TripDetail/>
              case "UserLogin":
                return <UserLogin/>
              case "UserRegistration":
                return <UserRegistration/>
              case "NewTripForm":
                return <NewTripForm/>
              case "UpdateTripForm":
                return <UpdateTripForm/>         
              default:
                return <></>
            }
          }(page)
        }
    </>
  )
}

export default App
