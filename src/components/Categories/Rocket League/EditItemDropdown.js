import React, { useState, useEffect, useRef } from "react";
import { actions, useTrade } from "../../../context/TradeContext";
import styles from "./EditItemDropdown.module.scss";
import useWindowDimensions from "../../../misc/windowHW";
import Dropdown from "../../Dropdown";
import { rl_dd_names } from "../../../misc/DropdownNames";
import rl_info from "../../../constants/Categories/RLinfo.json"

import { ReactComponent as EditIcon } from "../../../images/icons/edit.svg";

const { colorEditDD, certEditDD } = rl_dd_names;

function EditItemDropdown({ item, index, type }) {
  const [visible, setVisible] = useState(false);
  const { height } = useWindowDimensions();
  const [_context, dispatch] = useTrade();
  const [amountInput, setAmountInput] = useState();
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
    
    /* previously (with bug when clicking on the same item)
        if (!ref.current || (!ref.current.contains(e.target) && e.target.dataset.type !== "dropdown-item")) setVisible(false);
        if (ref.current && ref.current.parentElement.contains(e.target)) setVisible(true)
    */
   
    if (ref.current && ref.current.parentElement.contains(e.target)) setVisible(true)
    else if (e.target.dataset.type !== "dropdown-item") setVisible(false);

  }

  function editDropdownStyle(){
    let style = {marginLeft: "-1px"}
    
    if (height <= 820){
      style.top = "400px"
      style.right = "397px"
      style.marginTop = "-200px"
      style.marginLeft = "200px"
    }

    // this is stupid and needs a better responsive design solution
    else if (type === "want"){
      if (item.category === "Rocket League") style.marginTop = "-407px"
      else if (item.category === "Design") style.marginTop = "-231px"
      else if (item.category === "Money") style.marginTop = "-290px"
    }
    
    return style
  }
  useEffect(() => {
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div ref={ref} >
      <EditIcon className="editIcon" style={item.amount <= (item.category === "Money" ? 0 : 1) ? { top: "6px" } : null}/>
      {visible && (
        <div
          className="rl-icon-dropdown" // style is small height positioning
          style={editDropdownStyle()}
        >
          <div className="item_name">{item.itemName}</div>
          {item.category === "Rocket League" && 
            <>
              <Dropdown
              name="Color"
              items={item.paintable ? colorEditDD : ["None"]}
              className={styles.dropdowns}
              onChange={(color) =>
                dispatch({
                  type: actions.UPDATE_ITEM,
                  payload: {
                    type,
                    index,
                    item: {
                      color,
                      colorID: rl_info.Colors.find(c => c.Name === color).ID || 0,
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
              items={certEditDD}
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
          </>
          }
          
          <div className="rl-icon-dropdown-button-section">
            {item.category !== "Design" && 
              <>
                <label className="enableDropdown">
                  Amount - max {item.category === "Money" ? "100,000$" : item.itemID === 4743 ? "100,000" : "100"}
                </label>
                <input
                  name="enableDropdown"
                  style={{ justifyContent: "space-between" }}
                  value={amountInput}
                  placeholder={1}
                  onChange={(e) => {
                    const value = item.category === "Money" ? e.target.value.replace(/[^\d.]/g, "") : e.target.value.replace(/[^\d]/g, "") // allow a dot and numbers if cash, or just numbers if not
                    if (value !== "") // so we can also leave empty space
                      if (!value.match(/^\d*\.?\d{0,2}?$/)) return // check only 2 decimal points

                    const max = item.itemID === 4743 || item.category === "Money" ? 100000 : 100; // if item is credits or cash
                    if (Number(value) > max) setAmountInput("" + max);
                    else setAmountInput(value);
                  }} 
                />
              </>
            }
            
          </div>
          <button
            id="submit-rl-filters-button"
            onClick={() => {if (Number(amountInput) <= 0) setAmountInput(1); setVisible(false)}}
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

  function multipleCommas(value){
    let multipleCommas = 0

    console.log(value)
    
    for (var i = 0; i < value.length; i++) {
      if (value[i] === ",") 
        multipleCommas++
    }
    
    if (multipleCommas > 1) 
      return true 
    else
      return false
  }
}

export default EditItemDropdown;
