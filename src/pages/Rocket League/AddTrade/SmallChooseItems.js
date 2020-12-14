import React, { useState, useEffect, useMemo } from "react";
import styles from "./SmallChooseItems.module.scss";
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
    });
  }, [filters]);

  const inventoryItems = useMemo(
    () =>
      items.map((item) => (
        <Item
          item={item}
          onClick={() => ItemClick(item)}
          key={item.itemID}
          lazy
        >
          <ItemConfirmIcon item={item} />
        </Item>
        // eslint-disable-next-line react-hooks/exhaustive-deps
      )),
    [items]
  );

  return (
    <div id="add-trade-2nd-page">
      <div className="rlChooseItemsSection-SMALL">
        <FilterBar />
        <ItemContainer className={styles.itemContainer}>
          {inventoryItems}
        </ItemContainer>
      </div>
      {/* Selected Amounts */}
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
