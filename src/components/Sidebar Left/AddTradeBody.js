import React, {useState, useContext} from 'react'

import Footer from "./Footer";
import FilterButton from "./FilterButton"
import { closeSidebar } from "../../misc/manageSidebar";
import { LeftSidebarContext } from "../../context/LeftSidebar";
import { Categories } from "../../constants/Categories/Categories";
import { useTradeFilters } from "../../context/TradeFiltersContext";
import {Filters} from "../AddTrade/Filters"

export default (props) => {
  const [filters, dispatch2] = useTradeFilters();

  const { setIsOpen_LeftSidebar } = useContext(LeftSidebarContext);

  const Filter = Filters[filters.category.replace(/ /g, "")] // remove spaces from string with .replace

  return (
    <div className="sidebar-body-rl">
      <div className="sidebar-filters-rl">

        <FilterButton
          name={"Category"}
          value={filters.category}
          items={Object.keys(Categories).map(c => Categories[c])}
          onChange={ (category) => {
            dispatch2({
              type: "setFilter",
              payload: {
                type: "category",
                value: category,
              }
            })
            // reset the filters for the category when switching to it
            dispatch2({
              type: "reset"
          })
          }}
          id={1}
          {...props}
        />
        
        <Filter props={props}/>

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
        onClick={() => dispatch2({ type: "reset" })}
        className="sidebar-reset-filters-button"
      >
        Reset filters
      </div>

      <div className="separator-horizontal"></div>

      <Footer />
    </div>
  );
}
