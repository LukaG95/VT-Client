import React, { useContext } from "react";
import { TradeContextRL } from "../../../context/TradeContextRL";
import CheckImage from "../../../images/other/check.png"
import CheckRedImage from "../../../images/other/check-red.png"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from "./ItemImage.module.css";

function RLicon({ item, selectedItems, setSelectedItems }) {
  const { pushItem, have, want } = useContext(TradeContextRL);
  return (
    <>
      <div className={styles.container}>
        <img
          className={styles.image}
          src="/images/icons/question.png"
          alt={item.Name} />
        <LazyLoadImage
          className={styles.image}
          src={`/images/items/${item.ItemID}.0.webp`}
          threshold={500}
          onClick={() => {
            pushItem(item);
            setSelectedItems([...selectedItems, item.ItemID]);
          }}
          alt=""
        />
      </div>
      {confirmIcon()}
    </>
  );

  function confirmIcon() {
    let have_item = [];
    let want_item = [];

    have.forEach((space) => {
      if (space.itemID === item.ItemID) have_item.push("a");
    });

    let result = have.filter((obj) => {
      return obj.itemID === item.ItemID;
    });

    if (result.length === 0) have_item = [];

    want.forEach((space) => {
      if (space.itemID === item.ItemID) want_item.push("a");
    });

    result = want.filter((obj) => {
      return obj.itemID === item.ItemID;
    });

    if (result.length === 0) want_item = [];
    if (have_item.length > 0 && want_item.length > 0)
      return (
        <>
          <img
            src={CheckImage}
            className="success-added-have-items"
            alt=""
          />
          <img
            src={CheckRedImage}
            className="success-added-want-items"
            alt=""
          />
        </>
      );
    else if (have_item.length > 0)
      return (
        <img
          src={CheckImage}
          className="success-added-have-items"
          alt=""
        />
      );
    else if (want_item.length > 0)
      return (
        <img
          src={CheckRedImage}
          className="success-added-want-items"
          alt=""
        />
      );
    else return null;
  }
}

export default RLicon;
