import React from "react";
import styles from "./ClearItems.module.scss";
import TrashImage from "../../images/icons/trash.png";

export default function ClearItems(props) {
  return (
    <div className={styles.button} style={{ margin: "0px" }} {...props}>
      <img src={TrashImage} className={styles.icon} alt="" />
    </div>
  );
}
