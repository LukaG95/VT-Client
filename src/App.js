import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Sidebar from "./components/Sidebar Left/Sidebar";
import Premium from "./pages/Premium";
import { UserContext } from "./context/UserContext";
import Navbar from "./components/Navbar";
import RLTrading from "./pages/Rocket League/RLTrading";
import AddTradeRL from "./pages/Rocket League/AddTrade/Main";
import Reputation from "./pages/Reputation";
import AccountSettings from "./pages/My Account/Account Settings";
//import AccountPlatforms from "./pages/My Account/AccountPlatforms";
//import AccountLogout from "./pages/My Account/AccountLogout";
import Terms from "./pages/Terms";
import FilterBar from "./components/FilterBar";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LoginForm from "./components/SignInUp/LoginForm";
import Popups from "./components/Popups";
import AddReputation from "./pages/AddReputation";
import UserTrades from "./pages/UserTrades";
import AdminPage from "./pages/AdminPage";
import ResetPassword from "./components/SignInUp/ResetPassword";
import ConfirmEmail from "./components/SignInUp/ConfirmEmail";
import UpdateEmail from "./components/SignInUp/UpdateEmail";
import { TradeContextProviderRL } from "./context/TradeContextRL";
import { TbFiltersRLContext } from "./context/TbFiltersRLContext";
import { PopupContext } from "./context/PopupContext";
import { closeSidebar } from "./misc/manageSidebar";
import useWindowDimensions from "./misc/windowHW";
import Test from "./test";

import AlphaForm from "./components/SignInUp/AlphaForm";

//import io from "socket.io-client";
//const socket = io();

function App() {
  const { isLoggedIn, displayWebsite } = useContext(UserContext);
  const { openForm } = useContext(PopupContext);
  const { isOpen_LeftSidebar, setIsOpen_LeftSidebar } = useContext(
    TbFiltersRLContext
  );

  const { height, width } = useWindowDimensions();

  manageSidebarOnResize();
  manageSignFormOnResize();

  useEffect(() => {
    const toTop = document.querySelector(".to-top");

    if (toTop)
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          toTop.classList.add("active");
        } else {
          toTop.classList.remove("active");
        }
      });

    return window.removeEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        toTop.classList.add("active");
      } else {
        toTop.classList.remove("active");
      }
    });
  });

  if (displayWebsite === true) {
    return (
      <>
        <Sidebar setIsOpen_LeftSidebar={() => setIsOpen_LeftSidebar()} />
        <Popups />
        <LoginForm />
        <div className="shader_wrapper" id="main">
          <div
            id="shader"
            onClick={() => {
              closeSidebar();
              setIsOpen_LeftSidebar(false);
            }}
          ></div>

          <div className="mainWrapper">
            <div style={{ position: "absolute", top: "5px", color: "white" }}>
              {width}
            </div>
            <div style={{ position: "absolute", top: "25px", color: "white" }}>
              {height}
            </div>
            <Navbar />
            <Switch>
              <Route exact path="/testing">
                <Test />
              </Route>
              <Route exact path="/">
                <>
                  <FilterBar />
                  <RLTrading />
                </>
              </Route>
              <Route exact path="/trading/rl">
                <>
                  <FilterBar />
                  <RLTrading />
                </>
              </Route>
              <Route path="/reputation/add">
                {handleRedirectOnRefresh(<AddReputation />)}
              </Route>
              <Route path="/reputation">
                <Reputation />
              </Route>
              <Route exact path="/trading/rl/new">
                {handleRedirectOnRefresh(
                  <TradeContextProviderRL>
                    <AddTradeRL />
                  </TradeContextProviderRL>
                )}
              </Route>
              <Route path="/trading/rl/edit">
                {handleRedirectOnRefresh(
                  <TradeContextProviderRL>
                    <AddTradeRL />
                  </TradeContextProviderRL>
                )}
              </Route>
              <Route path="/trades">
                {handleRedirectOnRefresh(
                  <>
                    <FilterBar />
                    <UserTrades />
                  </>
                )}
              </Route>
              <Route exact path="/terms">
                <Terms />
              </Route>
              <Route exact path="/privacy">
                <PrivacyPolicy />
              </Route>
              <Route exact path="/account/settings">
                {handleRedirectOnRefresh(<AccountSettings />)}
              </Route>
              <Route exact path="/account/messages">
                {handleRedirectOnRefresh(<></>)}
              </Route>
              <Route exact path="/account/premium">
                {handleRedirectOnRefresh(<Premium />)}
              </Route>
              <Route path="/password/reset">
                <ResetPassword />
              </Route>
              <Route path="/email/confirm">
                <ConfirmEmail />
              </Route>
              <Route path="/email/update">
                <UpdateEmail />
              </Route>
              <Route path="/admin">
                <AdminPage />
              </Route>
            </Switch>
          </div>
        </div>

        <div
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="to-top"
        >
          <img
            height={30}
            width={30}
            src={require("./images/other/arrow_nav_up.png")}
            alt=""
          />
          {/*<i className="fas fa-chevron-up"></i>*/}
        </div>

        <ToastContainer />
      </>
    );
  } else if (displayWebsite === false) return <AlphaForm />;
  else return null;

  /*-----Functions                -------------*/

  function handleRedirectOnRefresh(component) {
    if (isLoggedIn === true) return component;
    else if (isLoggedIn === false) return <Redirect to="/" />;
    // else, loading animation -- optional
    // else return <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  }

  function manageSidebarOnResize() {
    if (width > 1213 && isOpen_LeftSidebar) {
      // && sidebar is opened (for resizing performance)
      closeSidebar();
      setIsOpen_LeftSidebar(false);
    } else if (width > 650 && isOpen_LeftSidebar) {
      const main = document.getElementById("main");
      const sidebar = document.getElementById("sidebar");

      sidebar.style.width = `400px`;
      main.style.transform = `translateX(400px)`;
    } else if (width <= 650 && isOpen_LeftSidebar) {
      //  && document.getElementById("main").style.transform !== "translateX(100%)"
      const main = document.getElementById("main");
      const sidebar = document.getElementById("sidebar");

      sidebar.style.width = "100%";
      const sb_width = sidebar.getBoundingClientRect().width;
      main.style.transform = `translateX(${sb_width}px)`;
    }
  }

  function manageSignFormOnResize() {
    if (width < 700 && openForm === true) {
      try {
        const form = document.getElementById("logForm");
        const body = document.body;

        form.style.height = "100%";
        form.style.width = "100%";
        body.style.overflowY = "hidden";
      } catch {}
    } else if (width >= 700 && openForm === true) {
      try {
        const form = document.getElementById("logForm");
        const body = document.body;

        form.style.height = "auto";
        form.style.width = "440px";
        body.style.overflowY = "scroll";
      } catch {}
    }
  }
}

/*-----Export Functions                -------------*/

// type defines type of toast (success, error, ...), message is displayed message on toast, customId is the id passed in so the same toast doesn't duplicate and stack on top
function createNotification(type, message, customId) {
  toast[type](message, {
    toastId: customId,
    pauseOnFocusLoss: false,
    position: "bottom-left",
    autoClose: 3000,
  });
}

export { App, createNotification };
