import React, { useState, useEffect } from "react";
import styles from "./SmallChooseItems.module.scss";
import ItemContainer from "../../../components/Rocket League/ItemContainer";
import Item from "../../../components/Rocket League/Item";
import { useTrade } from "../../../context/TradeContext";
import { useTradeFilters } from "../../../context/TradeFiltersContext";
import { getTradeableItems } from "../../../constants/Items";
import FilterBar from "../../../components/Rocket League/FilterBar";
import ClearItems from "../../../components/AddTrade/ClearItems";

function SmallChooseItems({ setShowPage, slot, setSlot }) {
  const [items, setItems] = useState(getTradeableItems());
  const [filters] = useTradeFilters();
  const [
    { have, want },
    dispatch,
  ] = useTrade();
  //On Item Click
  function ItemClick(item) {
    dispatch({
      type: "addItem",
      payload: {
        type: slot,
        item,
      },
    });
    if (slot === "have" && have.length === 11) return setSlot("want");
    if (slot === "wave" && want.length === 11) return setSlot("have");
  }
  //Filtered Items
  useEffect(() => {
    let items = getTradeableItems();
    if (filters.type !== "Any") {
      items = items.filter((i) => i.itemType === filters.type);
    }
    if (filters.name) {
      items = items.filter(
        (i) => i.itemName.toLowerCase().search(filters.name) > -1
      );
    }
    setItems(items);
  }, [filters]);

  return (
    <div id="add-trade-2nd-page">
      <div className="rlChooseItemsSection-SMALL">
        <FilterBar />
        <ItemContainer className={styles.itemContainer}>
          {items.map((item) => (
            <Item
              item={item}
              onClick={() => ItemClick(item)}
              key={item.itemID}
              lazy
            />
          ))}
        </ItemContainer></div>
      {/* Selected Amounts */}
      <div className="added-items-notice-phone">
        <div
          className="have-count-notice"
          style={slot !== "have" ? { opacity: "0.65" } : null}
          onClick={() => setSlot("have")}
        >
          <pre>Have: {have.length}/12</pre>
          <ClearItems
            onClick={() =>
              dispatch({
                type: "clearItems",
                payload: "have",
              })
            }
          />
        </div>
        <div
          className="want-count-notice"
          style={slot !== "want" ? { opacity: "0.65" } : null}
          onClick={() => setSlot("want")}
        >
          <pre>Want: {want.length}/12</pre>
          <ClearItems
            onClick={() =>
              dispatch({
                type: "clearItems",
                payload: "want",
              })
            }
          />
        </div>
      </div>
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
