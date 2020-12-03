import React, { useState, useEffect } from "react";
import { useTrade } from "../../../context/TradeContext";
import Dropdown from "../../../components/Dropdown";
import { rl_dd_names } from "../../../info/DropdownNames";
const { colorDD, certDD } = rl_dd_names;

function Small3rdPage({ setShowPage, clickedItem }) {
  const [context, dispatch] = useTrade();
  const item = context[clickedItem.type][clickedItem.index]
  const [amountInput, setAmountInput] = useState(item.amount)

  //Amount Changes
  useEffect(() => {
    dispatch({
      type: "updateItem",
      payload: {
        ...clickedItem,
        item: {
          amount: Number(amountInput) || 1,
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountInput])

  return (
    <div id="add-trade-3rd-page">
      <div className="add-trade-3rd-page-header-field">
        <img src={`/images/items/${item.itemID}.0.webp`} alt="" />
        <div>
          <p>{item.itemName}</p>
          <button
            onClick={() => {
              dispatch({
                type: "removeItem",
                payload: {
                  ...clickedItem
                }
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
        onChange={(color) => dispatch({
          type: "updateItem",
          payload: {
            ...clickedItem,
            item: {
              color,
              colorID: colorDD.findIndex(c => c === color)
            }
          }
        })}
        value={item.color}
      />
      <Dropdown
        name={`Certification`}
        value={item.cert}
        items={certDD}
        onChange={(cert) => dispatch({
          type: "updateItem",
          payload: {
            ...clickedItem,
            item: {
              cert
            }
          }
        })} />
      <label className="enableDropdown">
        Amount - max {item.itemID === 4743 ? 100000 : 100}
      </label>
      <input
        name="amount-dropdown"
        className="rl-icon-dropdown-button-section"
        style={{ justifyContent: "space-between" }}
        value={amountInput}
        onChange={(e) => {
          const value = e.target.value.replace(/[^\d]/g, "")
          const max = item.itemID === 4743 ? 100000 : 100
          if (Number(value) > max) setAmountInput("" + max)
          else setAmountInput(value)
        }}
      />
      <button
        className="add-trade-back-button"
        onClick={() => setShowPage("1")}
      >
        DONE
      </button>
    </div>
  );
}

export default Small3rdPage;
