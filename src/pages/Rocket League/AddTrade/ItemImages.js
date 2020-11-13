import React, { useState } from "react";
import LazyLoad from "react-lazyload";

import infoRL from "../../../info/infoRL.json";
import Placeholder from "./Placeholder";
import RLicon from "./ItemImage";

function ItemImages() {
  const [selectedItems, setSelectedItems] = useState([]);

  return infoRL.Slots.map((Slot) =>
    Slot.Items.forEach((item) => {
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
