import React from "react";
import styles from "./ClearItems.module.scss";

export default function ClearItems(props) {
  return (
    <div className={styles.button} style={{ margin: "0px" }} {...props}>
      <img src="/images/icons/trash.png" className={styles.icon} alt="" />
    </div>
  );
}
