import React, { useContext, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ReputationBody from "./ReputationBody";
import AccountBody from "./AccountBody";

import { manageSidebarResize } from "../../misc/manageSidebar";
import { LeftSidebarContext } from "../../context/LeftSidebar";
import useWindowDimensions from "../../misc/windowHW";
import { UserContext } from "../../context/UserContext";
import {goTo1stPage} from "./misc"
import RLBody from "./RLBody"
import AddTradeBody from "./AddTradeBody"
import SecondPage from "./SecondPage"

function Sidebar() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedDropdown, setSelectedDropdown] = useState([]);
  const [displayedDropdown, setDisplayedDropdown] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState();

  const pathID = useLocation().pathname.slice(8)
  const { myID } = useContext(UserContext);

  const { isOpen_LeftSidebar, setIsOpen_LeftSidebar } = useContext(
    LeftSidebarContext
  );

  const { width } = useWindowDimensions();

  manageSidebarResize(width, isOpen_LeftSidebar, setIsOpen_LeftSidebar);

  return (
    <div id="sidebar">
      <div id="sidebar-1st-page">
        <Header />

        <Switch>
          <Route exact path="/">
            <RLBody
              setSelectedFilter={setSelectedFilter}
              setSelectedDropdown={setSelectedDropdown}
              setDisplayedDropdown={setDisplayedDropdown}
              setSelectedFunction={setSelectedFunction}
            />
          </Route>
          <Route exact path="/trading">
            <RLBody 
              setSelectedFilter={setSelectedFilter}
              setSelectedDropdown={setSelectedDropdown}
              setDisplayedDropdown={setDisplayedDropdown}
              setSelectedFunction={setSelectedFunction}
            />
          </Route>
          <Route path="/reputation/add">
            <ReputationBody />
          </Route>
          <Route path="/reputation">
            <ReputationBody />
          </Route>
          <Route path="/account"> 
            <AccountBody />
          </Route>
          <Route exact path="/trading/new">
            <AddTradeBody 
              setSelectedFilter={setSelectedFilter}
              setSelectedDropdown={setSelectedDropdown}
              setDisplayedDropdown={setDisplayedDropdown}
              setSelectedFunction={setSelectedFunction}
            />
          </Route>
          <Route path="/trading/edit"> <div className="separator-horizontal"></div><Footer /></Route>
          <Route path="/trades">{pathID === myID ? <AccountBody /> : <><div className="separator-horizontal"></div><Footer /></>}</Route>
          <Route exact path="/terms"><div className="separator-horizontal"></div><Footer /></Route>
          <Route exact path="/privacy"><div className="separator-horizontal"></div><Footer /></Route>
          <Route path="/password/reset"> <div className="separator-horizontal"></div><Footer /></Route>
          <Route path="/email/confirm"> <div className="separator-horizontal"></div><Footer /></Route>
          <Route path="/email/update"> <div className="separator-horizontal"></div><Footer /></Route>
          <Route path="/admin"> <div className="separator-horizontal"></div><Footer /></Route>
          <Route path="/rules"> <div className="separator-horizontal"></div><Footer /></Route>
          <Route path="/security"> <div className="separator-horizontal"></div><Footer /></Route>
        </Switch>
      </div>

      <SecondPage 
        selectedFilter={selectedFilter}
        selectedDropdown={selectedDropdown}
        displayedDropdown={displayedDropdown} 
        selectedFunction={selectedFunction}
        setDisplayedDropdown={setDisplayedDropdown}
      />

    </div>
  );
  
}

export default Sidebar;
