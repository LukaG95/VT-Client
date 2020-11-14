import React from "react";
import LazyLoadImage from "react-cool-img";
import styles from "./Item.module.css";

export default function Item({ item, ...props }) {
  return (
    <div className={styles.item} {...props}>
      <div className={styles.imageContainer}>
        <LazyLoadImage
          className={styles.image}
          placeholder="/images/icons/question.png"
          src={`/images/items/${item.ItemID}.0.webp`}
          alt={item.Name}
        />
      </div>
      <span className={styles.name}>{item.Name}</span>
      {props.children}
    </div>
  );
}
