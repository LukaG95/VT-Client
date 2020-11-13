import React, { useContext } from "react";
import CheckImage from "../../../images/other/check.png";
import CheckRedImage from "../../../images/other/check-red.png";
import { TradeContextRL } from "../../../context/TradeContextRL";

export default function ItemConfirmIcon(props) {
  const { have, want } = useContext(TradeContextRL);
  const { item } = props;
  let have_item = [];
  let want_item = [];

  have.forEach((space) => {
    if (space.itemID === item.ItemID) have_item.push("a");
  });

  let result = have.filter((obj) => {
    return obj.itemID === item.ItemID;
  });

  if (result.length === 0) have_item = [];

  want.forEach((space) => {
    if (space.itemID === item.ItemID) want_item.push("a");
  });

  result = want.filter((obj) => {
    return obj.itemID === item.ItemID;
  });

  if (result.length === 0) want_item = [];
  if (have_item.length > 0 && want_item.length > 0)
    return (
      <>
        <img src={CheckImage} className="success-added-have-items" alt="" />
        <img src={CheckRedImage} className="success-added-want-items" alt="" />
      </>
    );
  else if (have_item.length > 0)
    return <img src={CheckImage} className="success-added-have-items" alt="" />;
  else if (want_item.length > 0)
    return (
      <img src={CheckRedImage} className="success-added-want-items" alt="" />
    );
  else return null;
}
