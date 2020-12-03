import React from "react";
import styles from "./ItemContainer.module.scss";

export default function ItemContainer(props) {
  return (
    <div
      {...props}
      className={[styles.container, props.className || ""].join(" ")}
    >
      {props.children}
      {Array(props.children.length > 12 ? 0 : 12 - props.children.length)
        .fill(null)
        .map(() => (
          <div />
        ))}
    </div>
  );
}
