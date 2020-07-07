import React, {useState} from 'react'

import TradePostIconRL from './TradePostIconRL'

function RLTradeComponent({trade, userTradesPage}) {
  const [notesHeight, setNotesHeight] = useState(()=> {
    if (trade.have.length >= 9 || trade.want.length >= 9)
      return "277px"
    else if (trade.have.length >= 5 || trade.want.length >= 5)
      return "179px"
    else 
      return "82px"
  })

  const refPlatform = trade.platform === "PC" ? "Steam" : trade.platform

  
  return (
      <div className="rltrade-container">

        <div className="rltrade-cTopPlace">

          <div className="flex">
            {userName()}
            <div className="top-triangle"></div>
            <div className="trade-reputation">
              <div style={{fontSize: "12px", color: "#CEC6E0"}}>Reputation</div>
              <div className="flex">
                <span style={{fontSize: "12px", color: "#5FD86B"}}>+{trade.reputation.ups}</span> 
                <span style={{fontSize: "12px", color: "#766495", marginLeft: "3px"}}>   </span> 
                <span style={{fontSize: "12px", color: "#C03030", marginLeft: "3px"}}>-{trade.reputation.downs} </span> 
                <span style={{fontSize: "12px", color: "#766495", marginLeft: "5px"}}>Trading Expert</span>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex-col" style={{marginRight: "10px", justifyContent: "space-evenly"}}>
              <div className="active-text">Active</div>
              <div className="trade-post-time">{trade.createdAt}</div>
            </div>

            <div className="right-gamePlatform" style={{height: "100%"}}>
              <img style={{height: "17px", width: "17px", marginRight: "10px"}} src={require(`../../images/other/${refPlatform} icon.png`)} alt="" />{refPlatform}
            </div>
          </div>

        </div>

        <div className="flex rltrade_cMidPlace">

          <div className="flex-col rl-has-container">
            <p className="haswant-text">Has</p>
            <div className="has-items">{tradeItems()}</div>
          </div>

          <div className="flex-col rl-wants-container">
            <p className="haswant-text">Wants</p>
            <div className="want-items">{wantItems()}</div>
          </div>

          <div className="flex-col rl_notes_buttons_container">

            <div className="notes-box">
              {/*<div className="notes-top">Notes</div>*/}
              <div style={{height: `${notesHeight}`}} className="notes">{trade.notes}</div>
            </div>

            <div className="buttons-box">
              <button onClick={() => window.open(trade.steamAccount)}>Contact on Steam</button>
              {userTradesPage ? null : <button onClick={() => window.open(`/trades/${trade.userId}`)}>All {trade.username}'s trades</button> }
            </div>
            
          </div>

        </div>

      </div>
  )


  /*-----Functions                -------------*/

  function userName(){
    if (trade.premium){
      return (
        <div className="username premium">
          <img style={{marginTop: "4px", marginRight: "6px", width: "17px", height: "17px"}} src={require("../../images/other/crown.svg")} />
          <p>{trade.username}</p>
        </div>
      )
    }
    else return <p className="username">{trade.username}</p>
  }


  function tradeItems(){
    return trade.have.map(item => <TradePostIconRL item={item} />)
  }

  function wantItems(){
    return trade.want.map(item => <TradePostIconRL item={item} />)
  }
}

export default RLTradeComponent
