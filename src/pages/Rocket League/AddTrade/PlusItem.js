import React from "react";
import styles from "./PlusItem.module.scss";

export default function PlusItem({ selected, ...props }) {
  return (
    <button
      {...props}
      className={`${styles.plus} ${selected ? styles.selected : ""}`}
    >
      {selected && <span>+</span>}
    </button>
  );
}
