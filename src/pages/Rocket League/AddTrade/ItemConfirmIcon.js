import React from "react";
import styles from "./ItemConfirmIcon.module.scss";
import CheckIcon from "../../../images/icons/check.png";
import RedCheckIcon from "../../../images/icons/check-red.png";
import { useTrade } from "../../../context/TradeContext";

export default function ItemConfirmIcon({ item }) {
  const [{ have, want }] = useTrade();
  let icons = [];
  //If item is in have, display have check
  if (have.find((h) => h && h.itemID === item.itemID))
    icons.push(<img src={CheckIcon} className={styles.have} alt="" />);
  //If item is in want, display want check
  if (want.find((w) => w && w.itemID === item.itemID))
    icons.push(<img src={RedCheckIcon} className={styles.want} alt="" />);
  return icons;
}
