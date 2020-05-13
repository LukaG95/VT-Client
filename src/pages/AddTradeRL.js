import React, {useState, useEffect, useContext} from 'react'
import RLitem_icon from '../components/RLitem_icon'
import RLfilter_icon from '../components/RLfilter_icon'
import Spinner from '../components/Spinner'
import {RLitem_names, test_names} from '../info/RLitem_names'
import rl_items_all from '../info/virItemsFilteredAll.json' 
import {TradeContext, TradeContextProvider} from '../components/TradeContextProvider'
import axios from 'axios'

function AddTradeRL() {
  const [itemImages, setItemImages] = useState()

  const {have, want, platform, notes, manageFocus, pushItem, clearWantItems, clearHaveItems} = useContext(TradeContext)

  useEffect(() => {
    const names = rl_items_all.map(item => {
      if (item.url.includes("3.0.webp")){
        return (
          <img 
            name={item.url} 
            style={{height: "95px", width: "95px"}} 
            src={require(`../images/RLimages/${item.url}`)} 
            alt="" 
            onClick={e => pushItem(e)} 
          />
        )
      }
    })
    setItemImages(names)
  }, [])


  
  function handleTradeSubmit(){
    let haveRefactor = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    let wantRefactor = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

    have.map((item, i) => {
      haveRefactor[i].itemID = item.url === "" ? 0 : parseInt(item.url.substr(0, item.url.indexOf('.')))     // reads url until dot (gets only the ID)
      haveRefactor[i].paint = item.color
      haveRefactor[i].cert = item.cert
      haveRefactor[i].itemType = "item"  // needs work
      haveRefactor[i].amount = item.amount
    })
    
    want.map((item, i) => {
      wantRefactor[i].itemID = item.url === "" ? 0 : parseInt(item.url.substr(0, item.url.indexOf('.')))    
      wantRefactor[i].paint = item.color
      wantRefactor[i].cert = item.cert
      wantRefactor[i].itemType = "item"  // needs work
      wantRefactor[i].amount = item.amount
    })

    axios.post('/trades/createTrade', {
      have: haveRefactor,
      want: wantRefactor, 
      platform: platform,
      notes: notes
    })
    .then(res => {
      console.log(res.data.status)
    })
    .catch(err => console.log(err))
  }
  


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
          <RLfilter_icon itemImages={itemImages} setItemImages={setItemImages} />
        </div>
        <div className="item-imagesRL">
          {itemImages === undefined ? <Spinner /> : itemImages}
        </div>
      </div>


      <div className="rlSubmitNotes">
        <button onClick={()=> handleTradeSubmit()} className="rlSubmitButton">SUBMIT TRADE</button>        {/*submit trade - server reques*/} 
        <div className="rlNotesButton">NOTES</div>
      </div>

    </div>
  )
}

export default AddTradeRL;
