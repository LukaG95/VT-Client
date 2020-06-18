import React, {useState, useContext, useEffect} from 'react'

import {UserContext} from '../UserContext'
import LoginInfo from './LoginInfo'
import SignUpInfo from './SignUpInfo'

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
            
          <div>
            <p><span style={{color: "#E7AA0F"}}>Successfully</span> submited your trade</p>
            <div></div>
          </div>

          <div><img style={{width: "25px", height: "25px"}} src={require("../images/other/Thumbs up.png")}/></div>

          <div style={{justifyContent: "space-evenly"}}>
            <button onClick={()=> window.location.href = "/trading/rl/new"} className="tradeNoticeLeftButton">Create new trade</button>
            <button onClick={()=> window.location.href = "/trading/rl"}className="tradeNoticeRightButton">Trading page</button>
          </div>

        </div>

      </div>
    )
    else return null
}

export default Popups
