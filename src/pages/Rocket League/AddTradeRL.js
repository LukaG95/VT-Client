import React, {useState, useEffect, useContext} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import Filter from 'bad-words'
import Spinner from '../../components/Spinner'

import {createNotification} from '../../App'
import AddedIconRL from '../../components/Rocket League/AddedIconRL'
import AddTradeFiltersRL from '../../components/Rocket League/AddTradeFiltersRL'
import {TradeContext} from '../../components/Rocket League/TradeContextRL'
import {UserContext} from '../../UserContext'
import infoRL from '../../info/infoRL.json' 
import imageExists from '../../misc/func'

const profanityFilter = new Filter({ regex: /^\*|\.|$/gi })

function AddTradeRL() {
  const [tradesAmount, setTradesAmount] = useState()
  const [itemImages, setItemImages] = useState()
  const [tradeIdMatch, setTradeIdMatch] = useState(false)
  const [tradeErrorMsg, setTradeErrorMsg] = useState("")
  const [notesErrorMsg, setNotesErrorMsg] = useState("")

  const {myID} = useContext(UserContext)
  const {have, want, platform, setPlatform, notes, setNotes, manageFocus, pushItem, clearWantItems, clearHaveItems, gotInfo} = useContext(TradeContext)

  const pathID = useLocation().pathname.substring(17)   // reads url after /trades/ till the end
  
  // maybe this and want items should be state
  const displayed_have_items = have.map(item => {
    if (item.url === ""){
      if (item.isFocused === false) return <button name={item.id} onClick={manageFocus}></button>
      else return <button name={item.id} onClick={manageFocus} id={`${item.isFocused ? "focusedButton" : null}`}>+</button>
    } 
    else return <AddedIconRL id={item.id} url={item.url} itemID={item.itemID}/>
  })

  const displayed_want_items = want.map(item => {
    if (item.url === ""){
      if (item.isFocused === false) return <button name={item.id} onClick={manageFocus}></button>
      else return <button name={item.id} onClick={manageFocus} id="focusedButton">+</button>
    } 
    else return <AddedIconRL id={item.id} url={item.url} itemID={item.itemID}/>
  })

  // checks if we're editing a trade, gets the userID and maps over his trades to find if it matches any, if not it redirects to home page
  useEffect(() => {
    if (myID){
      let x = false
      axios.get(`/api/trades/getTrades?userId=${myID}`)
      .then (res => { 
        setTradesAmount(res.data.trades.length)
        res.data.trades.map(trade => {
          if (trade._id === pathID){
            setTradeIdMatch(true)
            x = true
          }
        })
        if (pathID !== "" && x === false) window.location.href = "/trading/rl"
        
      })
      .catch(err => console.log("Error: " + err))
    }else if (pathID === "") setTradeIdMatch(true)

  }, [myID])

  // create initial images for selection
  useEffect(() => {
    
    setTimeout(()=> {
      let thumbnails = []
      infoRL.Slots.map(Slot => Slot.Items.map(item => {
        item.Tradable && thumbnails.push(
          <div className="RLicon noUserInteraction">
            <img 
              width="95"
              height="95"
              src={imageExists(`${item.ItemID}.0.webp`)}
              onClick={() => {setTradeErrorMsg(""); pushItem(item)}} 
            />
            <span className="RLicon-name-hover"><p>{item.Name}</p></span>
          </div>
        )
      }))
      setItemImages(thumbnails)
    }, 750)

  }, [gotInfo])


  if (pathID === "" || tradeIdMatch)
    return (
      <div className="addRLWrapper">
        
        <div className="newTradeTitle">
          Create new trade
        </div>

        <div className="rlHaveWantSection">

          <div className="h-wTopPlace">
            <div className="left-gameName">Rocket League</div>
            <div className="right-gamePlatform">
              <img 
                style={{height: "17px", width: "17px", marginRight: "10px"}} 
                src={require(`../../images/other/${platform === "PC" ? "Steam" : platform} icon.png`)} 
              />
              {platform === "PC" ? "Steam" : platform}
            </div>
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

        <div className="rlChooseItemsSection" style={tradeErrorMsg !== "" ? {border: "2px solid #ff4645"} : null}>
          <div className="choose-itemsSearchFiltersRL">
            <div><img style={{width: "11px", height: "11px", marginLeft: "2px"}} src={require("../../images/other/MagnGlass.png")} /></div>
            <AddTradeFiltersRL itemImages={itemImages} setItemImages={setItemImages} setTradeErrorMsg={setTradeErrorMsg}/>
          </div>
          <div className="item-imagesRL">
            {itemImages === undefined ? <Spinner /> : itemImages}
          </div>
          <p className="addRLTradeErrorMsg">{tradeErrorMsg}</p>
        </div>

        <div className="notesSection" style={notesErrorMsg !== "" ? {border: "2px solid #ff4645"} : null} onClick={()=> setNotesErrorMsg("")}>
          <textarea placeholder="Add notes..." className="notesArea" defaultValue={notes} onChange={e => setNotes(e.target.value)}></textarea>
          <div className="platformSection">
            <h4>PLATFORM:</h4>
            <label className="noUserInteraction platf-button-container">
              <input type="radio" checked={platform==="Steam"} onChange={()=> setPlatform("Steam")} />
              <p style={platform === "Steam" ? {color: "#2C8E54"} : null}>STEAM</p>
            </label>
            <label className="noUserInteraction platf-button-container">
              <input type="radio" checked={platform==="PS4"} onChange={()=> setPlatform("PS4")}/>
              <p style={platform === "PS4" ? {color: "#2C8E54"} : null}>PS4</p>
            </label>
            <label className="noUserInteraction platf-button-container">
              <input type="radio" checked={platform==="XBOX"} onChange={()=> setPlatform("XBOX")}/>
              <p style={platform === "XBOX" ? {color: "#2C8E54"} : null}>XBOX</p>
            </label>
            <label className="noUserInteraction platf-button-container">
              <input type="radio" checked={platform==="SWITCH"} onChange={()=> setPlatform("SWITCH")}/>
              <p style={platform === "SWITCH" ? {color: "#2C8E54"} : null}>SWITCH</p>
            </label>
          </div>
          <p className="addNotesErrorMsg">{notesErrorMsg}</p>
        </div>

        <div className="rlSubmit">
          <button onClick={()=> handleTradeSubmit()} className="rlSubmitButton">SUBMIT TRADE</button>   
        </div>

      </div>
    )
  else return null


  /*-----Functions                -------------*/

  function checkAddedItems(){
    let x = false, y = false;
    have.forEach(item=> {
      if (item.url !== ""){
        x = true
        return
      }
    })
    want.forEach(item=> {
      if (item.url !== ""){
        y = true
        return
      }
    })
    return (x && y)
  }

  function checkNotes(){
    return (notes.match(/\b(?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+(?:[\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/.*)?\b/gm))
  }

  function handleTradeSubmit(){
    if (have && want && tradesAmount){
      if (!checkAddedItems()){
        setTradeErrorMsg("You have to select at least 1 item in have and want")
        tradeErrorMsg === "" && createNotification("error", "Choose items")
        return
      }
      else if (checkNotes()){
        setNotesErrorMsg("Your notes must not include links")
        notesErrorMsg === "" && createNotification("error", "No links")
        return
      }
      else {
        let haveRefactor = []
        let wantRefactor = []

        have.map((item) => {
          if (item.url !== ""){
            let readyItem = {
              itemID : item.url === "" ? 0 : parseInt(item.url.substr(0, item.url.indexOf('.'))),     // reads url until dot (gets only the ID)
              paint : item.color,
              cert : item.cert,
              itemType : "item",  // needs work
              amount : item.amount,
              url : item.url
            }
            haveRefactor.push(readyItem)
          } 
        })
        
        want.map((item) => {
          if (item.url !== ""){
            let readyItem = {
              itemID : item.url === "" ? 0 : parseInt(item.url.substr(0, item.url.indexOf('.'))),     // reads url until dot (gets only the ID)
              paint : item.color,
              cert : item.cert,
              itemType : "item",  // needs work
              amount : item.amount,
              url : item.url
            }
            wantRefactor.push(readyItem);
          }
        })

        let temp=[] 
        have.map(item => {
          item.isDropdown = false
          temp.push(item)
        })
        const oldHave = temp

        temp=[] 

        want.map(item => {
          item.isDropdown = false
          temp.push(item)
        })
        const oldWant = temp

        const refactorPlatform = platform === "Steam" ? "PC" : platform

        if (tradesAmount >= 15){
          createNotification("error", "You can only create 15 RL trades")
        }

        if (pathID === ""){
          axios.post('/api/trades/createTrade', {
            have: haveRefactor,
            want: wantRefactor, 
            platform: refactorPlatform,
            notes: profanityFilter.clean(notes),
            old: {have: oldHave, want: oldWant}
          })
          .then(res => {
            if (res.data.status === "success"){
              clearWantItems()
              clearHaveItems()
              createNotification("success", "Created a new trade")
              setTimeout(()=>createNotification("info", `${tradesAmount + 1} / 15 RL trades created`), 1000)
              setTradesAmount(prev => prev+1)  
            }          
          })
          .catch(err => console.log(err))
        }else{
          axios.post(`/api/trades/createTrade?edit=${pathID}`, {
            have: haveRefactor,
            want: wantRefactor, 
            platform: refactorPlatform,
            notes: profanityFilter.clean(notes),
            old: {have: oldHave, want: oldWant}
          })
          .then(res => {
            if (res.data.status === "success"){
              clearWantItems()
              clearHaveItems()
              createNotification("success", "You have edited your trade")
            }
          })
          .catch(err => console.log(err))
        }
      }
    }
  }
}

export default AddTradeRL
