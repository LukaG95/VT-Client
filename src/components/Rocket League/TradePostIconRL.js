import React from "react";

import imageExists from "../../misc/func";
import infoRL from "../../info/infoRL.json";

function TradepostIconRL({ item }) {
  var colorID = 0;
  infoRL.Colors.forEach((Color) => {
    if (Color.Name === item.color) colorID = Color.ID;
  });

  return (
    <div className="RLicon">
      <img
        name="enableDropdown"
        className="RLicon-item-img"
        src={imageExists(`${item.itemID}.${colorID}.webp`, item.itemID)} // pass in 2 params, if the painted image doesn't exist check if regular exists,
        alt="" // and then if both don't exist return questionmark
      />

      <AmountIcon />
      <ColorIcon />
      <CertIcon />

      <div className="RLicon-name">{item.itemName}</div>
    </div>
  );

  /*-----Functions                -------------*/

  function CertIcon() {
    if (item.cert !== "None")
      return <div className="certIcon">{item.cert}</div>;
    else return null;
  }

  function AmountIcon() {
    if (item.amount > 1) return <div className="AmountIcon">{item.amount}</div>;
    else return null;
  }

  function ColorIcon() {
    if (item.color !== "None")
      return (
        <div className={`colorIcon ${item.color.replace(/\s+/g, "")}`}>
          <span className="paint-tooltip">{item.color}</span>
        </div>
      );
    else return null;
  }
}

export default TradepostIconRL;

// This component is the rocket league icon that is displayed inside the live trade post
