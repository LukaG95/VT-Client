import React, { useState, useEffect, useMemo } from "react";
import styles from "./SmallChooseItems.module.scss";
import styles2 from "./Main.module.scss";
import ItemContainer from "../../../components/Categories/Rocket League/ItemContainer";
import Item from "../../../components/Categories/Rocket League/Item";
import { actions, useTrade } from "../../../context/TradeContext";
import { useTradeFilters } from "../../../context/TradeFiltersContext";
import { getTradeableItems } from "../../../constants/Items";
import {CategoriesJson} from "../../../constants/Categories/Categories";
import FilterBar from "../../../components/Categories/Rocket League/FilterBar";
import ClearItems from "../../../components/AddTrade/ClearItems";
import ItemConfirmIcon from "./ItemConfirmIcon";
import { ReactComponent as MagnifyingGlass } from "../../../images/icons/magnifying glass.svg";

function SmallChooseItems({ setShowPage }) {
  const [items, setItems] = useState([]);
  const [filters, dispatch2] = useTradeFilters();
  const [{ have, want, selected }, dispatch] = useTrade();
  //On Item Click
  function ItemClick(item) {
    dispatch({
      type: actions.ADD_ITEM,
      payload: item,
    });
  }
  //Filtered Items
  useEffect(() => {
    process.nextTick(() => {
      if(filters.category === "Rocket League")
        setItems(getRocketLeagueItems()); 
      else 
        setItems(getManualItems())
    });
  }, [filters]);

  const inventoryItems = useMemo(
    () => {
      let returnedItems = []
      let currentType = ""
      // inserting item types
      for (let i = 0; i<items.length; i++){
        if (items[i].itemType !== currentType){
          returnedItems.push(<div className={styles2.itemType}>{items[i].itemType==="1Special" ? "Special" : items[i].itemType}</div>)
          returnedItems.push(<Item item={items[i]} lazy={true} onClick={() => ItemClick(items[i])} key={items[i].itemID} ><ItemConfirmIcon item={items[i]} /></Item> )
          currentType = items[i].itemType
        }
        else
          returnedItems.push(<Item item={items[i]} lazy={true} onClick={() => ItemClick(items[i])} key={items[i].itemID} ><ItemConfirmIcon item={items[i]} /> </Item> )
        
      }
      return returnedItems
    },
    [items, filters.category]
  );
  

  return (
    <div id="add-trade-2nd-page">
      <div className="rlChooseItemsSection-SMALL">
        <div className="initial-filter-header-addTrade">
          
          <MagnifyingGlass style={{ width: "15px", height: "15px"}} />
          <input
            placeholder="Search items..."
            onChange={(e) => {
              if (e.target.value !== filters.name)
                dispatch2({
                  type: "setFilter",
                  payload: {
                    type: "name",
                    value: e.target.value.toLowerCase(),
                  },
                });
            }}
          />
        </div>

        <div className={styles.itemsField}>
          <ItemContainer className={styles.itemContainer} comingSoon={filters.category === "CSGO" || filters.category === "Keys And Currency"}>
            {filters.category === "CSGO" || filters.category === "Keys And Currency" ? "Coming Soon" : inventoryItems}
          </ItemContainer>
        </div>
        
        <div className="added-items-notice-phone">
          <div
            className="have-count-notice"
            style={selected.type !== "have" ? { opacity: "0.65" } : null}
            onClick={() =>
              dispatch({
                type: actions.SET_TYPE,
                payload: "have",
              })
            }
          >
          <pre>Have: {have.filter((i) => i).length}/12</pre>
          {/*
           <ClearItems
            onClick={() =>
              dispatch({
                type: actions.CLEAR_ITEMS,
                payload: "have",
              })
            }
          />
          */}
         
          <span></span>
          </div>

          <div
            className="want-count-notice"
            style={selected.type !== "want" ? { opacity: "0.65" } : null}
            onClick={() =>
              dispatch({
                type: actions.SET_TYPE,
                payload: "want",
              })
            }
          >
            <pre>Want: {want.filter((i) => i).length}/12</pre>
            {/*
            <ClearItems
              onClick={() =>
                dispatch({
                  type: actions.CLEAR_ITEMS,
                  payload: "want",
                })
              }
            />
            */}
            
            <span></span>
          </div>
        </div>
      </div>
      {/* Selected Amounts */}
      
      <button
        className="add-trade-done-button"
        onClick={() => setShowPage("1")}
      >
        DONE
      </button>
    </div>
  );

  function getManualItems(){

    let manualItems = CategoriesJson[filters.category].map(item => item).sort((a, b)=> {
      const x = a.itemName.toLowerCase();
      const y = b.itemName.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })

    if (filters.name) {
      manualItems = manualItems.filter(
        (i) => i.itemName.toLowerCase().search(filters.name) > -1
      );
    }

    return manualItems
  }

  function getRocketLeagueItems(){
    let RLitems = getTradeableItems();
     
    if (filters.type === "Blueprint"){
      RLitems = RLitems.filter((i) => i.blueprintable)
    }
    else if (filters.type !== "Any") {
      RLitems = RLitems.filter((i) => i.itemType === filters.type)
    }  
    if (filters.name) {
      RLitems = RLitems.filter(
        (i) => i.itemName.toLowerCase().search(filters.name) > -1
      );
    }
  
    if (filters.type === "Blueprint"){
      RLitems = RLitems.map(item => ({...item, blueprint: true}))
    } else{
      RLitems = RLitems.map(item => ({...item, blueprint: false}))
    }
  
    if (filters.quality !== "Any") {
      RLitems = RLitems.filter((i) => i.quality === filters.quality)
    }  
  
    RLitems.sort((a, b)=> {
      const x = a.itemName.toLowerCase();
      const y = b.itemName.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })
  
    RLitems.sort((a, b)=> {
      const x = a.quality.toLowerCase();
      const y = b.quality.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })
    
    RLitems.sort((a, b)=> {
      const x = a.itemType.toLowerCase();
      const y = b.itemType.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })
  
    return RLitems
  }
}

export default SmallChooseItems;
