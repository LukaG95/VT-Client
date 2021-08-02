import React from "react";
import styles from "./ItemContainer.module.scss";

export default function ItemContainer(props) {
  return (
    <div
      {...props}
      className={[styles.container, props.className || ""].join(" ")}
      style={props.csgo ? {color: "#f6f6f6", display: "flex", paddingTop: "50px", fontSize: "24px", fontWeight: "600", justifyContent: "center"} : {}}
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
