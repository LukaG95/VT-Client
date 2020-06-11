import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'

import FiltersRL from './FiltersRL'
import FiltersREP from './FiltersREP'
import Footer from './Footer'

import {ReactComponent as CrownIcon} from '../images/other/crown.svg'

function Sidebar() {
  return (
      <div className="sbWrapper">

        <div className="sbSection premiumSection">
          <Link to="/premium" className="premiumButton">
              <CrownIcon />
              <div>Go premium</div>
          </Link>
        </div>

        <Switch>
          <Route exact path="/">               <FiltersRL />    </Route>
          <Route exact path="/trading/rl">     <FiltersRL />    </Route>
          <Route path="/reputation">           <FiltersREP />   </Route>
        </Switch>

        {/* placeholder - <div className="sbSection"></div>*/}

        <Footer />

      </div>
  )
}

export default Sidebar;
