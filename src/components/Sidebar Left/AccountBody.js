import React, { useContext } from "react";
import {Link, useLocation} from "react-router-dom"

import SidebarFooter from "./Footer";
import { closeSidebar, manageSidebarResize } from "../../misc/manageSidebar";
import { PopupContext } from "../../context/PopupContext";
import { UserContext, LeftSidebarContext } from "../../context/index";

function AccountBody() {

  const { myID } = useContext(UserContext);
  const { setOpenLogoutPopup } = useContext(PopupContext);
  const { setIsOpen_LeftSidebar } = useContext(LeftSidebarContext);

  let location = useLocation();
  let account = "",
    messages = "",
    trades = "",
    premium = "";

  switch (location.pathname) {
    case "/account/settings":
      account = "account-currentPage-sidebar";
      break;
    case "/account/messages":
      messages = "account-currentPage-sidebar";
      break;
    case "/trades":
      trades = "account-currentPage-sidebar";
      break;
    case "/account/premium":
      premium = "account-currentPage-sidebar";
      break;
    default:
  }

  return (
    <div className="sidebar-body-account">

      <FilterButton name="Account settings" link="/account/settings" style={account} />
      <FilterButton name="Messages" link="/account/messages" style={messages} />
      <FilterButton name="My Trades" link={`/trades/${myID}`} style={trades} />
      <FilterButton name="Premium" link="/account/premium" style={premium} />
      <FilterButton name="Logout" />

      <div className="separator-horizontal"></div>

      <SidebarFooter />

    </div>
  );

  function FilterButton({name, link, style}) {
    return (
      <Link 
        to={link ? link : "#"} 
        id="removeDecoration" 
        className={`sidebar-filter-button-account ${style}`}
        style={name==="Logout" ? {color: "#C33030"} : name === "Premium" && style !== "" ? {color: "#34CEFF"} : name === "Premium" ?  {color: "rgba(52, 206, 255, 0.5)"} : {}}
        onClick={() => {
          if (name === "Logout")
            setOpenLogoutPopup(true);
  
          closeSidebar(); 
          setIsOpen_LeftSidebar(false);
          
        }}
        >
          {name}
      </Link>
    );
  }
}

export default AccountBody;
