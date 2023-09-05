import "./Home.module.css"
import { useContext, useState } from "react";
import { PageContext } from "../../Contexts/PageContext";

const Home = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  return (
    <div>
      <button type="button" onClick={() => pageContext.setPage({currentPage: "Trips"})}>
        Go To Trips Page
      </button>
      <button type="button" onClick={() => pageContext.setPage({currentPage: "UserRegistration"})}>
        Sign Up
      </button>
      <button type="button" onClick={() => pageContext.setPage({currentPage: "UserLogin"})}>
        Sign in
      </button>
    </div>
  );
};

export default Home;
