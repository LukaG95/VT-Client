import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import { PopupContext } from "../../context/PopupContext";

function AccountSidebar() {
  const { myID } = useContext(UserContext);
  const { setOpenLogoutPopup } = useContext(PopupContext);

  let location = useLocation();
  let account = "",
    messages = "",
    trades = "",
    premium = "";


  if (location.pathname.includes("/account/settings")) account = "account-currentPage";
  else if (location.pathname.includes("/account/messages")) messages = "account-currentPage";
  else if (location.pathname.includes("/account/premium")) premium = "account-currentPage";
  else if (location.pathname.includes("/trades/")) trades = "account-currentPage"

  return (
    <div className="accountTb">

      <Link to="/account/settings/username" id="removeDecoration" className={`accountTb-nav ${account}`}>
        Account Settings
      </Link>

      <Link to="/account/messages" id="removeDecoration" className={`accountTb-nav ${messages}`}>
        Messages
      </Link>

      <Link to={`/trades/${myID}`} id="removeDecoration" className={`accountTb-nav ${trades}`}>
        My Trades
      </Link>

      {/*
        <Link to="/account/premium" id="removeDecoration">
          <p
            className={`accountTb-nav ${premium}`}
            style={{
              color: premium === "" ? "rgba(52, 206, 255, 0.5)" : "#34CEFF",
            }}
          >
            Premium
          </p>
        </Link>
      */}

      <div
        onClick={() => setOpenLogoutPopup(true)}
        className="accountTb-nav"
        style={{ color: "#C33030", cursor: "pointer" }}
      >
        Logout
      </div>

      <div className="filler" style={{height: "auto"}} ></div>

    </div>
  );
}

export default AccountSidebar;
