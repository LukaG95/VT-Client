import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import useWindowDimensions from "../misc/windowHW";
import Hamburber from "./Sidebar Left/Hamburger";
import { UserContext } from "../context/UserContext";
import { PopupContext } from "../context/PopupContext";
import { ReactComponent as LogoIcon } from "../images/logo/vt-red.svg"; 
import { ReactComponent as LogoIconPhone } from "../images/logo/vt-red-phone.svg"; 
import { ReactComponent as BellIcon } from "../images/icons/bell.svg";
import { ReactComponent as ProfileIconSmall } from "../images/icons/profile-small.svg"; 
import { ReactComponent as ProfileIcon } from "../images/icons/profile.svg"; 
import { ReactComponent as PlusIcon } from "../images/icons/plus.svg"; 

function Navbar() {
  let location = useLocation();
  let trading = "",
    reputation = "";

  const { isLoggedIn, username } = useContext(UserContext);
  const { setOpenForm } = useContext(PopupContext);

  switch (location.pathname) {
    case "/trading/rl":
      trading = "currentPage";
      break;
    case "/":
      trading = "currentPage";
      break;
    case "/reputation":
      reputation = "currentPage";
      break;
    default:
  }

  const { width } = useWindowDimensions();

  return (
    <nav className="navWrapper">
      <div className="navLeft">
        {width <= 1213 && <Hamburber />}

        <div className="navLeftItem">
          <Link
            to="/"
            className="logo"
          >
            {width > 800 ? (
              <LogoIcon style={logoStyle()} />
            ) : (
              <LogoIconPhone
                style={{ width: "38px", height: "38px", marginLeft: "-10px", marginBottom: "3px"}}
              />
            )}
          </Link>
        </div>

        <div className="hide" id="separator"></div>

        <Link
          to="/trading/rl"
          id="removeDecoration"
          style={{ marginLeft: "20px" }}
        >
          <div className="navLeftItem hide">
            <div className={`navLeftContent ${trading}`}>Trading</div>
          </div>
        </Link>

        <Link to="/reputation" id="removeDecoration">
          <div className="navLeftItem hide" id="removeDecoration">
            <div className={`navLeftContent ${reputation}`}>Reputation</div>
          </div>
        </Link>
      </div>

      <div className="navRight">
        {width <= 1213 && isLoggedIn ? (
          <Link to="/trading/rl/new" id="removeDecoration">
            <div className="nav-button-wrapper">
              <PlusIcon style={{ width: "25px", height: "25px" }} />
            </div>
          </Link>
        ) : null}

        {isLoggedIn && (
          <Link
            to="/trading/rl/new"
            className="addTrade hide"
            id="removeDecoration"
          >
            + New trade
          </Link>
        )}
        {isLoggedIn && (
          <div className={`nav-button-wrapper ${width > 1213 && "bell"}`}>
            <BellIcon style={{ width: "25px", height: "25px"}} />
          </div>
        )}

        <div
          className={`navRightItem ${isLoggedIn && "hide"}`}
          id="separator"
        ></div>

        {handleIconDisplay()}
      </div>
    </nav>
  );

  /*-----Functions                -------------*/

  function handleIconDisplay() {
    if (isLoggedIn)
      if (width > 1213)
        return (
          <Link to="/account/settings" id="removeDecoration">
            <div className="navRightItem profile">
              <ProfileIcon className="navRightContent" style={{ width: "40px", height: "40px"}}/>
              <p style={{ marginLeft: "10px" }}>{username}</p>
            </div>
          </Link>
        );
      else
        return (
           <Link to="/account/settings" id="removeDecoration">
            <div className="nav-button-wrapper" style={{ marginRight: "15px" }}>
              <ProfileIconSmall style={{ width: "25px", height: "25px"}}/>
            </div>
          </Link>
        );
    else if (isLoggedIn === undefined)
      return <div className="navRightItem profile"></div>;
    else
      return (
        <div
          onClick={() => {
            setOpenForm(true);
          }}
          className="navRightItem profile loginButton"
        >
          Login
        </div>
      );
  }

  function logoStyle(){
    let margin
    if (width > 1213)
      margin = "0px 20px 3px 15px"
    else
      margin = "0px 20px 3px -10px"

    return { width: "140px", height: "auto", margin}
  }
}

export default Navbar;
