import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'

import FiltersRL from './FiltersRL'
import FiltersREP from './FiltersREP'
import Footer from './Footer'

function Sidebar() {
  return (
      <div className="sbWrapper">

        <div className="sbSection">
          <button>GO PREMIUM</button>
        </div>

        <Switch>
          <Route exact path="/">               <FiltersRL />    </Route>
          <Route exact path="/trading/rlpc">   <FiltersRL />    </Route>
          <Route exact path="/reputation">     <FiltersREP />   </Route>
        </Switch>

        <div className="sbSection">
          SPONSOR
        </div>

        <Footer />

      </div>
  )
}

export default Sidebar;
