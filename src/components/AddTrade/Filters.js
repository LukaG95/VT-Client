import React from "react";

import { ItemTypes, ItemQualities } from "../../constants/Items";
import { useTradeFilters } from "../../context/TradeFiltersContext";
import styles from "../Categories/Rocket League/FilterBar.module.scss";
import Dropdown from "../Dropdown";
import { actions, useTrade } from "../../context/TradeContext";
import { platforms } from "../../constants/platforms";
import FilterButton from "../Sidebar Left/FilterButton"


const RocketLeague = ({props, sidebar}) => {
  const [{platform}, dispatch] = useTrade();
  const [filters, dispatch2] = useTradeFilters();

  // if we are on mobile we're returning FilterButton which is a sidebar button, otherwise it's a dropdown
  let Button = sidebar ? Dropdown : FilterButton

  return (
    <>
      <Button
        name="Type"
        items={ItemTypes.map(item => item.type)}
        onChange={(type) =>
          dispatch2({
            type: "setFilter",
            payload: { 
              type: "type",
              value: type,
            },
          })
        }
        value={filters.type}
        floating
        id={2}
        {...props}
      />  

      <Button
        name="Quality"
        items={ItemQualities}
        onChange={(quality) =>
          dispatch2({
            type: "setFilter",
            payload: {
              type: "quality",
              value: quality,
            },
          })
        }
        value={filters.quality}
        floating
        id={3}
        {...props}
      />  

      <Button
        name="Platform"
        items={Object.keys(platforms).map(p => platforms[p])}
        onChange={(p) =>
          dispatch({
            type: actions.SET_PLATFORM,
            payload: p,
          })
        }
        value={platform}
        floating
        id={4}
        {...props}
      />  

    </>
  )
   
}

const Money = () => {
  const [{platform}, dispatch] = useTrade();
  const [filters, dispatch2] = useTradeFilters();

  return (
    <>
    
      
    </>
  )
   
}


const Design = () => {
  const [{platform}, dispatch] = useTrade();
  const [filters, dispatch2] = useTradeFilters();

  return (
    <>
    
      
    </>
  )
   
}

const KeysAndCurrency = () => {
  const [{platform}, dispatch] = useTrade();
  const [filters, dispatch2] = useTradeFilters();

  return (
    <>
    
      
    </>
  )
   
}

const CSGO = () => {
  const [{platform}, dispatch] = useTrade();
  const [filters, dispatch2] = useTradeFilters();

  return (
    <>
    
      
    </>
  )
   
}

export const Filters = {RocketLeague, Money, Design, KeysAndCurrency, CSGO};

