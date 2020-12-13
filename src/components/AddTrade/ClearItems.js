import React from "react";
import styles from "./ClearItems.module.scss";
import TrashImage from "../../images/icons/trash.png";

export default function ClearItems(props) {
  return (
    <div {...props} className={[styles.button, props.className].join(" ")}>
      <img src={TrashImage} className={styles.icon} alt="" />
    </div>
  );
}
