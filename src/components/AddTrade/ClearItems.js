import React from "react";
import styles from "./ClearItems.module.scss";
import { ReactComponent as Trash } from "../../images/icons/trash.svg";

export default function ClearItems(props) {
  return (
    <div
      {...props}
      className={[styles.button, props.className || ""].join(" ")}
    >
      <Trash className={styles.icon} />
    </div>
  );
}
