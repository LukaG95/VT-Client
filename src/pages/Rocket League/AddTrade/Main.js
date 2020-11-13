import React, {useState, useEffect, useContext} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import Filter from 'bad-words'

import {createNotification} from '../../../App'
import AddedIconRL from '../../../components/Rocket League/AddedIconRL'
import AddTradeFiltersRL from '../../../components/Rocket League/AddTradeFiltersRL'
import {TradeContextRL} from '../../../context/TradeContextRL'
import {UserContext} from '../../../context/UserContext'
import infoRL from '../../../info/infoRL.json' 
import imageExists from '../../../misc/func'
import SmallHome from './SmallHome'
import useWindowDimensions from '../../../misc/windowHW'

const profanityFilter = new Filter({ regex: /^\*|\.|$/gi })

function AddTradeRL() {
  const [itemImages, setItemImages] = useState()
  const [tradeErrorMsg, setTradeErrorMsg] = useState("")
  const [notesErrorMsg, setNotesErrorMsg] = useState("")

  const {myID} = useContext(UserContext)
  const {have, want, platform, setPlatform, notes, setNotes, manageFocus, pushItem, clearWantItems, clearHaveItems, gotInfo, displayPage, tradesAmount, setTradesAmount} = useContext(TradeContextRL)

  const pathID = useLocation().pathname.substring(17)   // reads url after /trades/ till the end

  const { height, width } = useWindowDimensions()
  
  const displayed_have_items = have.map(item => {
    if (item.isAdded === false){
      if (item.isFocused === false) return <button name={item.id} onClick={manageFocus}></button>
      else return <button name={item.id} onClick={manageFocus} id="focusedButton">+</button>
    } 
    else return <AddedIconRL item={item}/>
  })

  const displayed_want_items = want.map(item => {
    if (item.isAdded === false){
      if (item.isFocused === false) return <button name={item.id} onClick={manageFocus}></button>
      else return <button name={item.id} onClick={manageFocus} id="focusedButton">+</button>
    } 
    else return <AddedIconRL item={item}/>
  })

  // initial images for selection
  useEffect(() => {
    
      let thumbnails = []
      infoRL.Slots.map(Slot => Slot.Items.map(item => {
        item.Tradable && thumbnails.push( 
          <div className="RLicon noUserInteraction">
            <img
              loading="lazy"
              style={{height: "auto", minHeight: "95px", width: "100%", maxWidth: "105px", cursor: "pointer", borderRadius: "5px 5px 0px 0px"}} 
              src={imageExists(`${item.ItemID}.0.webp`)}
              onClick={() => {setTradeErrorMsg(""); pushItem(item)}} 
            />
            <div onClick={() => {setTradeErrorMsg(""); pushItem(item)}} className="RLicon-name">{item.Name}</div>
          </div>
        )
      }))
      setItemImages(thumbnails)
    
  }, [gotInfo])

  
  return (  
    <>
      {
        width > 1213 ? 
          AddTrade()
        :
          <SmallHome />
      } 
    </>
  )


  /*-----Functions                -------------*/


  function AddTrade(){
    return(
      <div className="add-trade-wrapper">

        <div style={{position: "absolute", top: "5px", color: "white"}}>{width}</div>
        <div style={{position: "absolute", top: "25px", color: "white"}}>{height}</div>

        <div className="rlChooseItemsSection" style={tradeErrorMsg !== "" ? {border: "1px solid #ff4645"} : null}>

          <AddTradeFiltersRL itemImages={itemImages} setItemImages={setItemImages} setTradeErrorMsg={setTradeErrorMsg}/>

          <div className="item-imagesRL">
            {!itemImages ? <div style={{color: "#f6f6f6"}}>Loading...</div> : itemImages}
          </div>

          <p className="addRLTradeErrorMsg">{tradeErrorMsg}</p>

        </div>

        <div className="rlHaveWantSection">

          <div className="hwTopSection">
            
            <div className="hTitle">
              <p>You <b>have</b></p>
              <div onClick={clearHaveItems} className="rl-resetFilters-button noUserInteraction" style={{margin: '0px'}}>
                <img src={require(`../../../images/other/trash.png`)} style={{height: "14px", width: "14px"}}/>
              </div>
            </div>

            <div className="haveItems">
              {displayed_have_items}
            </div>

        </div>

          <div className="hwBottomSection" style={{marginBottom: "20px"}}>

            <div className="wTitle">
              <p>You <b>want</b></p>
              <div onClick={clearWantItems} className="rl-resetFilters-button noUserInteraction" style={{margin: '0px'}}>
                  <img src={require(`../../../images/other/trash.png`)} style={{height: "14px", width: "14px"}}/>
                </div>
            </div> 

            <div className="wantItems">
              {displayed_want_items}
            </div>

          </div>

        </div>

        <div className="notes-and-submit-button">

          <div className="notesSection" style={notesErrorMsg !== "" ? {border: "1px solid #ff4645"} : null} onClick={()=> setNotesErrorMsg("")}>
            <textarea placeholder="Add notes..." className="notesArea" value={notes} onChange={e => setNotes(e.target.value)}></textarea>
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

      </div>
      
    )
  }

  function handleTradeSubmit(){
    if (have && want){

      if (!checkAddedItems()){
        setTradeErrorMsg("You have to select at least 1 item in have and want")
        createNotification("error", "Choose items", "choose the items")
        return
      }
      else if (checkNotes()){
        setNotesErrorMsg(checkNotes())
        createNotification("error", checkNotes(), checkNotes())
        return
      } 
      else {
        let haveRefactor = []
        let wantRefactor = []
        
        have.map(item => {
          if (item.isAdded){
            let readyItem = {
              itemID: item.itemID,
              itemName: item.itemName,
              color: item.color,
              colorID: item.colorID,
              cert: item.cert,
              itemType: "item",  // needs work
              amount: item.amount
            }
            haveRefactor.push(readyItem)
          } 
        })
        
        want.map(item => {
          if (item.isAdded){
            let readyItem = {
              itemID: item.itemID,
              itemName: item.itemName,
              color: item.color,
              colorID: item.colorID,
              cert: item.cert,
              itemType: "item",  // needs work
              amount: item.amount
            }
            wantRefactor.push(readyItem)
          }
        })

        if (pathID === ""){
          if (tradesAmount >= 15){
            createNotification("error", "You reached the limit of 15 trades", "limit 15 trades")
            return
          }
          axios.post('/api/trades/createTrade', {
            have: haveRefactor,
            want: wantRefactor, 
            platform: platform,
            notes: profanityFilter.clean(notes)
          })
          .then(res => {
            if (res.data.info === "success"){
              clearWantItems()
              clearHaveItems()
              setNotes("")
              createNotification("success", "Created a new trade", "created a new trade")
              setTimeout(()=>createNotification("info", `${tradesAmount + 1} / 15 RL trades created`, "info on trades created"), 1000)
              setTradesAmount(prev => prev + 1)  
            }          
          })
          .catch(err => {
            if (err.response)
              createNotification("error", "Oops, something went wrong", "something went wrong") 
            console.log(err.response)
            console.log(have)
          }) 
        }
        else {
          axios.post(`/api/trades/editTrade?tradeId=${pathID}`, {
            have: haveRefactor,
            want: wantRefactor, 
            platform: platform,
            notes: profanityFilter.clean(notes)
          })
          .then(res => {
            if (res.data.info === "success"){
              createNotification("success", "You have edited your trade", "you have edited the trade")
            }
          })
          .catch(err => {
            if (err.response)
              createNotification("error", "Oops, something went wrong", "something went wrong") 
          })  
        }
      }
    }
  }

  // returns true if there are items added in have and in want
  function checkAddedItems(){
    let x = false, y = false;
    have.forEach(item=> {
      if (item.isAdded === true){
        x = true
        return
      }
    })
    want.forEach(item=> {
      if (item.isAdded === true){
        y = true
        return
      }
    })
    return (x && y)
  }

  // check notes for limits / errors
  function checkNotes(){
    if (notes.match(/\b(?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+(?:[\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/.*)?\b/gm))
      return ("No links allowed in notes")
    else if (notes.length > 300)
      return ("Max 300 characters allowed")
  }

  
}

export default AddTradeRL
