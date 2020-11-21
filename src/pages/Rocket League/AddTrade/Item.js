import React from "react";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import styles from "./Item.module.css";

export default function Item({ item, lazy = false, ...props }) {
  const content = (
    <div className={styles.item} {...props}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src="/images/icons/question.png"
            alt={item.Name}
          />
          {lazy ? (
            <LazyLoadImage
              className={styles.image}
              src={`/images/items/${item.ItemID}.0.webp`}
              threshold={100}
              delayTime={0}
              alt=""
              lazy="true"
            />
          ) : (
            <img
              className={styles.image}
              src={`/images/items/${item.ItemID}.0.webp`}
              alt=""
              lazy="true"
            />
          )}
        </div>
        <span className={styles.name}>{item.Name}</span>
      </div>
      {props.children}
    </div>
  );
  if (lazy) {
    return (
      <LazyLoadComponent
        threshold={100}
        placeholder={<div className={styles.placeholder} />}
        key={item.ItemID}
      >
        {content}
      </LazyLoadComponent>
    );
  } else {
    return content;
  }
}
