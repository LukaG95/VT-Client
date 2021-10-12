import React from "react";
import styles from "./ItemConfirmIcon.module.scss";
import { ReactComponent as BlueCheckIcon } from "../../../images/icons/check blue.svg";
import { ReactComponent as RedCheckIcon } from "../../../images/icons/check red.svg";
import { useTrade } from "../../../context/TradeContext";

export default function ItemConfirmIcon({ item }) {
  const [{ have, want }] = useTrade();
  let icons = [];
  //If item is in have, display have check
  if (have.find((h) => h && (h.itemID === item.itemID && h.category === item.category)))
  icons.push(<BlueCheckIcon className={styles.have}/>);
  //If item is in want, display want check
  if (want.find((w) => w && (w.itemID === item.itemID && w.category === item.category)))
    icons.push(<RedCheckIcon className={styles.want}/>);
  return icons;
}
