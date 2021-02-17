import React, { useContext, useEffect, useState } from "react";
import { useLocation, Redirect, Route, Switch } from "react-router-dom";

import useWindowDimensions from './misc/windowHW'
import {
  Premium,
  RLTrading,
  RLAddTrade,
  Reputation,
  Settings,
  Terms,
  PrivacyPolicy,
  AddReputation,
  UserTrades,
  AdminPage,
  Messages
} from "./pages/index";
import { UserContext, LeftSidebarContext } from "./context/index";
import { closeSidebar, ToastContainer, ScrollUpButton } from "./misc/index";
import {
  Sidebar,
  Navbar,
  FilterBar,
  LoginForm, 
  Popups,
  ResetPassword,
  ConfirmEmail,
  UpdateEmail,
  AlphaForm,
} from "./components/index";
import { TradeProvider } from "./context/TradeContext";
import { TradeFiltersProvider } from "./context/TradeFiltersContext";
import { io } from "socket.io-client";
import { createNotification } from "./misc/ToastNotification";

export default function App() {
  const { isLoggedIn, displayWebsite } = useContext(UserContext);
  const { setIsOpen_LeftSidebar } = useContext(LeftSidebarContext);
  const [newMessage, setNewMessage] = useState()

  const { height, width } = useWindowDimensions()

  const path = useLocation().pathname

  useEffect(()=> {
    const socket = io(); // const socket = io("https://virtrade-backend.herokuapp.com");

    socket.on('auth', status => {
      if (status === 'success'){
        socket.on('message/new', message => {
          if (!path.includes('/account/messages'))
          createNotification(
            "info",
            `Your received a new message from ${message.senderId}`,
            `${message.senderId}`
          ); 
          setNewMessage(message)
        })
      }
    })
    return () => socket.off()
  }, [path])

  if (displayWebsite === true) {
    return (
      <>
        <Sidebar />
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

            {/*<div style={{position: "absolute", top: "5px", color: "white"}}>{width}</div>
            <div style={{position: "absolute", top: "25px", color: "white"}}>{height}</div>*/}

            <Navbar />
            <Switch>
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
                  <TradeProvider>
                    <TradeFiltersProvider>
                      <RLAddTrade />
                    </TradeFiltersProvider>
                  </TradeProvider>
                )}
              </Route>
              <Route path="/trading/rl/edit">
                {handleRedirectOnRefresh(
                  <TradeProvider>
                    <TradeFiltersProvider>
                      <RLAddTrade />
                    </TradeFiltersProvider>
                  </TradeProvider>
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
                {handleRedirectOnRefresh(<Settings />)}
              </Route>
              <Route exact path="/account/messages">
                {handleRedirectOnRefresh(<><Messages newMessage={newMessage}/></>)}
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

        <ScrollUpButton />

        <ToastContainer />
      </>
    );
  } else if (displayWebsite === false) return <AlphaForm />;
  else return null;

  /*-----Functions                -------------*/

  function handleRedirectOnRefresh(component) {
    if (isLoggedIn === true) return component;
    else if (isLoggedIn === false) return <Redirect to="/" />;
  }
}
