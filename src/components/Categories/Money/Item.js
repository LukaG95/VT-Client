import React from "react";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import styles from "./Item.module.scss";
import MissingImageIcon from "../../../images/icons/question.png";

export default function Item({ item, lazy, hideName, added, ...props }) {

  const content = (
    <div
      className={`${styles.item} ${hideName ? styles.hideName : ""}`}
      {...props}
    >
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          
          {lazy ? (
            <LazyLoadImage
              className={`${styles.image}`}
              src={imagePath()}
              threshold={100}
              delayTime={0}
              alt=""
            />
          ) : (
            <img
              className={styles.image}
              src={imagePath()}
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
        {item.amount > (item.category === "Money" ? 0 : 1) && 
          <div className={styles.amount}>{new Intl.NumberFormat('en-US').format(item.amount)}{item.category === "Money" && "$"}</div>   /*replace is for the dots separator*/
        } 
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

  function imagePath(){
    if (item.category === "Rocket League"){
      if (item.itemID <= 9999 && item.itemID >= 9986)
        return `/images/${item.category.replace(/ /g, "")}/items/${item.itemID}.png`
      else if (item.blueprint)
        return `/images/${item.category.replace(/ /g, "")}/blueprints/${item.itemID}.${item.colorID || "0"}.webp`
      else
        return `/images/${item.category.replace(/ /g, "")}/items/${item.itemID}.${item.colorID || "0"}.webp`
    }
    else {
      return `/images/${item.category.replace(/ /g, "")}/${item.itemID}.png`
    }

  } 
}
