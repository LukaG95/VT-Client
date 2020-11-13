import React from "react";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import styles from "./Item.module.css";

export default function Item(props) {
  const { item } = props;
  return (
    <LazyLoadComponent
      threshold={500}
      placeholder={<div className={styles.placeholder} />}
      key={item.ItemID}
    >
      <div className={styles.item} {...props}>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src="/images/icons/question.png"
              alt={item.Name}
            />
            <LazyLoadImage
              className={styles.image}
              src={`/images/items/${item.ItemID}.0.webp`}
              threshold={500}
              alt=""
            />
          </div>
          <span className={styles.name}>{item.Name}</span>
        </div>
      </div>
    </LazyLoadComponent>
  );
}
