import React, { useContext, useEffect, useState, useRef } from "react"
import { useLocation, Redirect, Route, Switch } from "react-router-dom"

import useWindowDimensions from './misc/windowHW'
import checkPath from './constants/FooterPath'
import {
  RLTrading,
  TradingRules,
  RLAddTrade,
  Reputation,
  AddReputation,
  ReputationRules,
  PreventScam,
  Settings,
  Terms,
  UserTrades,
  AdminPage,
  AdminPage2,
  Messages,
  Partner
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
  Footer
} from "./components/index";
import { TradeProvider } from "./context/TradeContext";
import { TradeFiltersProvider } from "./context/TradeFiltersContext";
import { io } from "socket.io-client";
import { createNotification } from "./misc/ToastNotification";

export default function App() {
  const { isLoggedIn, user } = useContext(UserContext);
  const { setIsOpen_LeftSidebar } = useContext(LeftSidebarContext);
  const [newMessage, setNewMessage] = useState(null)
  const [displayFooter, setDisplayFooter] = useState(false)

  const path = useLocation().pathname
  const { width } = useWindowDimensions()

  useEffect(()=> { 
    const socket = io({transports: ['websocket']}); // const socket = io("https://wwww.virtrade.gg");
    socket.on('auth', status => { 
      if (status === 'success'){
        socket.on('message/new', message => {
          setNewMessage(message)
          if(!path.includes('/account/messages'))
            createNotification(
              "info",
              `New message from ${newMessage.sender.username}`,
              `${newMessage.sender.username}`,
              `/account/messages/${newMessage.sender._id}`
            ); 
        })
        socket.on('confirmPlatform', platform => {
          createNotification(
            "success",
            `Successfully linked ${platform.platform}`,
            `Successfully linked ${platform.platform}`,
          ); 
        })
      }
    })
    
    return () => socket.off()
    
  }, [])

  useEffect(()=> {
    if (newMessage && !path.includes('/account/messages'))
    createNotification(
      "info",
      `You received a new message from ${newMessage.sender.username}`,
      `${newMessage.sender.username}`,
      `/account/messages/${newMessage.sender._id}`
    ); 
        
  }, [newMessage])

  useEffect(() => {
    if (checkPath(path))
      setDisplayFooter(true)
    else
      setDisplayFooter(false)
  }, [path])

 // if (displayWebsite === true) {
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

          <div className="mainWrapper" style={width > 1213 && displayFooter ? {paddingBottom: "350px"} : {paddingBottom: "0px"}}>

            {/*<div style={{position: "absolute", top: "5px", color: "white"}}>{width}</div>
            <div style={{position: "absolute", top: "25px", color: "white"}}>{height}</div>*/}

            <Navbar />
            <Switch>
              <Route exact path="/">
                <>
                  <FilterBar />
                  <RLTrading home={true} />
                </>
              </Route>
              <Route exact path="/trading/rl">
                <>
                  <FilterBar />
                  <RLTrading />
                </>
              </Route>
              <Route path="/reputation/add/:pathID">
                {handleRedirectOnRefresh(<AddReputation />)}
              </Route>
              <Route exact path="/reputation">
                <Reputation />
              </Route>
              <Route path="/reputation/:pathID">
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
              <Route path="/trading/rl/edit/:pathID">
                {handleRedirectOnRefresh(
                  <TradeProvider>
                    <TradeFiltersProvider>
                      <RLAddTrade />
                    </TradeFiltersProvider>
                  </TradeProvider>
                )}
              </Route>
              <Route path="/trades/:pathID">
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
              <Route exact path="/rules/trading">
                <TradingRules />
              </Route>
              <Route exact path="/rules/reputation">
                <ReputationRules />
              </Route>
              <Route exact path="/security">
                <PreventScam />
              </Route>
              <Route exact path="/account/settings/username">
                {handleRedirectOnRefresh(<Settings />)}
              </Route>
              <Route exact path="/account/settings/password">
                {handleRedirectOnRefresh(!registeredWithPlatform() ? <Settings /> : <Redirect to="/" />)}
              </Route>
              <Route exact path="/account/settings/email">
                {handleRedirectOnRefresh(!registeredWithPlatform() ? <Settings /> : <Redirect to="/" />)}
              </Route>
              <Route exact path="/account/settings/platforms">
                {handleRedirectOnRefresh(<Settings />)}
              </Route>
              <Route exact path="/account/messages">
                {handleRedirectOnRefresh(<Messages newMessage={newMessage}/>)}
              </Route>
              <Route path="/account/messages/:pathID">
                {handleRedirectOnRefresh(<Messages newMessage={newMessage}/>)}
              </Route>
              <Route path="/password/reset/:pathID">
                <ResetPassword />
              </Route>
              <Route path="/email/confirm/:pathID">
                <ConfirmEmail /> 
              </Route>
              <Route path="/email/update/:pathID">
                <UpdateEmail />
              </Route>
              <Route path="/admin">
                {handleRedirectOnRefresh(<AdminPage2 />)}
              </Route>
              <Route path="/partner/:tracking">
                <Partner />
              </Route>
            </Switch>
            
            {(displayFooter && width > 1213) ? <Footer /> : null}

          </div>
        </div>

        <ScrollUpButton />

        <ToastContainer />
      </>
    );
  // } else if (displayWebsite === false) return <AlphaForm />;
  //else return null;

  /*-----Functions                -------------*/

  function handleRedirectOnRefresh(component) {
    if (isLoggedIn === true) return component;
    else if (isLoggedIn === false) return <Redirect to="/" />;
  }

  function registeredWithPlatform(){
    if(user){
      if (user.steam)
        return user.steam.signedUpWith

      if (user.discord)
        return user.discord.signedUpWith
    }
    return false
  }
}
