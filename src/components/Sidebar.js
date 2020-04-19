import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'

function Sidebar() {
  return (
      <div className="sbWrapper">

        <Switch>
          <Route exact path="/">RL TRADING FILTERS</Route>
          <Route exact path="/trading">RL TRADING FILTERS</Route>
          <Route exact path="/prices">PRICES FILTERS</Route>
          <Route exact path="/reputation">REP LEADERBOARDS</Route>
          <Route exact path="/premium">PREMIUM</Route>
        </Switch>

      </div>
  )
}

export default Sidebar;
