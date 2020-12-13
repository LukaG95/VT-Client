import React, { useContext } from "react";
import { TradeContextRL } from "../../../context/TradeContextRL";
import styles from "./ItemConfirmIcon.module.scss";
import CheckIcon from "../../../images/icons/check.png";
import RedCheckIcon from "../../../images/icons/check-red.png";

export default function ItemConfirmIcon(props) {
  const { have, want } = useContext(TradeContextRL);
  const { item } = props;
  let icons = [];
  //If item is in have, display have check
  if (have.find((h) => h.itemID === item.ItemID))
    icons.push(<img src={CheckIcon} className={styles.have} alt="" />);
  //If item is in want, display want check
  if (want.find((w) => w.itemID === item.ItemID))
    icons.push(<img src={RedCheckIcon} className={styles.want} alt="" />);
  return icons;
}
