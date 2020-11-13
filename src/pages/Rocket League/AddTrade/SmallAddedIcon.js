import React, { useContext } from "react";

import { TradeContextRL } from "../../context/TradeContextRL";
import AddedIconRLdropdown from "./AddedIconRLdropdown";
import imageExists from "../../misc/func";

function AddedIconRL({ item }) {
  const {
    id,
    itemID,
    color,
    colorID,
    cert,
    amount,
    isDropdown,
  } = item;
  const { setIsDropdown } = useContext(TradeContextRL);

  return (
    <>
      <div
        className="RLicon noUserInteraction"
        style={{
          height: "95px",
          width: "95px",
          marginBottom: "0px",
          position: "relative",
        }}
      >
        <div
          onClick={() => setIsDropdown(id)}
          style={{ height: "95px", width: "95px" }}
        >
          <img
            name="enableDropdown"
            id={id}
            style={{
              height: "95px",
              width: "95px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            src={imageExists(`${itemID}.${colorID}.webp`)}
            alt=""
          />

          <EditIcon />
          <AmountIcon />
          <ColorIcon />
          <CertIcon />
        </div>

        <Dropdown />
      </div>
    </>
  );

  /*-----Functions                -------------*/

  function Dropdown() {
    if (isDropdown === true) return <AddedIconRLdropdown item={item} />;
    else return null;
  }

  function CertIcon() {
    if (cert !== "None") return <div className="certIcon">{cert}</div>;
    else return null;
  }

  function AmountIcon() {
    if (amount > 1) return <div className="AmountIcon">{amount}</div>;
    else return null;
  }

  function ColorIcon() {
    if (color !== "None")
      return (
        <div className={`colorIcon ${color.replace(/\s+/g, "")}`}>
          <span className="paint-tooltip">{color}</span>
        </div>
      );
    else return null;
  }

  function EditIcon() {
    return (
      <img
        style={amount <= 1 ? { top: "6px" } : null}
        className="editIcon"
        src={require(`../../images/other/Edit-icon.png`)}
        alt=""
      />
    );
  }
}

export default AddedIconRL;
