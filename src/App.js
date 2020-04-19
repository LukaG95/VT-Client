import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import Trading from './components/Trading'
import Prices from './components/Prices'
import Reputation from './components/Reputation'
import Premium from './components/Premium'

function App() {
  return (
    <div className="mainWrapper">

        <Navbar />

      <div className="secondaryWrapper">

        <Sidebar />
        
        <Switch>
          <Route exact path="/"><Trading /></Route>
          <Route exact path="/trading"><Trading /></Route>
          <Route exact path="/prices"><Prices /></Route>
          <Route exact path="/reputation"><Reputation /></Route>
          <Route exact path="/premium"><Premium /></Route>
          <Route exact path="/trading"><Trading /></Route>
          <Route exact path="/trading"><Trading /></Route>
        </Switch>

        </div>
        
    </div>
  )
}

export default App
