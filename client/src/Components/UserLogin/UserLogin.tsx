import { useContext, useState } from "react";
import { PageContext } from "../../Contexts/PageContext";
import UserForm from "../UserForm/UserForm";

const UserLogin = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  return (
    <div>
      <button type="button" onClick={() => console.log("OnClickFromUserLogin")}>
        Show More Details
      </button>
      
      <UserForm action="login"></UserForm>
    </div>
  );
};

export default UserLogin;
