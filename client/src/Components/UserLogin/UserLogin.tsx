import { useContext, useState } from "react";
import { PageContext } from "../../Contexts/PageContext";
import UserForm from "../UserForm/UserForm";

const UserLogin = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  return (
    <div>
      <UserForm action="login"></UserForm>
    </div>
  );
};

export default UserLogin;
