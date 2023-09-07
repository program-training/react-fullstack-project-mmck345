import { useContext } from "react";
import { PageContext } from "../../Contexts/PageContext";
import UserForm from "../UserForm/UserForm";

const UserRegistration = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  return (
    <div>
      <UserForm action="register"></UserForm>
    </div>
  );
};

export default UserRegistration;
