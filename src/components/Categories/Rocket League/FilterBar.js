import React, { useState, useMemo } from "react";

import { ItemTypes, ItemQualities } from "../../../constants/Items";
import { useTradeFilters } from "../../../context/TradeFiltersContext";
import useWindowDimensions from "../../../misc/windowHW";
import styles from "./FilterBar.module.scss";
import Dropdown from "../../Dropdown";
import { actions, useTrade } from "../../../context/TradeContext";
import { platforms } from "../../../constants/platforms";
import { Categories } from "../../../constants/Categories/Categories";
import {Filters} from "../../AddTrade/Filters"

function FilterBar() {
  const [{platform}, dispatch] = useTrade();
  const [filters, dispatch2] = useTradeFilters();

  const { width } = useWindowDimensions();

  // const [Filter, setFilter] = useState(Filters[filters.category.replace(/ /g, "")])

  const Filter = Filters[filters.category.replace(/ /g, "")] // remove spaces from string with .replace

  return (
    <div className={styles.wrapper}>

      <Dropdown
        name="Category"
        items={Object.keys(Categories).map(c => Categories[c])}
        className={styles.dropdowns}
        onChange={(category) =>
          dispatch2({
            type: "setFilter",
            payload: {
              type: "category",
              value: category,
            },
          })
        }
        value={filters.category}
      />  

      <div className={styles.spacer}></div>

     <Filter />
      
    </div>
  )
   
}

export default FilterBar;
