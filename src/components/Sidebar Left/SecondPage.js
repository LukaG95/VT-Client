import React, { useContext, useState } from "react";

import { manageSidebarResize } from "../../misc/manageSidebar";
import { LeftSidebarContext } from "../../context/LeftSidebar";
import useWindowDimensions from "../../misc/windowHW";
import {goTo1stPage} from "./misc"

function SecondPage({selectedFilter, selectedDropdown, displayedDropdown, selectedFunction, setDisplayedDropdown}) {

  const { isOpen_LeftSidebar, setIsOpen_LeftSidebar } = useContext(
    LeftSidebarContext
  );

  const { width } = useWindowDimensions();

  manageSidebarResize(width, isOpen_LeftSidebar, setIsOpen_LeftSidebar);

  return (
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
  );

  function Dropdown() {
    const dd = displayedDropdown.map((name) => (
      <div
        onClick={(e) => {
          selectedFunction.onChange(e.target.innerHTML); // shouldn't this just be "name" ??
          goTo1stPage();
        }}
        className="sidebar-filterdropdown-item"
      >
        {name}
        {name === "CSGO" || name === "Keys And Currency" ? <p>coming soon</p> : null}
      </div>
    ));

    return <div className="sidebar-filterdropdown-wrapper">{dd}</div>;
  }

}

export default SecondPage;
