import React, {useContext, useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import {UserContext} from './UserContext'
import Navbar from './components/Navbar'
import RLTrading from './pages/RLTrading'
import Prices from './pages/Prices'
import AddTradeRL from './pages/AddTradeRL'
import Reputation from './pages/Reputation'
import Premium from './pages/Premium'
import MyAccount from './pages/MyAccount'
import AccountPrivacy from './pages/AccountPrivacy'
import AccountPlatforms from './pages/AccountPlatforms'
import Terms from './pages/Terms'
import ContactUs from './pages/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import LoginForm from './components/LoginForm'
import {TradeContextProvider} from './components/TradeContextRL'
import {FiltersRLContextProvider} from './components/FiltersRL_Context'

function App() {

  const {isLoggedIn} = useContext(UserContext)

  function handleRedirectOnRefresh(component){
    if (isLoggedIn === true) return component
    else if (isLoggedIn === false) return <Redirect to="/" />
    // else, loading animation -- optional
    // else return <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  }


  return (
    <div className="mainWrapper">

        <LoginForm />
        
        <Navbar />

        <Switch>
          <Route exact path="/">                  <FiltersRLContextProvider> <RLTrading /> </ FiltersRLContextProvider>       </Route>
          <Route exact path="/trading/rl">        <FiltersRLContextProvider> <RLTrading /> </FiltersRLContextProvider>      </Route>
          <Route exact path="/prices">            <Prices />          </Route>
          <Route exact path="/premium">           <Premium />         </Route>
          <Route exact path="/terms">             <Terms />           </Route>
          <Route exact path="/contactus">         <ContactUs />       </Route>
          <Route exact path="/privacy">           <PrivacyPolicy />   </Route>
          <Route exact path="/trading/rl/new">    {handleRedirectOnRefresh(<TradeContextProvider>  <AddTradeRL />  </ TradeContextProvider>)}       </Route>
          <Route exact path="/reputation">        {handleRedirectOnRefresh(<Reputation /> )}       </Route>
          <Route exact path="/account">           {handleRedirectOnRefresh(<MyAccount /> )}        </Route>
          <Route exact path="/account/privacy">   {handleRedirectOnRefresh(<AccountPrivacy /> )}   </Route>
          <Route exact path="/account/platforms"> {handleRedirectOnRefresh(<AccountPlatforms /> )} </Route>
        </Switch>

        
    </div>
  )
}

export default App
