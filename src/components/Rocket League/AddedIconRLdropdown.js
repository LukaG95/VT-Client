import React, { useState, useContext, useEffect } from "react";

import { TradeContextRL } from "../../context/TradeContextRL";
import { rl_dd_names } from "../../info/DropdownNames";
import infoRL from "../../info/infoRL.json";
import useWindowDimensions from "../../misc/windowHW";

const { colorDD, certDD } = rl_dd_names;

function RLitem_icon_dropdown({ item }) {
  const [color, setColor] = useState("None");
  const [certification, setCertification] = useState("None");
  const [amount, setAmount] = useState(1);

  const { setHave, setWant, have, want, deleteRLitem } = useContext(
    TradeContextRL
  );

  const { id, itemID, itemName } = item;

  const { height } = useWindowDimensions();

  useEffect(() => {
    [...have, ...want].map((item) => {
      if (item.id == id) {
        setColor(item.color);
        setCertification(item.cert);
        setAmount(item.amount);
      }
    });
  }, []);

  return (
    <div
      name="enableDropdown"
      className="rl-icon-dropdown" // style is small height positioning
      style={
        height <= 650
          ? {
              position: "fixed",
              top: "280px",
              right: "510px",
              marginTop: "-200px",
              marginLeft: "200px",
            }
          : height <= 820
          ? {
              position: "fixed",
              top: "400px",
              right: "510px",
              marginTop: "-200px",
              marginLeft: "200px",
            }
          : null
      }
    >
      <div className="item_name">{itemName}</div>

      <FilterButton
        label="Color"
        value={color}
        setFunction={setColor}
        dd={colorDD}
      />
      <FilterButton
        label="Certification"
        value={certification}
        setFunction={setCertification}
        dd={certDD}
      />
      <FilterButton
        label="Amount"
        value={amount}
        setFunction={setAmount}
        itemID={itemID}
      />

      <button id="submit-rl-filters-button" onClick={submitFilters}>
        Done
      </button>
      <button id="delete-rl-filters-button" onClick={() => deleteRLitem(id)}>
        Delete
      </button>
    </div>
  );

  function submitFilters() {
    let colorID = 0;
    let temp = [];

    infoRL.Colors.map((info_color) => {
      if (info_color.Name === color) colorID = info_color.ID;
    });

    if (amount === "" || amount == 0)
      // this is so that if users set amount to zero or an empty string it will set it back to 1 when accepting filters
      var refactorAmount = 1; // without this users won't be able to delete the initial value "1" and put for example "9"

    have.map((item) => {
      if (item.id === id) {
        item.color = color;
        item.colorID = colorID;
        item.cert = certification;
        item.amount = refactorAmount || +amount; // plus removes leading zeros
        temp.push(item);
      } else temp.push(item);
    });
    setHave(temp);

    temp = [];

    want.map((item) => {
      if (item.id === id) {
        item.color = color;
        item.colorID = colorID;
        item.cert = certification;
        item.amount = refactorAmount || +amount;
        temp.push(item);
      } else temp.push(item);
    });
    setWant(temp);
  }
}

/*-----Functions                -------------*/

function FilterButton({ dd, label, value, setFunction, itemID }) {
  const [open, setOpen] = useState(false);

  function handleAmountSubmit(e) {
    const { value } = e.target;

    if (
      (isNaN(value) && value !== "") ||
      value > (itemID === 4743 ? 100000 : 100) ||
      value < 0 ||
      value.length > 8
    )
      return;

    setFunction(value);
  }

  if (label !== "Amount") {
    return (
      <div
        className="rl-icon-dropdown-button-section"
        onMouseLeave={() => setTimeout(() => setOpen(false), 190)}
      >
        <label className="enableDropdown"> {label} </label>

        <button
          name="enableDropdown"
          onClick={() => setOpen(!open)}
          id={open ? "blackBorder" : null}
          style={{ justifyContent: "space-between" }}
        >
          <p>{value}</p>
          <i className="dd-arrow"></i>
        </button>

        {open && (
          <DropdownMenu setFunction={setFunction} dd={dd} setOpen={setOpen} />
        )}
      </div>
    );
  } else
    return (
      <div className="rl-icon-dropdown-button-section">
        <label className="enableDropdown">
          {label} - max {itemID === 4743 ? 100000 : 100}
        </label>

        <input
          name="enableDropdown"
          style={{ justifyContent: "space-between" }}
          value={value}
          onChange={(e) => handleAmountSubmit(e)}
        />
      </div>
    );
}

function DropdownMenu({ dd, setFunction, setOpen }) {
  const [dropNames, setDropNames] = useState(() =>
    dd.map((item) => <MenuItem>{item}</MenuItem>)
  );

  function MenuItem({ children }) {
    return (
      <div
        className="rl-attribute-dd-item"
        onClick={() => {
          setOpen((prev) => !prev);
          setFunction(children);
        }}
      >
        {children}
      </div>
    );
  }

  return <div className="rl-dd-dd">{dropNames}</div>;
}

export default RLitem_icon_dropdown;
