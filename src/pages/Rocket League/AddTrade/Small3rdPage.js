import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { createNotification } from "../../../App";
import { TradeContextRL } from "../../../context/TradeContextRL";
import { UserContext } from "../../../context/UserContext";
import infoRL from "../../../info/infoRL.json";
import imageExists from "../../../misc/func";

import useWindowDimensions from "../../../misc/windowHW";
import { rl_dd_names } from "../../../info/DropdownNames";

const { colorDD, certDD } = rl_dd_names;

function Small3rdPage({ setShowPage, clickedItem }) {
  const [color, setColor] = useState("None");
  const [certification, setCertification] = useState("None");
  const [amount, setAmount] = useState(1);

  const { have, want, setHave, setWant, deleteRLitem } = useContext(
    TradeContextRL
  );

  const { id, itemID, itemName } = clickedItem;

  useEffect(() => {
    setColor(clickedItem.color);
    setCertification(clickedItem.cert);
    setAmount(clickedItem.amount);
  }, []);

  return (
    <div id="add-trade-3rd-page">
      <div className="add-trade-3rd-page-header-field">
        <img src={imageExists(`${itemID}.0.webp`)} />
        <div>
          <p>{itemName}</p>
          <button
            onClick={() => {
              deleteRLitem(id);
              setShowPage("1");
            }}
          >
            Delete item
          </button>
        </div>
      </div>

      <FilterButton
        label="Color"
        value={color}
        setFunction={setColor}
        dd={colorDD}
        translate="translateY(-150px)"
      />
      <FilterButton
        label="Certification"
        value={certification}
        setFunction={setCertification}
        dd={certDD}
        translate="translateY(-215px)"
      />
      <FilterButton
        label="Amount"
        value={amount}
        setFunction={setAmount}
        itemID={itemID}
      />

      <button
        className="add-trade-confirm-button"
        onClick={() => {
          submitFilters();
          setShowPage("1");
        }}
      >
        CONFIRM
      </button>

      <button
        className="add-trade-back-button"
        onClick={() => setShowPage("1")}
      >
        BACK
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

function FilterButton({ dd, label, value, setFunction, itemID, translate }) {
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
        id={`${label}`}
        className="rl-icon-dropdown-button-section"
        style={
          open
            ? { zIndex: "2", marginBottom: "15px" }
            : { marginBottom: "15px" }
        }
      >
        <button
          name="enableDropdown"
          onClick={() => {
            if (!open) {
              document.getElementById(`${label}`).style.transform = translate;
              setTimeout(() => {
                setOpen(!open);
              }, 500);
            } else {
              document.getElementById(`${label}`).style.transform =
                "translateY(0px)";
              setOpen(!open);
            }
          }}
          style={
            open ? { border: "1px solid black", borderBottom: "none" } : null
          }
          className="filter-button-small"
        >
          <div className="filter-button-left-small">
            <label className="enableDropdown"> {label} </label>
            <p>{value}</p>
          </div>

          <i className="dd-arrow"></i>
        </button>

        {open && (
          <DropdownMenu
            setFunction={setFunction}
            dd={dd}
            setOpen={setOpen}
            label={label}
          />
        )}
      </div>
    );
  } else
    return (
      <div className="rl-icon-amount-filter-field">
        <label>
          
          {label} - max {itemID === 4743 ? 100000 : 100}
        </label>

        <input
          name="enableDropdown"
          value={value}
          onChange={(e) => handleAmountSubmit(e)}
        />
      </div>
    );
}

function DropdownMenu({ dd, setFunction, setOpen, label }) {
  const [dropNames, setDropNames] = useState(() =>
    dd.map((item) => <MenuItem>{item}</MenuItem>)
  );

  function MenuItem({ children }) {
    return (
      <div
        className="rl-attribute-dd-item"
        onClick={() => {
          document.getElementById(`${label}`).style.transform =
            "translateY(0px)";
          setOpen((prev) => !prev);
          setFunction(children);
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="rl-dd-dd" id="rl-dd-dd-mobile">
      {dropNames}
    </div>
  );
}

export default Small3rdPage;
