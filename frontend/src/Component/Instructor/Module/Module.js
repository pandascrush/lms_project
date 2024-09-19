import React from "react";
import { Link, useParams } from "react-router-dom";

function Module() {
  const { id } = useParams();

  return (
    <div className="d-flex p-3 gap-3">
      <Link
        className="btn"
        style={{ backgroundColor: "#001040", color: "white" }}
        to={`/instructordashboard/${id}/addmodule`}
      >
        Add New Module
      </Link>
      <br></br>
      <Link
        style={{ backgroundColor: "#001040", color: "white" }}
        className="btn"
        to={`/instructordashboard/${id}/updatemodule`}
      >
        Update Module
      </Link>
    </div>
  );
}

export default Module;
