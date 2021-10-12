import React, { useState, useEffect } from "react";
import { actions, useTrade } from "../../../context/TradeContext";
import Dropdown from "../../../components/Dropdown";
import { rl_dd_names } from "../../../misc/DropdownNames";
import Item from "../../../components/Categories/Rocket League/Item";
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
        <div style={{height: "95px", width: "95px"}}> {/* because "Item" doesn't have any set measurements */}
          {[<Item item={item} hideName />]}
        </div>
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

      {item.category === "Rocket League" && 
      <>
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
          name="Certification"
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
      </>
      }
      
     {item.category !== "Design" && 
     <div className="add-trade-3rd-page-input-fields rl-icon-amount-filter-field">
     <label className="enableDropdown">
       Amount - max {item.category === "Money" ? "100,000$" : item.itemID === 4743 ? "100,000" : "100"}
     </label>
     <input
       name="amount-dropdown"
       className="rl-icon-dropdown-button-section"
       style={{ justifyContent: "space-between" }}
       value={amountInput}
       onChange={(e) => {
         const value = item.category === "Money" ? e.target.value.replace(/[^\d.]/g, "") : e.target.value.replace(/[^\d]/g, "") // allow a dot and numbers if cash, or just numbers if not
         if (value !== "") // so we can also leave empty space
           if (!value.match(/^\d*\.?\d{0,2}?$/)) return // check only 2 decimal points

         const max = item.itemID === 4743 || item.category === "Money" ? 100000 : 100; // if item is credits or cash
         if (Number(value) > max) setAmountInput("" + max);
         else setAmountInput(value);
       }} 
     />
   </div>
     }
      

      <button
        className="add-trade-done-button"
        style={item.category === "Design" ? {marginTop: "0px"} : {marginTop: "15px"}}
        onClick={() => setShowPage("1")}
      >
        DONE
      </button>
    </div>
  );
}

export default Small3rdPage;
