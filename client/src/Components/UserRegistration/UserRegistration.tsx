import { useContext, useState } from "react";
import { PageContext } from "../../Contexts/PageContext";
import UserForm from "../UserForm/UserForm";

const UserRegistration = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  return (
    <div>
      <button type="button" onClick={() => console.log('RegisterUserPage')}>
        Show More Details
      </button>

      <UserForm action="register"></UserForm>
    </div>
  );
};

export default UserRegistration;
