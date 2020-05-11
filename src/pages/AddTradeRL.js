import React, {useState, useEffect, useContext} from 'react'
import RLitem_icon from '../components/RLitem_icon'
import RLfilter_icon from '../components/RLfilter_icon'
import Spinner from '../components/Spinner'
import {RLitem_names, test_names} from '../info/RLitem_names'
import {TradeContext, TradeContextProvider} from '../components/TradeContextProvider'

function AddTradeRL() {
  const [itemImages, setItemImages] = useState()

  const {have, want, manageFocus, pushItem, clearWantItems, clearHaveItems} = useContext(TradeContext)

  useEffect(() => {
    const names = test_names.map(name=> 
      <img 
      name={name} 
      style={{height: "95px", width: "95px"}} 
      src={require(`../images/RLimages/${name}`)} 
      alt="" 
      onClick={e => pushItem(e)} 
      />
    )
    setItemImages(names)
  }, [])


  const displayed_have_items = have.map(item => {
    if (item.url === ""){
      if (item.isFocused === false) return <button name={item.id} onClick={manageFocus}></button>
      else return <button name={item.id} onClick={manageFocus} id="focusedButton">+</button>
    } 
    else return <RLitem_icon id={item.id} url={item.url} />
  })

  const displayed_want_items = want.map(item => {
    if (item.url === ""){
      if (item.isFocused === false) return <button name={item.id} onClick={manageFocus}></button>
      else return <button name={item.id} onClick={manageFocus} id="focusedButton">+</button>
    } 
    else return <RLitem_icon id={item.id} url={item.url} />
  })

  return (
    <div className="addRLWrapper">
      
      <div className="newTradeTitle">
        Create new trade
      </div>

      <div className="rlHaveWantSection">

        <div className="h-wTopPlace">
          <div className="left-gameName">Rocket League PC</div>
          <div className="right-gamePlatform"><img style={{height: "15px", width: "18px", marginRight: "10px"}} src={require("../images/other/Steam icon.png")} alt="" />Steam</div>
        </div>

        <div className="allAddedItems">

          <div className="hwLeftSection">
            <div className="hTitle">
              <p>You <b>have</b></p>
              <button onClick={clearHaveItems}>CLEAR ITEMS</button>
            </div>

            <div className="haveItems">
              {displayed_have_items}
            </div>
          </div>

          <div className="hwRightSection">
            <div className="wTitle">
              <p>You <b>want</b></p>
              <button onClick={clearWantItems}>CLEAR ITEMS</button>
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
