import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AccountTopbar from "./AccountTopbar";

function AccountPlatforms() {
  return (
    <div className="secondaryWrapper accountWrapper">
      <AccountTopbar />

      <div className="accountFieldsWrapper">
        <div style={{ marginTop: "50px" }}>
          <label>
            <p>Are you sure you want to Logout?</p>
          </label>
          <div className="underLogout">
            <Link to="/account" id="removeDecoration">
              <button id="logoutCancelButton">Cancel</button>
            </Link>
            <button onClick={() => handleLogout()} id="logoutAcceptButton">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /*-----Functions                -------------*/

  function handleLogout() {
    axios
      .delete(`/api/auth/logout`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log("Error: " + err));
  }
}

export default AccountPlatforms;
