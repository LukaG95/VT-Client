import React, { useState } from "react";
import Small1stPage from "./Small1stPage";
import SmallChooseItems from "./SmallChooseItems";
import Small3rdPage from "./Small3rdPage";

function SmallHome({ handleTradeSubmit }) {
  const [showPage, setShowPage] = useState("1");
  const [clickedItem, setClickedItem] = useState({
    type: "have",
    index: 0
  }); // the item that we click on when we go to the 3rd page
  const [slot, setSlot] = useState("have");
  return (
    <div className="add-trade-wrapper-SMALL">
      {showPage === "1" ? (
        <Small1stPage
          {...{ setShowPage, setClickedItem, handleTradeSubmit, slot, setSlot }}
        />
      ) : showPage === "2" ? (
        <SmallChooseItems {...{setShowPage, slot, setSlot}} />
      ) : showPage === "3" ? (
        <Small3rdPage setShowPage={setShowPage} clickedItem={clickedItem} />
      ) : null}
    </div>
  );
}

export default SmallHome;
