import React from "react";
import { Route, Switch } from "react-router-dom";

import TbFiltersRL from "./Categories/Rocket League/TbFiltersRL";

function FilterBar() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <TbFiltersRL />
        </Route>
        <Route exact path="/trading">
          <TbFiltersRL />
        </Route>
      </Switch>
    </>
  );
}

export default FilterBar;
