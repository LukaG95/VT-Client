import React from "react";
import styles from "./PlusItem.module.scss";

export default function PlusItem({ selected, type, ...props }) {
  return (
    <button
      {...props}
      className={`${styles.plus} ${selected ? styles.selected : ""} ${type === "have" && selected ? styles.have : type === "want" && selected ? styles.want : ""}`}
    >
      {selected && <span>+</span>}
    </button>
  );
}
