import React, {useContext, useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

// import Premium from './pages/Premium'
// import Prices from './pages/Prices'
import {UserContext} from './UserContext'
import Navbar from './components/Navbar'
import RLTrading from './pages/Rocket League/RLTrading'
import AddTradeRL from './pages/Rocket League/AddTradeRL'
import Reputation from './pages/Reputation'
import AccountSettings from './pages/My Account/Account Settings'
import AccountPrivacy from './pages/My Account/AccountPrivacy'
import AccountPlatforms from './pages/My Account/AccountPlatforms'
import AccountLogout from './pages/My Account/AccountLogout'
import Terms from './pages/Terms'
import FilterBar from './components/FilterBar'
import PrivacyPolicy from './pages/PrivacyPolicy'
import LoginForm from './components/SignInUp/LoginForm'
import Popups from './components/Popups'
import AddReputation from './pages/AddReputation'
import UserTrades from './pages/UserTrades'
import AdminPage from './pages/AdminPage'
import ResetPassword from './components/SignInUp/ResetPassword'
import ConfirmEmail from './components/SignInUp/ConfirmEmail'
import UpdateEmail from './components/SignInUp/UpdateEmail'
import {TradeContextProviderRL} from './components/Rocket League/TradeContextRL'
import {TbFiltersRLContextProvider} from './components/Rocket League/TbFiltersRLContext'

import AlphaForm from './components/SignInUp/AlphaForm'

import io from 'socket.io-client'
const socket = io()

function App() { 

 const {isLoggedIn, displayWebsite} = useContext(UserContext)

 useEffect(() => {
  const toTop = document.querySelector(".to-top");

  if (toTop)
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 200) {
      toTop.classList.add("active");
    } else {
      toTop.classList.remove("active");
    }
  })
 
  return (window.removeEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      toTop.classList.add("active");
    } else {
      toTop.classList.remove("active");
    }
  }))
 })

  if (displayWebsite === true){ 
  return (
    <>
      <LoginForm />
      <Popups />
      <Navbar />

      <div className="underNav-content-wrapper">
        <div className="underNav-fields">

          <Switch>
            <Route exact path="/">                <TbFiltersRLContextProvider> <FilterBar /><RLTrading /> </ TbFiltersRLContextProvider>    </Route>
            <Route exact path="/trading/rl">      <TbFiltersRLContextProvider> <FilterBar /><RLTrading /> </ TbFiltersRLContextProvider>    </Route>
            <Route path="/reputation/add">        {handleRedirectOnRefresh(<><FilterBar /><AddReputation /></>)}     </Route>
            <Route path="/reputation">            <><FilterBar /><Reputation /></>     </Route>
            <Route exact path="/trading/rl/new">  {handleRedirectOnRefresh(<TradeContextProviderRL>  <AddTradeRL />    </TradeContextProviderRL>)}    </Route>
            <Route path="/trading/rl/edit">       {handleRedirectOnRefresh(<TradeContextProviderRL>  <AddTradeRL />    </TradeContextProviderRL>)}    </Route>
            <Route path="/trades">                {handleRedirectOnRefresh(<><FilterBar /><UserTrades /></>)}  </Route>
          </Switch>

          </div>
      </div>

          <Switch>
            {/*<Route exact path="/prices">         <Prices />         </Route>*/} 
            {/*<Route exact path="/premium">        <Premium />        </Route>*/}
            <Route exact path="/terms">             <Terms />          </Route>
            <Route exact path="/privacy">           <PrivacyPolicy />  </Route>
            <Route exact path="/account/settings">  {handleRedirectOnRefresh(<AccountSettings /> )}   </Route>
            <Route exact path="/account/messages">  {handleRedirectOnRefresh(<AccountPrivacy /> )}    </Route>
            <Route exact path="/account/premium">   {handleRedirectOnRefresh(<AccountPlatforms /> )}  </Route>
            <Route path="/password/reset">          <ResetPassword />  </Route>
            <Route path="/email/confirm">           <ConfirmEmail />   </Route>
            <Route path="/email/update">            <UpdateEmail />    </Route>
            <Route path="/admin">                   <AdminPage />      </Route> 
          </Switch>
          
      <a href="#" className="to-top">
        <i className="fas fa-chevron-up"></i>
      </a>
      <ToastContainer />
      
    </>
  )}

  else if (displayWebsite === false)
  return (<AlphaForm />)

  else return null


/*-----Functions                -------------*/

  function handleRedirectOnRefresh(component){
    if (isLoggedIn === true) return component
    else if (isLoggedIn === false) return <Redirect to="/" />
    // else, loading animation -- optional
    // else return <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  }
  
}

/*-----Export Functions                -------------*/

// type defines type of toast (success, error, ...), message is displayed message on toast, customId is the id passed in so the same toast doesn't duplicate and stack on top
function createNotification(type, message, customId){

  toast[type](message, {
    toastId: customId,
    pauseOnFocusLoss: false,
    position: "bottom-left",
    autoClose: 3000
  })
}

export {App, createNotification}
