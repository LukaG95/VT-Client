import React, {useState, useContext, useEffect} from 'react'

import {UserContext} from '../UserContext'

function Popups() {

  const {openTradeNotice, setOpenTradeNotice} = useContext(UserContext)

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
    else return null
}

export default Popups
