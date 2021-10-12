import React, {useState, useContext} from 'react'

import { goTo2ndPage } from "./misc";

export default ({ name, value, items, onChange, id, setSelectedFilter, setSelectedDropdown, setSelectedFunction, setDisplayedDropdown}) => {
  
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
          setSelectedFilter(name);
          setSelectedDropdown(items);
          setDisplayedDropdown(items);
          setSelectedFunction({ onChange });
          goTo2ndPage();
          setTimeout(
            () => document.getElementById("2nd-page-dropdown").focus(),
            300
          ); // should most likely be changed to something better (although it takes 250ms to load 2nd page, theoretically it should always work)
        }}
      >
        <div>
          <label>{name}</label>
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