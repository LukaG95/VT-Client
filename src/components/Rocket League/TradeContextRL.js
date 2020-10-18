import React, {useState, useEffect, useContext} from 'react'
import {useLocation} from 'react-router-dom'
import {UserContext} from '../../UserContext'
import axios from 'axios'

import infoRL from '../../info/infoRL.json' 

const TradeContextRL = React.createContext()

function TradeContextProviderRL({children}) {
  const pathID = useLocation().pathname.substring(17) 
  const {myID} = useContext(UserContext)
  
  const [gotInfo, setGotInfo] = useState(false)
  const [have, setHave] = useState([
    {id: 0, isFocused: true, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false}, 
    {id: 1, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false}, 
    {id: 2, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},  
    {id: 3, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},  
    {id: 4, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},  
    {id: 5, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},  
    {id: 6, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false}, 
    {id: 7, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false}, 
    {id: 8, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false}, 
    {id: 9, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false}, 
    {id: 10, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},   
    {id: 11, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false}
  ])

  const [want, setWant] = useState([
    {id: 12, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},  
    {id: 13, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},  
    {id: 14, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},  
    {id: 15, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},  
    {id: 16, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},  
    {id: 17, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},  
    {id: 18, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},  
    {id: 19, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},  
    {id: 20, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},  
    {id: 21, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false}, 
    {id: 22, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false},   
    {id: 23, isFocused: false, isDropdown: false, itemName: "", itemID: "None", color: "None", colorID: 0, cert: "None", amount: 1, isAdded: false}
  ])

  const [notes, setNotes] = useState("")
  const [platform, setPlatform] = useState("Steam")
  const [tradesAmount, setTradesAmount] = useState()

  const [displayPage, setDisplayPage] = useState(false)

  // adds event listener to trigger click() function that sets all DDs to false on click
  useEffect(()=>{
    window.addEventListener("click", click)
    return () => {window.removeEventListener("click", click)}
  }, [gotInfo])

  // if we're not editing a trade we just need trades amount, if we are we check if user is the creator of the trade in edit
  useEffect(() => {
    if (myID){

      if (pathID === ""){
        axios.get(`/api/trades/getUserTrades?searchId=${myID}`)
        .then (res => { 
          setTradesAmount(res.data.trades.length)
          setDisplayPage(true)
        })
        .catch(err => {
          console.log(err.response)
          if (err.response)
            if (err.response.data.info === "no trades"){
              setTradesAmount(0)
              setDisplayPage(true)
            }  
        })
      } 

      else {
        axios.get(`/api/trades/getTrade/${pathID}`)
        .then (res => { 
          if (res.data.idMatch){
            setTradeState(res)

            setGotInfo(true)
            setDisplayPage(true)
          }
          else window.location.href = '/trading/rl'
          
        })
        .catch(err => console.log("Error: " + err))
      }
      
    }
  }, [myID])
 

  return (
    <TradeContextRL.Provider value={{have, setHave, want, setWant, platform, setPlatform, notes, setNotes, manageFocus, pushItem, clearHaveItems, clearWantItems, setIsDropdown, deleteRLitem, tradesAmount, setTradesAmount, gotInfo, displayPage}}>
      {children}
    </TradeContextRL.Provider>
  )
  

  /*-----Functions                -------------*/

  // sets all dropdowns to false on click
  function click(e){
    if (e.target.parentNode === null) return
    if(e.target.name !== "enableDropdown" && e.target.className !== "rl-icon-dropdown" && e.target.className !== "rl-attribute-dd-item" && e.target.parentNode.name !== "enableDropdown"
    && e.target.className !== "enableDropdown"){
      let temp=[] 
      have.map(item => {
        item.isDropdown = false
        temp.push(item)
      })
      setHave(temp)
    
      // console.log(e.target)

      temp=[] 
      want.map(item => {
        item.isDropdown = false
        temp.push(item)
      })
      setWant(temp)
    }
  }

  // clears all fields that have isFocused (where item is then pushed)
  function clearFocusedFields(){
    let temp = []

    have.map(item => {
      if (item.isFocused)
        item.isFocused = false
      temp.push(item)
    })

    setHave(temp)

    temp = []

    want.map(item => {
      if (item.isFocused)
        item.isFocused = false
      temp.push(item)
    })

    setWant(temp)
  }

  // removes target item from state
  function deleteRLitem(id){
    clearFocusedFields()

    let temp = []
    have.map(item => {
      if (item.id === id){
        // item.url = ""
        item.isAdded = false
        item.color = "None"
        item.cert = "None"
        item.isFocused = true
        temp.push(item)
      } else
      temp.push(item)
    })
    setHave(temp)

    temp = []

    want.map(item => {
      if (item.id === id){
        // item.url = ""
        item.isAdded = false
        item.color = "None"
        item.cert = "None"
        item.isFocused = true
        temp.push(item)
      } else
      temp.push(item)
    })
    setWant(temp)
  }

  // sets dropdown state to true on clicked item
  function setIsDropdown(id){
    let temp = []
      have.map(item => {
        if (item.id == id){
          item.isDropdown = !item.isDropdown
          temp.push(item)
        }
        else {
          item.isDropdown = false
          temp.push(item)
        }
      })
      setHave(temp)

      temp = []
      want.map(item => {
        if (item.id == id){
          item.isDropdown = !item.isDropdown
          temp.push(item)
        }
        else {
          item.isDropdown = false
          temp.push(item)
        }
      })
      setWant(temp)
  }

  // deletes all the focuses and focuses on the clicked field
  function manageFocus(e){
    if(e.target.id !== "focusedButton"){
      let temp = []
      have.map(item => {
        if (item.isFocused === true){
          item.isFocused = false
          temp.push(item)
        }
        else if (e.target.name == item.id){
          item.isFocused = true
          temp.push(item)
        }
        else temp.push(item)
        
      })
      setHave(temp)      

      temp = []

      want.map(item => {
        if (item.isFocused === true){
          item.isFocused = false
          temp.push(item)
        }
        else if (e.target.name == item.id){
          item.isFocused = true
          temp.push(item)
        }
        else temp.push(item)
        
      })
      setWant(temp)
    }

  }

  // pushes the clicked item on the focused field and focuses the next field
  function pushItem({ItemID, Name}){ 
    let current = undefined
    let temp = []
    have.map(item => {
      if (item.isFocused === true){
        item.isFocused = false
        item.itemID = ItemID
        item.itemName = Name
        item.isAdded = true
        current = item.id

        if (allFieldsJammed(item.id)){
          const {have_focused, want_focused} = focuseOnCorrectField(have, want)

          setHave(have_focused)
          setWant(want_focused)
         }

      } 
      if (item.id === current + 1 && !item.isAdded)
        item.isFocused = true
      else if (item.id === current + 1 && item.isAdded)
        current++

      temp.push(item)
    })
    setHave(temp)

    temp = []

    want.map(item => {

      if (item.isFocused === true){
        item.isFocused = false
        item.itemID = ItemID
        item.itemName = Name
        item.isAdded = true
        current = item.id

        if (allFieldsJammed(item.id)){
          const {have_focused, want_focused} = focuseOnCorrectField(have, want)

          setHave(have_focused)
          setWant(want_focused)
         }
          
      } 
      
      if (item.id === current + 1 && !item.isAdded)
        item.isFocused = true
      else if (item.id === current + 1 && item.isAdded)
        current++

      temp.push(item)
    })
    setWant(temp)
  }

  // checks if all fields in front of the given id have items added
  function allFieldsJammed(id){
    const all = [...have, ...want]

    if (id === 23)
      return true
      
    for (let i = id + 1; i <= 23; i++){
      if (!all[i].isAdded)
        return false
    }
    return true
  }

  // clears all have items
  function clearHaveItems(){
    let empty = true
    have.map(item => {
      if(item.isAdded) 
        empty = false
    })

    if (empty) return null

      let temp = []
      have.map(item => {
        // item.url = ""
        item.color = "None"
        item.colorID = 0
        item.name = ""
        item.cert = "None"
        item.amount = 1
        item.isAdded = false
        temp.push(item)
      })

      const have_focused = focuseOnCorrectField(temp, false)
      setHave(have_focused)
  }

  // clears all want items
  function clearWantItems(){
    let empty = true
    want.map(item => {
      if(item.isAdded) 
        empty = false
    })

    if (empty) return null

    let temp = []
      want.map(item => {
        // item.url = ""
        item.color = "None"
        item.colorID = 0
        item.name = ""
        item.cert = "None"
        item.amount = 1
        item.isAdded = false
        temp.push(item)
      })
      const want_focused = focuseOnCorrectField(false, temp)
      setWant(want_focused)
  }

  function focuseOnCorrectField(h, w){

    if (h && w){

      let have_focused = []
      let want_focused = []
      let stop = false

      h.map(item => {
        if (item.isAdded || stop)
          item.isFocused = false
        
        else {
          item.isFocused = true
          stop = true
        }

        have_focused.push(item)
      })

      w.map(item => {
        if (item.isAdded || stop)
          item.isFocused = false
        
        else {
          item.isFocused = true
          stop = true
        }

        want_focused.push(item)
      })

      return {have_focused, want_focused}

    }
    else if (h){
      let have_focused = []
      let temp = []
      let stop = false

      want.map(item => {
        if (item.isFocused)
          item.isFocused = false
        temp.push(item)
      })
      setWant(temp)

      h.map(item => {
        if (item.isAdded || stop)
          item.isFocused = false
        
        else {
          item.isFocused = true
          stop = true
        }

        have_focused.push(item)
      })

      return have_focused
    }
    else if (w){
      let want_focused = []
      let temp = []
      let stop = false

      have.map(item => {
        if (item.isFocused)
          item.isFocused = false
        temp.push(item)
      })
      setHave(temp)

      w.map(item => {
        if (item.isAdded || stop)
          item.isFocused = false
        
        else {
          item.isFocused = true
          stop = true
        }

        want_focused.push(item)
      })

      return want_focused
    }

  }

  // when editing a trade, this function gets trade response from the request and creates a ready context state for react to use
  function setTradeState(res){
    let have_reform = []
    let want_reform = []

    have.map((item, i) => {
      if (res.data.trade.have[i]){
        have_reform[i] = {...item, ...res.data.trade.have[i]}
        have_reform[i].isAdded = true
      }
      else
        have_reform[i] = item
    })

    want.map((item, i) => {
      if (res.data.trade.want[i]){
        want_reform[i] = {...item, ...res.data.trade.want[i]}
        want_reform[i].isAdded = true
      }
      else
      want_reform[i] = item
    })

    const {have_focused, want_focused} = focuseOnCorrectField(have_reform, want_reform)

    setHave(have_focused)
    setWant(want_focused)
    setPlatform(res.data.trade.platform)
    setNotes(res.data.trade.notes)
  }
}

export {TradeContextProviderRL, TradeContextRL}
