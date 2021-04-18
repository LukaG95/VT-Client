import React, { useState, useEffect, useMemo } from "react";
import styles from "./SmallChooseItems.module.scss";
import styles2 from "./Main.module.scss";
import ItemContainer from "../../../components/Rocket League/ItemContainer";
import Item from "../../../components/Rocket League/Item";
import { actions, useTrade } from "../../../context/TradeContext";
import { useTradeFilters } from "../../../context/TradeFiltersContext";
import { getTradeableItems } from "../../../constants/Items";
import FilterBar from "../../../components/Rocket League/FilterBar";
import ClearItems from "../../../components/AddTrade/ClearItems";
import ItemConfirmIcon from "./ItemConfirmIcon";

function SmallChooseItems({ setShowPage }) {
  const [items, setItems] = useState([]);
  const [filters] = useTradeFilters();
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

      RLitems.sort((a, b)=> {
        const x = a.itemName.toLowerCase();
        const y = b.itemName.toLowerCase();
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

      setItems(RLitems); // "Offer" is added in the .json
    });
  }, [filters]);

  const inventoryItems = useMemo(
    () => {
      let returnedItems = []
      for (let i = 0; i<items.length; i++){
        if (i === 0){
          returnedItems.push(<div className={styles2.itemType}>{items[i].itemType==="1Special" ? "Special" : items[i].itemType}</div>)
          returnedItems.push(<Item item={items[i]} lazy={true} onClick={() => ItemClick(items[i])} key={items[i].itemID} > <ItemConfirmIcon item={items[i]} /> </Item> )
        }
        else if(!items[i+1])
          returnedItems.push(<Item item={items[i]} lazy={true} onClick={() => ItemClick(items[i])} key={items[i].itemID}> <ItemConfirmIcon item={items[i]} /> </Item>)
        else if (items[i].itemType !== items[i+1].itemType){ // inserting item types
          returnedItems.push(<Item item={items[i]} lazy={true} onClick={() => ItemClick(items[i])} key={items[i].itemID} > <ItemConfirmIcon item={items[i]} /> </Item>)
          returnedItems.push(<div className={styles2.itemType}>{items[i+1].itemType==="1Special" ? "Special" : items[i+1].itemType}</div>)
        }
        else
          returnedItems.push(<Item item={items[i]} lazy={true} onClick={() => ItemClick(items[i])} key={items[i].itemID} > <ItemConfirmIcon item={items[i]} /> </Item> )
        
      }

      return returnedItems
    },
    [items]
  );


  return (
    <div id="add-trade-2nd-page">
      <div className="rlChooseItemsSection-SMALL">
        <FilterBar />
        <ItemContainer className={styles.itemContainer}>
          {inventoryItems}
        </ItemContainer>
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
          <ClearItems
            onClick={() =>
              dispatch({
                type: actions.CLEAR_ITEMS,
                payload: "have",
              })
            }
          />
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
          <ClearItems
            onClick={() =>
              dispatch({
                type: actions.CLEAR_ITEMS,
                payload: "want",
              })
            }
          />
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
}

export default SmallChooseItems;
