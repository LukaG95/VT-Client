import React, { useContext } from "react";
import CheckImage from "../../../images/other/check.png";
import CheckRedImage from "../../../images/other/check-red.png";
import { TradeContextRL } from "../../../context/TradeContextRL";
import styles from "./ItemConfirmIcon.module.css";

export default function ItemConfirmIcon(props) {
  const { have, want } = useContext(TradeContextRL);
  const { item } = props;
  let icons = [];
  //If item is in have, display have check
  if (have.find((h) => h.itemID === item.ItemID))
    icons.push(<img src={CheckImage} className={styles.have} alt="" />);
  //If item is in want, display want check
  if (want.find((w) => w.itemID === item.ItemID))
    icons.push(<img src={CheckRedImage} className={styles.want} alt="" />);
  return icons;
}
