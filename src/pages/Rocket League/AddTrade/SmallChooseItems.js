import React, { useState, useEffect, useContext } from "react";
import styles from "./SmallChooseItems.module.css";
import AddTradeFiltersRL from "../../../components/Rocket League/FilterBar";
import { TradeContextRL } from "../../../context/TradeContextRL";
import RLInfo from "../../../constants/RocketLeagueInfo.json";
import ItemContainer from "../../../components/Rocket League/ItemContainer";
import Item from "../../../components/Rocket League/Item";
import ItemConfirmIcon from "./ItemConfirmIcon";

function SmallChooseItems({ setShowPage, displayPage }) {
  const [itemImages, setItemImages] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  const { have, want, clearHaveItems, clearWantItems, pushItem } = useContext(
    TradeContextRL
  );
  //On Item Click
  const ItemClick = (item) => {
    console.log(item);
    pushItem(item);
    setSelectedItems([...selectedItems, item.ItemID]);
  };
  //Map All Items
  useEffect(() => {
    setItemImages(
      RLInfo.Slots.map((Slot) =>
        Slot.Items.map((item) => {
          if (item.Tradable)
            return (
              <Item
                item={item}
                onClick={() => ItemClick(item)}
                key={item.ItemID}
              >
                <ItemConfirmIcon item={item} />
              </Item>
            );
          else return null;
        })
      )
    );
  }, []);

  return (
    <div id="add-trade-2nd-page">
      <div className="rlChooseItemsSection-SMALL">
        <AddTradeFiltersRL setItemImages={setItemImages} />
        <ItemContainer>{itemImages}</ItemContainer>
      </div>
      {showSelectedAmount()}
      <button
        className="add-trade-back-button"
        onClick={() => setShowPage("1")}
      >
        BACK
      </button>
    </div>
  );

  function showSelectedAmount() {
    const have_count = have.filter((i) => i.isAdded).length;
    const want_count = want.filter((i) => i.isAdded).length;
    const focused_field = have.find((i) => i.isFocused) ? "have" : "want";

    if (have_count > 0 || want_count > 0)
      return (
        <div className="added-items-notice-phone">
          <div
            className="have-count-notice"
            style={focused_field !== "have" ? { opacity: "0.65" } : null}
          >
            <pre>Have: {have_count}/12</pre>
            <img
              src="/images/icons/trash.png"
              style={{ height: "20px", width: "20px", cursor: "pointer" }}
              onClick={() => clearHaveItems()}
              alt="trash"
            />
            <span></span>
          </div>

          <div
            className="want-count-notice"
            style={focused_field !== "want" ? { opacity: "0.65" } : null}
          >
            <pre>Want: {want_count}/12</pre>
            <img
              src="/images/icons/trash.png"
              style={{ height: "20px", width: "20px", cursor: "pointer" }}
              onClick={() => clearWantItems()}
              alt="trash"
            />
            <span></span>
          </div>
        </div>
      );
    else return null;
  }
}

export default SmallChooseItems;
