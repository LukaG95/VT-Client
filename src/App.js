import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Navbar from './components/Navbar'
import RLTrading from './components/RLTrading'
import Prices from './components/Prices'
import Reputation from './components/Reputation'
import Premium from './components/Premium'

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
        </Switch>

        
    </div>
  )
}

export default App
