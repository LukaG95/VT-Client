import React, {useState, useContext} from 'react'

import Footer from "./Footer";
import FilterButton from "./FilterButton"
import { rl_dd_names } from "../../misc/DropdownNames";
import { TbFiltersRLContext } from "../../context/TbFiltersRLContext";
import { closeSidebar } from "../../misc/manageSidebar";
import { LeftSidebarContext } from "../../context/LeftSidebar";

export default (props) => {

  const [gameDD] = useState(rl_dd_names.gameDD);
  const [searchTypeDD] = useState(rl_dd_names.searchTypeDD);
  const [namesDD] = useState(rl_dd_names.namesDD);
  const [colorDD] = useState(rl_dd_names.colorDD);
  const [certDD] = useState(rl_dd_names.certDD);
  const [itemTypeDD] = useState(rl_dd_names.itemTypeDD);
  const [platformDD] = useState(rl_dd_names.platformDD);

  const { setIsOpen_LeftSidebar } = useContext(
    LeftSidebarContext
  );

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
    blueprint,
    setBlueprint,
    platform,
    setPlatform,
    resetFilters,
  } = useContext(TbFiltersRLContext);

  return (
    <div className="sidebar-body-rl">
      <div className="sidebar-filters-rl">
        <FilterButton
          name={"Game"}
          value={game}
          items={gameDD}
          onChange={setGame}
          id={1}
          {...props}
        />
        <FilterButton
          name={"Search"}
          value={searchType}
          items={searchTypeDD}
          onChange={setSearchType}
          id={2}
          {...props}
        />
        <FilterButton
          name={"Name"}
          value={name}
          items={namesDD}
          onChange={setName}
          id={3}
          {...props}
        />
        <FilterButton
          name={"Color"}
          value={color}
          items={colorDD}
          onChange={setColor}
          id={4}
          {...props}
        />
        <FilterButton
          name={"Certification"}
          value={cert}
          items={certDD}
          onChange={setCert}
          id={5}
          {...props}
        />
        <FilterButton
          name={"Item Type"}
          value={blueprint}
          items={itemTypeDD}
          onChange={setBlueprint}
          id={6}
          {...props}
        />
        <FilterButton
          name={"Platform"}
          value={platform}
          items={platformDD}
          onChange={setPlatform}
          id={7}
          {...props}
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

      <Footer />
    </div>
  );
}
