import React, { useState, useEffect, useContext } from "react";
import styles from "./SmallChooseItems.module.css";
import AddTradeFiltersRL from "../../../components/Rocket League/AddTradeFiltersRL";
import { TradeContextRL } from "../../../context/TradeContextRL";
import infoRL from "../../../info/infoRL.json";
import ItemImage from "./ItemImage";
import { LazyLoadComponent } from 'react-lazy-load-image-component';

function SmallChooseItems({ setShowPage, displayPage }) {
  const [itemImages, setItemImages] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  const { have, want, clearHaveItems, clearWantItems } = useContext(
    TradeContextRL
  );

  useEffect(() => {
      setItemImages(
        infoRL.Slots.map((Slot) =>
          Slot.Items.map((item) => {
            if (item.Tradable)
              return (
                <LazyLoadComponent
                  scrollContainer={".item-imagesRL-SMALL"}
                  threshold={500}
                  placeholder={<div className={styles.placeholder} />}
                  key={item.ItemID}
                >
                  <div className={`${styles.item} noUserInteraction`}>
                    <div className={styles.content}>
                      <ItemImage
                        item={item}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                      />
                      <span className={styles.name}>{item.Name}</span>
                    </div>
                  </div>
                </LazyLoadComponent>
              )
            else return null;
          })
        )
      );
  }, []);

  return (
    <div id="add-trade-2nd-page">
      <div className="rlChooseItemsSection-SMALL">
        <AddTradeFiltersRL
          itemImages={itemImages}
          setItemImages={setItemImages}
        />
        <div className={styles.itemContainer}>
          {itemImages}
        </div>
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
    let have_count = 0;
    let want_count = 0;
    let focused_field = "";

    have.forEach((item) => {
      if (item.isAdded) have_count++;
      if (item.isFocused) focused_field = "have";
    });

    want.forEach((item) => {
      if (item.isAdded) want_count++;
      if (item.isFocused) focused_field = "want";
    });

    if (have_count > 0 || want_count > 0)
      return (
        <div className="added-items-notice-phone">
          <div
            className="have-count-notice"
            style={focused_field !== "have" ? { opacity: "0.65" } : null}
          >
            <pre>Have: {have_count}/12</pre>
            <img
              src={require(`../../../images/other/trash.png`)}
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
              src={require(`../../../images/other/trash.png`)}
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