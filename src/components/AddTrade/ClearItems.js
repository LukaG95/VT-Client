import React from "react";
import TrashIcon from "../../images/other/trash.png";
import styles from "./ClearItems.module.scss";

export default function ClearItems(props) {
  return (
    <div className={styles.button} style={{ margin: "0px" }} {...props}>
      <img src={TrashIcon} className={styles.icon} alt="" />
    </div>
  );
}
