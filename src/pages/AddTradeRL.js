import React, {useState} from 'react'

function AddTradeRL() {
  return (
    <div className="addRLWrapper">
      
      <div className="newTradeTitle">
        Create new trade
      </div>


      <div className="rlHaveWantSection">
        <div className="h-wTopPlace">
          <div className="left-gameName">Rocket League PC</div>
          <div className="right-gamePlatform">Steam</div>
        </div>
      </div>


      <div className="rlChooseItemsSection">
        <div className="choose-itemsTopPlace">Choose the items</div>
      </div>


      <div className="rlSubmitNotes">
        <div className="rlSubmitButton">SUBMIT TRADE</div>
        <div className="rlNotesButton">NOTES</div>
      </div>

    </div>
  )
}

export default AddTradeRL;
