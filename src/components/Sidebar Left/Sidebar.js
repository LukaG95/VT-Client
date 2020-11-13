import React, { useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";

import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import SidebarBodyREP from "./SidebarBodyREP";

import { TbFiltersRLContext } from "../../context/TbFiltersRLContext";
import { rl_dd_names } from "../../info/DropdownNames";
import { closeSidebar } from "../../misc/manageSidebar";

function Sidebar({ setIsOpen_LeftSidebar }) {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedDropdown, setSelectedDropdown] = useState([]);
  const [displayedDropdown, setDisplayedDropdown] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState();

  const [gameDD] = useState(rl_dd_names.gameDD);
  const [searchTypeDD] = useState(rl_dd_names.searchTypeDD);
  const [namesDD] = useState(rl_dd_names.namesDD);
  const [colorDD] = useState(rl_dd_names.colorDD);
  const [certDD] = useState(rl_dd_names.certDD);
  const [itemTypeDD] = useState(rl_dd_names.itemTypeDD);
  const [platformDD] = useState(rl_dd_names.platformDD);

  const {
    game,
    setGame,
    searchType,
    setSearchType,
    name,
    setName,
    color,
    setColor,
    cert,
    setCert,
    itemType,
    setItemType,
    platform,
    setPlatform,
    resetFilters,
  } = useContext(TbFiltersRLContext);

  return (
    <div id="sidebar">
      <div id="sidebar-1st-page">
        <SidebarHeader setIsOpen_LeftSidebar={setIsOpen_LeftSidebar} />

        <Switch>
          <Route exact path="/">
            
            <RLBody />
          </Route>
          <Route exact path="/trading/rl">
            
            <RLBody />
          </Route>
          <Route path="/reputation/add">
            
            <SidebarBodyREP />
          </Route>
          <Route path="/reputation">
            
            <SidebarBodyREP />
          </Route>
          <Route exact path="/trading/rl/new">
            
          </Route>
          <Route path="/trading/rl/edit"> </Route>
          <Route path="/trades"> </Route>
          <Route exact path="/terms">
            
          </Route>
          <Route exact path="/privacy">
            
          </Route>
          <Route exact path="/account/settings">
            
          </Route>
          <Route exact path="/account/messages">
            
          </Route>
          <Route exact path="/account/premium">
            
          </Route>
          <Route path="/password/reset"> </Route>
          <Route path="/email/confirm"> </Route>
          <Route path="/email/update"> </Route>
          <Route path="/admin"> </Route>
        </Switch>
      </div>

      {/*Change the name of this id because there will be more "2nd" pages, for rep etc*/}
      <div id="sidebar-2nd-page">
        <div className="sidebar-header-2nd-page" onClick={goTo1stPage}>
          <span id="back-arrow"> &lt; </span>

          <div className="header-selection-2nd-page">{selectedFilter}</div>
        </div>

        <input
          onChange={(e) => {
            let names = [];

            selectedDropdown.forEach((itemName) => {
              if (itemName.toLowerCase().includes(e.target.value.toLowerCase()))
                names.push(itemName);
            });

            setDisplayedDropdown(names);
          }}
          className="sidebar-input"
          placeholder="Search..."
        ></input>

        <div className="sidebar-body-rl" id="2nd-page-dropdown">
          {Dropdown()}
        </div>
      </div>
    </div>
  );

  function RLBody() {
    return (
      <div className="sidebar-body-rl">
        <div className="sidebar-filters-rl">
          <FilterButton
            text={"Game"}
            value={game}
            dd={gameDD}
            setFunction={setGame}
            id={1}
          />
          <FilterButton
            text={"Search"}
            value={searchType}
            dd={searchTypeDD}
            setFunction={setSearchType}
            id={2}
          />
          <FilterButton
            text={"Name"}
            value={name}
            dd={namesDD}
            setFunction={setName}
            id={3}
          />
          <FilterButton
            text={"Color"}
            value={color}
            dd={colorDD}
            setFunction={setColor}
            id={4}
          />
          <FilterButton
            text={"Certification"}
            value={cert}
            dd={certDD}
            setFunction={setCert}
            id={5}
          />
          <FilterButton
            text={"Item Type"}
            value={itemType}
            dd={itemTypeDD}
            setFunction={setItemType}
            id={6}
          />
          <FilterButton
            text={"Platform"}
            value={platform}
            dd={platformDD}
            setFunction={setPlatform}
            id={7}
          />
        </div>

        <div
          onClick={() => {
            closeSidebar();
            setIsOpen_LeftSidebar(false);
          }}
          className="sidebar-reset-filters-button"
        >
          Confirm filters
        </div>

        <div
          onClick={() => resetFilters()}
          className="sidebar-reset-filters-button"
        >
          Reset filters
        </div>

        <div className="separator-horizontal"></div>

        <SidebarFooter />
      </div>
    );
  }

  function FilterButton({ text, value, dd, setFunction, id }) {
    return (
      <>
        <div
          className="sidebar-filter-button-rl"
          onMouseEnter={() =>
            (document.getElementById(`underline ${id}`).style.width = "100%")
          }
          onMouseLeave={() =>
            (document.getElementById(`underline ${id}`).style.width = "0px")
          }
          onClick={() => {
            setSelectedFilter(text);
            setSelectedDropdown(dd);
            setDisplayedDropdown(dd);
            setSelectedFunction({ setFunction });
            goTo2ndPage();
            setTimeout(
              () => document.getElementById("2nd-page-dropdown").focus(),
              300
            ); // should most likely be changed to something better (although it takes 250ms to load 2nd page, theoretically it should always work)
          }}
        >
          <div>
            <label>{text}</label>
            <p>{value}</p>
          </div>
          <span>&gt;</span>
        </div>

        <div
          id={`underline ${id}`}
          className="side-filter-button-underline"
        ></div>
      </>
    );
  }

  function Dropdown() {
    const dd = displayedDropdown.map((name) => (
      <div
        onClick={(e) => {
          selectedFunction.setFunction(e.target.innerHTML);
          goTo1stPage();
        }}
        className="sidebar-filterdropdown-item"
      >
        {name}
      </div>
    ));

    return <div className="sidebar-filterdropdown-wrapper">{dd}</div>;
  }

  function goTo1stPage() {
    document.getElementById("sidebar-2nd-page").style.transform =
      "translateX(100%)";
    document.getElementById("sidebar-1st-page").style.transform =
      "translateX(0%)";
  }

  function goTo2ndPage() {
    document.getElementById("sidebar-1st-page").style.transform =
      "translateX(-100%)";
    document.getElementById("sidebar-2nd-page").style.transform =
      "translateX(0%)";
  }
}

export default Sidebar;
