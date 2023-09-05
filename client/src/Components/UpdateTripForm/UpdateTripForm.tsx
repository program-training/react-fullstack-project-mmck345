import { useContext, useState } from "react";
import { PageContext } from "../../Contexts/PageContext";

const UpdateTripFrom = () => {
  const pageContext = useContext(PageContext);
  if (!pageContext) return;

  return (
    <div>
      <button type="button" onClick={() => console.log("OnClickFromUpdateTripFrom")}>
        Show More Details
      </button>
    </div>
  );
};

export default UpdateTripFrom;
