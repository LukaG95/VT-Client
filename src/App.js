import React, {useContext, useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {NotificationContainer, NotificationManager} from 'react-notifications'

// import Premium from './pages/Premium'
// import Prices from './pages/Prices'
import {UserContext} from './UserContext'
import Navbar from './components/Navbar'
import RLTrading from './pages/Rocket League/RLTrading'
import AddTradeRL from './pages/Rocket League/AddTradeRL'
import Reputation from './pages/Reputation'
import MyAccount from './pages/My Account/MyAccount'
import AccountPrivacy from './pages/My Account/AccountPrivacy'
import AccountPlatforms from './pages/My Account/AccountPlatforms'
import AccountLogout from './pages/My Account/AccountLogout'
import Terms from './pages/Terms'
import PrivacyPolicy from './pages/PrivacyPolicy'
import LoginForm from './components/SignInUp/LoginForm'
import Popups from './components/Popups'
import AddReputation from './pages/AddReputation'
import UserTrades from './pages/UserTrades'
import ResetPassword from './components/SignInUp/ResetPassword'
import ConfirmEmail from './components/SignInUp/ConfirmEmail'
import {TradeContextProvider} from './components/Rocket League/TradeContextRL'
import {SbFiltersRLContextProvider} from './components/Rocket League/SbFiltersRLContext'


function App() {

  const {isLoggedIn} = useContext(UserContext)

  return (
    <>
      <LoginForm />
      <Popups />
      <Navbar />

      <Switch>
        {/*<Route exact path="/prices">         <Prices />          </Route>*/} 
        {/*<Route exact path="/premium">        <Premium />         </Route>*/}
        <Route exact path="/">                  <SbFiltersRLContextProvider> <RLTrading /> </ SbFiltersRLContextProvider>     </Route>
        <Route exact path="/trading/rl">        <SbFiltersRLContextProvider> <RLTrading /> </ SbFiltersRLContextProvider>     </Route>
        <Route exact path="/terms">             <Terms />           </Route>
        <Route exact path="/privacy">           <PrivacyPolicy />   </Route>
        <Route exact path="/trading/rl/new">    {handleRedirectOnRefresh(<TradeContextProvider>  <AddTradeRL />    </TradeContextProvider>)}       </Route>
        <Route path="/trading/rl/edit">         {handleRedirectOnRefresh(<TradeContextProvider>  <AddTradeRL />    </TradeContextProvider>)}       </Route>
        <Route path="/reputation/add">          {handleRedirectOnRefresh(<AddReputation />)}     </Route>
        <Route path="/reputation">              <Reputation />     </Route>
        <Route exact path="/account">           {handleRedirectOnRefresh(<MyAccount /> )}        </Route>
        <Route exact path="/account/privacy">   {handleRedirectOnRefresh(<AccountPrivacy /> )}   </Route>
        <Route exact path="/account/platforms"> {handleRedirectOnRefresh(<AccountPlatforms /> )} </Route>
        <Route exact path="/account/logout">    {handleRedirectOnRefresh(<AccountLogout /> )}    </Route>
        <Route path="/password/reset">          <ResetPassword />  </Route>
        <Route path="/email/confirm">           <ConfirmEmail />   </Route>
        <Route path="/trades">                  <UserTrades />     </Route>
      </Switch>

      <NotificationContainer/>
    </>
  )

/*-----Functions                -------------*/

  function handleRedirectOnRefresh(component){
    if (isLoggedIn === true) return component
    else if (isLoggedIn === false) return <Redirect to="/" />
    // else, loading animation -- optional
    // else return <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  }
  
}

/*-----Export Functions                -------------*/

function createNotification(type, message){
  NotificationManager[type](message, type.charAt(0).toUpperCase() + type.slice(1))
}

export {App, createNotification}
