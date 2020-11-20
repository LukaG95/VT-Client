import React from "react";
import styles from "./ItemContainer.module.css";

export default function ItemContainer(props) {
  return <div {...props} className={styles.container} />;
}
