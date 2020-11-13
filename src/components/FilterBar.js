import React from 'react'
import {Route, Switch} from 'react-router-dom'

import TbFiltersRL from './Rocket League/TbFiltersRL'
import FiltersREP from './FiltersREP'

function FilterBar() {

  return (
    <>

      <Switch>
        <Route exact path="/">               <TbFiltersRL />    </Route>
        <Route exact path="/trading/rl">     <TbFiltersRL />    </Route>
      </Switch>

    </>
  )
}

export default FilterBar
