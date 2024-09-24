import React from "react";
import { UserProfile } from "../UserProfile/UserProfile";
import { Profile } from "../Profile/Profile";

function UserDashBoard() {
  return (
  <div className="container-fluid">
    <div className="row">
      <div className="col-2">
        <UserProfile />
      </div>
      <div className="col-10">
        <Profile />
      </div>
    </div>
    </div>
  );
}

export default UserDashBoard;
