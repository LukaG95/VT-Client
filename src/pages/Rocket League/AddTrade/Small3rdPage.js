import React, { useState, useEffect } from "react";
import { actions, useTrade } from "../../../context/TradeContext";
import Dropdown from "../../../components/Dropdown";
import { rl_dd_names } from "../../../misc/DropdownNames";
import styles from "./Small3rdPage.module.scss";

const { colorDD, certDD } = rl_dd_names;

function Small3rdPage({ setShowPage, clickedItem }) {
  const [context, dispatch] = useTrade();
  const item = context[clickedItem.type][clickedItem.index];
  const [amountInput, setAmountInput] = useState(item.amount);

  //Amount Changes
  useEffect(() => {
    dispatch({
      type: actions.UPDATE_ITEM,
      payload: {
        ...clickedItem,
        item: {
          amount: Number(amountInput) || 1,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountInput]);

  return (
    <div id="add-trade-3rd-page">
      <div className="add-trade-3rd-page-header-field">
        <img src={`/images/items/${item.itemID}.0.webp`} alt="" />
        <div>
          <p>{item.itemName}</p>
          <button
            onClick={() => {
              dispatch({
                type: actions.REMOVE_ITEM,
                payload: {
                  ...clickedItem,
                },
              });
              setShowPage("1");
            }}
          >
            Delete Item
          </button>
        </div>
      </div>
      
      <Dropdown
        name="Color"
        items={colorDD}
        className={styles.dropdown}
        onChange={(color) =>
          dispatch({
            type: actions.UPDATE_ITEM,
            payload: {
              ...clickedItem,
              item: {
                color,
                colorID: colorDD.findIndex((c) => c === color),
              },
            },
          })
        }
        value={item.color}
        floating={"-150px"}
      />
  
      <Dropdown
        name={`Certification`}
        value={item.cert}
        items={certDD}
        className={styles.dropdown}
        onChange={(cert) =>
          dispatch({
            type: actions.UPDATE_ITEM,
            payload: {
              ...clickedItem,
              item: {
                cert,
              },
            },
          })
        }
        floating={"-220px"}
      />
     
      <div className="add-trade-3rd-page-input-fields rl-icon-amount-filter-field">
        <label className="enableDropdown">
          Amount - max {item.itemID === 4743 ? 100000 : 100}
        </label>
        <input
          name="amount-dropdown"
          className="rl-icon-dropdown-button-section"
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
        className="add-trade-done-button"
        onClick={() => setShowPage("1")}
      >
        DONE
      </button>
    </div>
  );
}

export default Small3rdPage;
