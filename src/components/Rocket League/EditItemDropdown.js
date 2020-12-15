import React, { useState, useEffect, useRef } from "react";
import { actions, useTrade } from "../../context/TradeContext";
import styles from "./EditItemDropdown.module.scss";
import useWindowDimensions from "../../misc/windowHW";
import Dropdown from "../Dropdown";
import { rl_dd_names } from "../../info/DropdownNames";
import EditIcon from "../../images/icons/edit.png";

const { colorDD, certDD } = rl_dd_names;

function EditItemDropdown({ item, index, type }) {
  const [visible, setVisible] = useState(false);
  const { height } = useWindowDimensions();
  const [_context, dispatch] = useTrade();
  const [amountInput, setAmountInput] = useState(item.amount);
  //Amount Changes
  useEffect(() => {
    dispatch({
      type: actions.UPDATE_ITEM,
      payload: {
        type,
        index,
        item: {
          amount: Number(amountInput) || 1,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountInput]);
  const ref = useRef();
  //Detect Clicks
  function onClick(e) {
    if (!ref.current || (!ref.current.contains(e.target) && e.target.dataset.type !== "dropdown-item")) setVisible(false);
    if (ref.current && ref.current.parentElement.contains(e.target)) setVisible(true)
  }
  useEffect(() => {
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div ref={ref}>
      <img
        style={item.amount <= 1 ? { top: "6px" } : null}
        className="editIcon"
        src={EditIcon}
        alt=""
      />
      {visible && (
        <div
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
          <div className="item_name">{item.itemName}</div>
          <Dropdown
            name="Color"
            items={colorDD}
            className={styles.dropdowns}
            onChange={(color) =>
              dispatch({
                type: actions.UPDATE_ITEM,
                payload: {
                  type,
                  index,
                  item: {
                    color,
                    colorID: colorDD.findIndex((c) => c === color),
                  },
                },
              })
            }
            value={item.color}
            light
          />
          <Dropdown
            name={`Certification`}
            value={item.cert}
            items={certDD}
            className={styles.dropdowns}
            onChange={(cert) =>
              dispatch({
                type: actions.UPDATE_ITEM,
                payload: {
                  type,
                  index,
                  item: {
                    cert,
                  },
                },
              })
            }
            light
          />
          <div className="rl-icon-dropdown-button-section">
            <label className="enableDropdown">
              Amount - max {item.itemID === 4743 ? 100000 : 100}
            </label>
            <input
              name="enableDropdown"
              style={{ justifyContent: "space-between" }}
              value={amountInput}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d]/g, "");
                const max = item.itemID === 4743 ? 100000 : 100;
                if (Number(value) > max) setAmountInput("" + max);
                else setAmountInput(value);
              }}
            />
          </div>
          <button
            id="submit-rl-filters-button"
            onClick={() => setVisible(false)}
          >
            Done
          </button>
          <button
            id="delete-rl-filters-button"
            onClick={() =>
              dispatch({
                type: actions.REMOVE_ITEM,
                payload: {
                  type,
                  index,
                },
              })
            }
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default EditItemDropdown;
