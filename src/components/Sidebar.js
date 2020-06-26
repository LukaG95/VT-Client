import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'

import SbFiltersRL from './Rocket League/SbFiltersRL'
import FiltersREP from './FiltersREP'
import SbFooter from './SbFooter'

import {ReactComponent as CrownIcon} from '../images/other/crown.svg'

function Sidebar() {
  return (
      <div className="sbWrapper">

        <div className="sbSection premiumSection">
          <Link to="/premium" className="noUserInteraction premiumButton">
              <CrownIcon />
              <div>Go premium</div>
          </Link>
        </div>

        <Switch>
          <Route exact path="/">               <SbFiltersRL />    </Route>
          <Route exact path="/trading/rl">     <SbFiltersRL />    </Route>
          <Route path="/reputation">           <FiltersREP />     </Route>
        </Switch>

        {/* placeholder - <div className="sbSection"></div>*/}

        <SbFooter />

      </div>
  )
}

export default Sidebar;
