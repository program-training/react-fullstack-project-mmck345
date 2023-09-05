import { useContext, useState } from "react";
import { PageContext } from "../../Contexts/PageContext";

const UserLogin = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  return (
    <div>
      <button type="button" onClick={() => console.log("OnClickFromUserLogin")}>
        Show More Details
      </button>
    </div>
  );
};

export default UserLogin;
