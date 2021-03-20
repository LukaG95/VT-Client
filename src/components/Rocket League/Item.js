import React from "react";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import styles from "./Item.module.scss";
import MissingImageIcon from "../../images/icons/question.png";

export default function Item({ item, lazy, hideName, added, ...props }) {

  const content = (
    <div
      className={`${styles.item} ${hideName ? styles.hideName : ""}`}
      {...props}
    >
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={MissingImageIcon}
            alt={item.Name}
          />
          {lazy ? (
            <LazyLoadImage
              className={`${styles.image}`}
              src={`/images/items/${item.itemID}.${item.colorID || "0"}.webp`}
              threshold={100}
              delayTime={0}
              alt=""
            />
          ) : (
            <img
              className={styles.image}
              src={`/images/items/${item.itemID}.${item.colorID || "0"}.webp`} 
              alt=""
              style={added ? {borderRadius: "5px"} : null}
            />
          )}
        </div>
        {!hideName && <span className={styles.name} >{item.itemName}</span>}
        {/* Icons + Overlays */}
        {item.cert && item.cert !== "None" && (
          <div className={[styles.cert, hideName ? styles.certAdjustment : ""].join(" ")}>{item.cert}</div>
        )}
        {item.amount > 1 && <div className={styles.amount}>{item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>}
        {item.color && item.color !== "None" && (
          <div className={`${styles.color} ${item.color.replace(/\s+/g, "")}`}>
            <span className={styles.tooltip}>{item.color}</span>
          </div>
        )}
      </div>
      {props.children}
    </div>
  );
  if (lazy) {
    return (
      <LazyLoadComponent
        threshold={100}
        placeholder={<div className={styles.placeholder} />}
        key={item.itemID}
      >
        {content}
      </LazyLoadComponent>
    );
  } else {
    return content;
  }

}
