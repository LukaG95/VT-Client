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
import AccountLogout from './pages/AccountLogout'
import Terms from './pages/Terms'
import PrivacyPolicy from './pages/PrivacyPolicy'
import LoginForm from './components/LoginForm'
import Popups from './components/Popups'
import AddReputation from './pages/AddReputation'
import UserTrades from './pages/UserTrades'
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
        <Popups />
        
        <Navbar />

        <Switch>
          <Route exact path="/">                  <FiltersRLContextProvider> <RLTrading /> </ FiltersRLContextProvider>       </Route>
          <Route exact path="/trading/rl">        <FiltersRLContextProvider> <RLTrading /> </FiltersRLContextProvider>      </Route>
          {/*<Route exact path="/prices">            <Prices />          </Route>*/} 
          {/*<Route exact path="/premium">           <Premium />         </Route>*/}
          <Route exact path="/terms">             <Terms />           </Route>
          <Route exact path="/privacy">           <PrivacyPolicy />   </Route>
          <Route exact path="/trading/rl/new">    {handleRedirectOnRefresh(<TradeContextProvider>  <AddTradeRL />    </TradeContextProvider>)}       </Route>
          <Route path="/trading/rl/edit">         {handleRedirectOnRefresh(<TradeContextProvider>  <AddTradeRL />    </TradeContextProvider>)}       </Route>
          <Route path="/reputation/add">          {handleRedirectOnRefresh(<AddReputation />)}     </Route>
          <Route path="/reputation">              <Reputation />      </Route>
          <Route exact path="/account">           {handleRedirectOnRefresh(<MyAccount /> )}        </Route>
          <Route exact path="/account/privacy">   {handleRedirectOnRefresh(<AccountPrivacy /> )}   </Route>
          <Route exact path="/account/platforms"> {handleRedirectOnRefresh(<AccountPlatforms /> )} </Route>
          <Route exact path="/account/logout">    {handleRedirectOnRefresh(<AccountLogout /> )}    </Route>
          <Route path="/trades">                  <UserTrades /> </Route>
        </Switch>

        
    </div>
  )
}

export default App
