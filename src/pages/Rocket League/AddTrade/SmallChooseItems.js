import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Img from "react-cool-img";
import LazyLoad from "react-lazyload";

import { createNotification } from "../../../App";
import AddedIconRL from "../../../components/Rocket League/AddedIconRL";
import AddTradeFiltersRL from "../../../components/Rocket League/AddTradeFiltersRL";
import { TradeContextRL } from "../../../context/TradeContextRL";
import { UserContext } from "../../../context/UserContext";
import infoRL from "../../../info/infoRL.json";
import imageExists from "../../../misc/func";
import Placeholder from "./Placeholder";
import ItemImages from "./ItemImages";

import RLicon from "./RLicon";
import useWindowDimensions from "../../../misc/windowHW";

function SmallChooseItems({ setShowPage, displayPage }) {
  const [itemImages, setItemImages] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  const { have, want, clearHaveItems, clearWantItems } = useContext(
    TradeContextRL
  );

  const { width } = useWindowDimensions();

  useEffect(() => {
    const customHeight = calculateHeight();

    setTimeout(() => {
      setItemImages(
        infoRL.Slots.map((Slot) =>
          Slot.Items.map((item) => {
            if (item.Tradable)
              return (
                <LazyLoad
                  scrollContainer={".item-imagesRL-SMALL"}
                  placeholder={<Placeholder item={item} />}
                >
                  <div
                    className="RLicon noUserInteraction"
                    style={{ minHeight: `${customHeight}px` }}
                  >
                    <RLicon
                      item={item}
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                    />
                    <div className="RLicon-name">{item.Name}</div>
                  </div>
                </LazyLoad>
              );
          })
        )
      );
    });
  }, [width]);

  return (
    <div id="add-trade-2nd-page">
      <div className="rlChooseItemsSection-SMALL">
        <AddTradeFiltersRL
          itemImages={itemImages}
          setItemImages={setItemImages}
        />

        <div className="item-imagesRL-SMALL">
          {itemImages ? (
            itemImages
          ) : (
            <p
              style={{
                color: "#f6f6f6",
                fontWeight: "800",
                margin: "10px 0px 0px 10px",
              }}
            >
              loading...
            </p>
          )}
        </div>
      </div>

      {showSelectedAmount()}

      <button
        className="add-trade-back-button"
        onClick={() => setShowPage("1")}
      >
        BACK
      </button>
    </div>
  );

  function showSelectedAmount() {
    let have_count = 0;
    let want_count = 0;
    let focused_field = "";

    have.map((item) => {
      if (item.isAdded) have_count++;
      if (item.isFocused) focused_field = "have";
    });

    want.map((item) => {
      if (item.isAdded) want_count++;
      if (item.isFocused) focused_field = "want";
    });

    if (have_count > 0 || want_count > 0)
      return (
        <div className="added-items-notice-phone">
          <div
            className="have-count-notice"
            style={focused_field !== "have" ? { opacity: "0.65" } : null}
          >
            <pre>Have: {have_count}/12</pre>
            <img
              src={require(`../../../images/other/trash.png`)}
              style={{ height: "20px", width: "20px", cursor: "pointer" }}
              onClick={() => clearHaveItems()}
            />
            <span></span>
          </div>

          <div
            className="want-count-notice"
            style={focused_field !== "want" ? { opacity: "0.65" } : null}
          >
            <pre>Want: {want_count}/12</pre>
            <img
              src={require(`../../../images/other/trash.png`)}
              style={{ height: "20px", width: "20px", cursor: "pointer" }}
              onClick={() => clearWantItems()}
            />
            <span></span>
          </div>
        </div>
      );
    else return null;
  }

  function calculateHeight() {
    if (width <= 1213 && width >= 1101) return 105.2 - (1213 - width) * 0.1;
    else if (width <= 1100 && width >= 991)
      return 104.67 - (1100 - width) * 0.11;
    else if (width <= 990 && width >= 881)
      return 104.38 - (990 - width) * 0.125;
    else if (width <= 880 && width >= 771) return 104 - (880 - width) * 0.135;
    else if (width <= 770 && width >= 651)
      return 103.5 - (770 - width) * 0.1665;
    else if (width <= 650 && width >= 611) return 93.5 - (650 - width) * 0.17;
    else if (width <= 610 && width >= 501) return 104.8 - (610 - width) * 0.2;
    else if (width <= 500) return 140 - (500 - width) * 0.333;
  }
}

export default SmallChooseItems;

/*

import React, {useState, useEffect, useContext} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'

import {createNotification} from '../../../App'
import AddedIconRL from '../../../components/Rocket League/AddedIconRL'
import AddTradeFiltersRL from '../../../components/Rocket League/AddTradeFiltersRL'
import {TradeContextRL} from '../../../context/TradeContextRL'
import {UserContext} from '../../../context/UserContext'
import infoRL from '../../../info/infoRL.json' 
import imageExists from '../../../misc/func'
import Placeholder from './Placeholder'
import Img from "react-cool-img"
import LazyLoad from 'react-lazyload'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import RLicon from './RLicon'

function SmallChooseItems({setShowPage, displayPage}) {
  const [itemImages, setItemImages] = useState()
  const [selectedItems, setSelectedItems] = useState([])

  const {pushItem} = useContext(TradeContextRL)

  useEffect(()=> {

    setItemImages(
      infoRL.Slots.map(Slot => Slot.Items.map(item => {
        if(item.Tradable) return(
          <div className="RLicon noUserInteraction">
            <RLicon item={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
            <div className="RLicon-name">{item.Name}</div>
          </div>
        )
      }))
    )

  }, [selectedItems])

    return (
      <div id="add-trade-2nd-page" style={displayPage ? {display: "flex"} : {display: "none"}}>
      
        <div className="rlChooseItemsSection-SMALL">

          <AddTradeFiltersRL itemImages={itemImages} setItemImages={setItemImages} />

          <div className="item-imagesRL-SMALL">
            
             {itemImages}
            
          </div>

        </div>

        {
          selectedItems.length > 0 && 
            <div className="added-items-notice-phone">
              <pre>Added items:   {selectedItems.length}/12</pre>
              <img src={require(`../../../images/other/trash.png`)} style={{height: "20px", width: "20px", cursor: "pointer"}} onClick={()=> setSelectedItems([])}/>
            </div>
        }

        <button className="add-trade-back-button" onClick={()=> setShowPage("1")}>BACK</button>
        
      </div>
    )

}

export default SmallChooseItems
*/
