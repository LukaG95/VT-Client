import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Navbar from './components/Navbar'
import RLTrading from './components/RLTrading'
import Prices from './components/Prices'
import Reputation from './components/Reputation'
import Premium from './components/Premium'
import Terms from './components/Terms'
import ContactUs from './components/ContactUs'
import PrivacyPolicy from './components/PrivacyPolicy'


function App() {
  return (
    <div className="mainWrapper">

        <Navbar />

        <Switch>
          <Route exact path="/">                 <RLTrading />     </Route>
          <Route exact path="/trading/rlpc">     <RLTrading />     </Route>
          <Route exact path="/prices">           <Prices />        </Route>
          <Route exact path="/reputation">       <Reputation />    </Route>
          <Route exact path="/premium">          <Premium />       </Route>
          <Route exact path="/terms">            <Terms />         </Route>
          <Route exact path="/contactus">        <ContactUs />     </Route>
          <Route exact path="/privacy">          <PrivacyPolicy />         </Route>
        </Switch>

        
    </div>
  )
}

export default App
