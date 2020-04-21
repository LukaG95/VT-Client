import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Navbar from './components/Navbar'
import RLTrading from './pages/RLTrading'
import Prices from './pages/Prices'
import Reputation from './pages/Reputation'
import Premium from './pages/Premium'
import Terms from './pages/Terms'
import ContactUs from './pages/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy'


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
