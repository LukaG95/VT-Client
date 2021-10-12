import React, { useContext } from "react";

import { ItemTypes, ItemQualities } from "../../../constants/Items";
import { useTradeFilters } from "../../../context/TradeFiltersContext";
import useWindowDimensions from "../../../misc/windowHW";
import styles from "./FilterBar.module.scss";
import Dropdown from "../../Dropdown";
import { actions, useTrade } from "../../../context/TradeContext";
import { platforms } from "../../../constants/platforms";
import { Categories } from "../../../constants/Categories/Categories";
import {Filters} from "../../AddTrade/Filters"
import Footer from "../../Sidebar Left/Footer"

function FilterBar(props) {
  const [filters, dispatch2] = useTradeFilters();

  const Filter = Filters[filters.category.replace(/ /g, "")] // remove spaces from string with .replace

  return (
    <div className={styles.wrapper}>

      <Dropdown
        name="Category"
        items={Object.keys(Categories).map(c => Categories[c])}
        onChange={(category) => {
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
        value={filters.category}
        floating
        {...props}
      />  

      <Filter props={props} sidebar={true}/>
      
      <button 
        className={styles.resetButton}
        style={props.className==="noBorderRadius" ? {borderRadius: "0px"} : null}
        onClick={()=> {
          dispatch2({
            type: "reset"
          })
        }}>
          RESET FILTERS
      </button>

      {
        props.sidebar ? 
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <div className="separator-horizontal"></div>
              <Footer />
            </div>
      : 
        <div className={styles.filler}></div>
      }
      
      
    </div>
  )
   
}

export default FilterBar;
