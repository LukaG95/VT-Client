import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'

import {UserContext} from '../UserContext'

function Popups() {

  const {openTradeNotice, setOpenTradeNotice, openDeleteAllTrades, setOpenDeleteAllTrades} = useContext(UserContext)

  if (openTradeNotice)
    return (
      <div 
      className="shading" 
      onMouseDown={event => {
        if(event.target.className === "shading")
        setOpenTradeNotice(false)
      }}
      >
        <div className="tradeNotice">
            
          <div className="tradeNoticeTop">
            <p><span style={{color: "#2C8E54"}}>Successfully</span> submited your trade</p>
          </div>

          <div className="tradeNoticeBottom" style={{justifyContent: "space-evenly"}}>
            <button onClick={()=> window.location.href = "/trading/rl/new"} className="tradeNoticeLeftButton">Create new trade</button>
            <button onClick={()=> window.location.href = "/trading/rl"}className="tradeNoticeRightButton">Trading page</button>
          </div>

        </div>

      </div>
    )
    else if (openDeleteAllTrades){
      return (
        <div 
        className="shading" 
        onMouseDown={event => {
          if(event.target.className === "shading")
          setOpenDeleteAllTrades(false)
        }}
        >
          <div style={{width: "500px"}} className="tradeNotice">
                     
            <p className="tradeNoticeTop">Are you sure you want to delete all trades?</p>

            <div className="tradeNoticeBottom" style={{justifyContent: "space-evenly"}}>
              <button onClick={()=> handleDeleteAll()} className="tradeNoticeLeftButton">Yes</button>
              <button onClick={()=> setOpenDeleteAllTrades(false)} className="tradeNoticeRightButton">No</button>
            </div>
  
          </div>
  
        </div>
      )
    }
    else return null



  function handleDeleteAll(){
    axios.delete(`/api/trades/deleteTrade?all=true`)
    .then (res => { 
      window.location.reload(true)
    })
    .catch(err => console.log("Error: " + err))
  }
}

export default Popups
