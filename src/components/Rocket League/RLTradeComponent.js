import React, {useState, useEffect} from 'react'
import axios from 'axios'

import TradePostIconRL from './TradePostIconRL'

function RLTradeComponent({trade, manageTrade}) {
  const [rep, setRep] = useState()
  const [notesHeight, setNotesHeight] = useState(()=> {
    if (trade.have.length >= 9 || trade.want.length >= 9)
      return "300px"
    else if (trade.have.length >= 5 || trade.want.length >= 5)
      return "179px"
    else 
      return "68px"
  })

  useEffect(() => {
    
    axios.get(`/api/reputation/compact/${trade.user._id}`)
    .then (res => { 
      if (res.status === 200)
        setRep(res.data.rep)
    
    })
    .catch(err => {
      console.log(err)
      /*if (err.response)
      if (err.response.status === 400 || 401){}*/
    })
  }, [])
  
  return (
      <div className="rltrade-container">

        <div className="rltrade-cTopPlace">

          <div className="flex">
            {userName()}
            <div className="trade-reputation">
              <p style={{fontSize: "12px", color: "#CEC6E0", marginBottom: "3px"}}>Reputation</p>
              <div className="flex">
                <p style={{fontSize: "18px", color: "#5FD86B"}}>+{rep ? rep.ups : null} </p> 
                <p style={{fontSize: "18px", color: "#766495", marginLeft: "3px"}}> </p> 
                <p style={{fontSize: "18px", color: "#C03030", marginLeft: "3px"}}>-{rep ? rep.downs : null} </p> 
              </div>
            </div>
            <div className="trade-component-tagsAndTitle">
              <div className="trade-component-tags">{tags()}</div>
              <p className="trade-component-title">{rep ? rep.title : null}</p>
            </div>
          </div>

          <div className="rl-trade-component-top-right">
            <div className="right-gamePlatform">
              {/*<img style={{height: "20px", width: "20px", marginRight: "5px"}} src={require(`../../images/other/SWITCH icon.png`)} alt="" />*/}
              {/*<img style={{height: "20px", width: "20px", marginRight: "5px"}} src={require(`../../images/other/SWITCH icon.png`)} alt="" />*/}
              <img style={{height: "20px", width: "20px", marginRight: "5px"}} src={require(`../../images/other/${trade.platform} icon.png`)} alt="" />{trade.platform}
            </div>

            <div className="flex">
              <div className="trade-post-time">Active {trade.bumpedAt}</div>
            </div>
          </div>
        </div>

        <div className="flex rltrade_cMidPlace">

          <div className="flex-col rl-has-container">
            <p className="haswant-text">Has</p>
            <div className="has-items">{haveItems()}</div>
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
              {manageTrade ? 
                  <>
                    <button onClick={() => manageTrade.editTrade(trade)} id="editTrade-button">Edit trade</button>
                    <button onClick={() => manageTrade.deleteTrade(trade)} id="deleteTrade-button">Delete trade</button>
                    <button onClick={() => manageTrade.bumpTrade(trade)} id="bumpTrade-button">Bump trade</button> 
                    <p className="trade-expire-text">Expires {trade.expiresIn.days < 1 ? 'today' : `in ${trade.expiresIn.days} days`} at {trade.expiresIn.at}</p>
                  </>
                : 
                  <>
                    <button onClick={() => window.open("#")}>Message</button>
                    <button onClick={() => window.open(`/reputation/${trade.user._id}`)}>View reputation</button> 
                    <button onClick={() => window.open(`/trades/${trade.user._id}`)}>View all trades</button> 
                  </>
              }
            </div>
            
          </div>

        </div>

      </div>
  )

  /*-----Functions                -------------*/

  function userName(){
    if (trade.user.isPremium)
      return (
        <div className="username premium">
          <img style={{marginTop: "4px", marginRight: "6px", width: "17px", height: "17px"}} src={require("../../images/other/crown.svg")} />
          <p>{trade.user.username}</p>
        </div>
      )
    else return (
      <div className="username">
        <p style={{fontSize: "12px", color: "#CEC6E0"}}>User</p>
        <p style={{fontWeight: "600", fontSize: "21px"}}>{trade.user.username}</p>
      </div>
    )
  }

  function tags(){

    if (trade.user.tags)
      return trade.user.tags.map(tag =>
        <div style={{color: tag.color, border: `1px solid ${tag.color}`}} className="displayed-user-tag">
          {tag.name.toUpperCase()}
        </div>
      )
  
    else return null

  } 
  
  function haveItems(){
    return trade.have.map(item => <TradePostIconRL item={item} />)
  }

  function wantItems(){
    return trade.want.map(item => <TradePostIconRL item={item} />)
  }
}

export default RLTradeComponent
