import React, {useState, useEffect, useContext} from 'react'
import RLitem_icon from '../components/RLitem_icon'
import RLfilter_icon from '../components/RLfilter_icon'
import Spinner from '../components/Spinner'
import {RLitem_names, test_names} from '../info/RLitem_names'
import {TradeContext} from '../components/TradeContextProvider'


function AddTradeRL() {
  const [itemImages, setItemImages] = useState()

  const {have, setHave, want, setWant} = useContext(TradeContext)

  useEffect(() => {
    const names = test_names.map(name=> 
      <img style={{height: "95px", width: "95px"}} src={require(`../images/RLimages/${name}`)} alt="" />
    )

    setItemImages(names)
  }, [])

  const displayed_have_items = have.map(item => {
    if (item.url === ""){
      if (item.isFocused === false) return <button></button>
      else return <button id="focusedButton">&#43;</button>
    }
  })

  const displayed_want_items = want.map(item => {
    return <button></button>
  })

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

        <div className="allAddedItems">

          <div className="hwLeftSection">
            <div className="hTitle">
              <p>You <b>have</b></p>
              <button>CLEAR ITEMS</button>
            </div>

            <div className="haveItems">
              {displayed_have_items}
            </div>
          </div>

          <div className="hwRightSection">
            <div className="wTitle">
              <p>You <b>want</b></p>
              <button>CLEAR ITEMS</button>
            </div>

            <div className="wantItems">
              {displayed_want_items}
            </div>

          </div>

        </div>

      </div>


      <div className="rlChooseItemsSection">
        <div className="choose-itemsTopPlace">Choose the items</div>
        <div className="choose-itemsSearchFiltersRL">
          <div><img style={{width: "11px", height: "11px"}} src={require("../images/other/MagnGlass.png")} /></div>
          <input placeholder="Search items..."></input>
          <RLfilter_icon />
        </div>
        <div className="item-imagesRL">
          {itemImages === undefined ? <Spinner /> : itemImages}
        </div>
      </div>


      <div className="rlSubmitNotes">
        <div className="rlSubmitButton">SUBMIT TRADE</div>
        <div className="rlNotesButton">NOTES</div>
      </div>

    </div>
  )
}

export default AddTradeRL;
