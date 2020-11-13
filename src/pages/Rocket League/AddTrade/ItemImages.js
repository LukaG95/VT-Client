import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LazyLoad from "react-lazyload";

import { createNotification } from "../../../App";
import AddedIconRL from "../../../components/Rocket League/AddedIconRL";
import AddTradeFiltersRL from "../../../components/Rocket League/AddTradeFiltersRL";
import { TradeContextRL } from "../../../context/TradeContextRL";
import { UserContext } from "../../../context/UserContext";
import infoRL from "../../../info/infoRL.json";
import imageExists from "../../../misc/func";
import Placeholder from "./Placeholder";

import RLicon from "./ItemImage";
import useWindowDimensions from "../../../misc/windowHW";

function ItemImages() {
  const [selectedItems, setSelectedItems] = useState([]);

  return infoRL.Slots.map((Slot) =>
    Slot.Items.map((item) => {
      if (item.Tradable)
        return (
          <LazyLoad
            scrollContainer={".item-imagesRL-SMALL"}
            placeholder={<Placeholder item={item} />}
          >
            <div
              className="RLicon noUserInteraction"
              style={{ minHeight: `130px` }}
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
  );
}

export default ItemImages;
