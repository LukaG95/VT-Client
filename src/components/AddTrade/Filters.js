import React from "react";

import { ItemTypes, ItemQualities } from "../../constants/Items";
import { useTradeFilters } from "../../context/TradeFiltersContext";
import styles from "../Categories/Rocket League/FilterBar.module.scss";
import Dropdown from "../Dropdown";
import { actions, useTrade } from "../../context/TradeContext";
import { platforms } from "../../constants/platforms";

const RocketLeague = () => {
  const [{platform}, dispatch] = useTrade();
  const [filters, dispatch2] = useTradeFilters();

  return (
    <>

      <Dropdown
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
      />  

      <div className={styles.spacer}></div>

      <Dropdown
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
      />  

      <div className={styles.spacer}></div>

      <Dropdown
        name="Platform"
        items={Object.keys(platforms).map(p => platforms[p])}
        onChange={(p) =>
          dispatch({
            type: actions.SET_PLATFORM,
            payload: p,
          })
        }
        value={platform}
      />  

      <div className={styles.spacer}></div>
      <div className={styles.spacer}></div>
      <div className={styles.spacer}></div>

      <button 
      className={styles.resetButton}
      onClick={()=> {
        dispatch2({
          type: "reset"
        })
      }}>
        RESET FILTERS
      </button>
    
      
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
