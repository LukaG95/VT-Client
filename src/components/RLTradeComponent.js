import React, {useState, useEffect} from 'react'

function RLTradeComponent({trade}) {
  const [notesHeight, setNotesHeight] = useState(()=> {
    if (trade.have.length >= 9 || trade.want.length >= 9)
      return "230px"
    else if (trade.have.length >= 5 || trade.want.length >= 5)
      return "132px"
    else 
      return "35px"
  })

  /*
  useEffect(() => {
    if (trade.have.length >= 9 || trade.want.length >= 9)
      setNotesHeight("230px")
    else if (trade.have.length >= 5 || trade.want.length >= 5)
      setNotesHeight("132px")
    else 
      setNotesHeight("35px")

      
  }, [])
  */

  function userName(){
    if (trade.premium){
      return (
        <div className="username premium">
          <img style={{marginTop: "4px", marginRight: "6px", width: "17px", height: "17px"}} src={require("../images/other/crown.svg")} />
          <p>{trade.username}</p>
        </div>
      )
    }
    else return <p className="username">{trade.username}</p>
  }

  function handleDate(){
    return(
      <div className="trade-post-time">5 seconds ago</div>
    )
  }

  function tradeItems(){
    const itemComponents = trade.have.map(url => <img style={{height: "95px", width: "95px"}} src={require(`../images/RLimages/${url}`)} />)
    
    return itemComponents
  }

  function wantItems(){
    const itemComponents = trade.want.map(url => <img style={{height: "95px", width: "95px"}} src={require(`../images/RLimages/${url}`)} />)
    
    return itemComponents
  }

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
                <span style={{fontSize: "12px", color: "#766495", marginLeft: "3px"}}> | </span> 
                <span style={{fontSize: "12px", color: "#C03030", marginLeft: "3px"}}>-{trade.reputation.downs} </span> 
                <span style={{fontSize: "12px", color: "#766495", marginLeft: "5px"}}>Trading Expert</span>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex-col" style={{marginRight: "10px", justifyContent: "space-evenly"}}>
              <div className="active-text">Active</div>
              {handleDate()}
            </div>

            <div className="right-gamePlatform" style={{height: "100%"}}>
              <img style={{height: "15px", width: "18px", marginRight: "10px"}} src={require("../images/other/Steam icon.png")} alt="" />{trade.platform}
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
              <div className="notes-top">Notes</div>
              <div style={{height: `${notesHeight}`}} className="notes">{trade.notes}</div>
            </div>

            <div className="buttons-box">
              <button>Contact on Steam</button>
              <button>All {trade.username}'s trades</button>
            </div>
            
          </div>

        </div>

      </div>
  )
}

export default RLTradeComponent
