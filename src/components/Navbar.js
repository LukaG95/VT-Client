import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import useWindowDimensions from "../misc/windowHW";
import Hamburber from "./Sidebar Left/Hamburger";
import { UserContext } from "../context/UserContext";
import { PopupContext } from "../context/PopupContext";
import { ReactComponent as LogoIcon } from "../images/logo/vt-red.svg";
import { ReactComponent as LogoIconPhone } from "../images/logo/vt-red-v.svg";
import PlusTradeImage from "../images/icons/plus-trade-small.png";
import BellWhiteImage from "../images/icons/bell-white.svg";
import ProfileImage from "../images/icons/profile.svg";

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
            style={
              width <= 1213
                ? { marginLeft: "-15px", marginRight: "-15px" }
                : null
            }
          >
            {width > 800 ? (
              <LogoIcon style={{ width: "150px", height: "150px" }} />
            ) : (
              <LogoIconPhone
                style={{ width: "65px", height: "65px", marginLeft: "-10px" }}
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
              <img height={25} src={PlusTradeImage} alt="" />
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
            <img
              src={BellWhiteImage}
              style={{ height: "25", width: "25" }}
              alt=""
            />
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
              <img
                src={ProfileImage}
                style={{ height: "40px", width: "40px" }}
                className="navRightContent"
                alt=""
              />
              <p style={{ marginLeft: "10px" }}>{username}</p>
            </div>
          </Link>
        );
      else
        return (
          <div className="nav-button-wrapper" style={{ marginRight: "15px" }}>
            <img height={25} width={25} src={ProfileImage} alt="" />
          </div>
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
}

export default Navbar;
