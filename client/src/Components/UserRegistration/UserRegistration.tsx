import { useContext, useState } from "react";
import { PageContext } from "../../Contexts/PageContext";

const UserRegistration = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  return (
    <div>
      <button type="button" onClick={() => console.log("OnClickFromUserRegistration")}>
        Show More Details
      </button>
    </div>
  );
};

export default UserRegistration;
