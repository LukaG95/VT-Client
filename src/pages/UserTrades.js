import React, {useState, useEffect, useContext} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'

import {createNotification} from '../App'
import RLTradeComponent from '../components/Rocket League/RLTradeComponent'
import {UserContext} from '../UserContext'

function UserTrades() {
  const [userTrades, setUserTrades] = useState()
  const [game, setGame] = useState("rl")
  
  const pathID = useLocation().pathname.substring(8)   // reads url after /trades/ till the end

  const {myID, openDeleteAllTrades, setOpenDeleteAllTrades} = useContext(UserContext)

  useEffect(() => {
    axios.get(`/api/trades/getTrades?userId=${pathID}`)
    .then (res => { 
      setUserTrades(res.data.trades)
    })
    .catch(err => console.log("Error: " + err))
  }, [])

  if (userTrades)
  return (
    <div className="userTrades-page-wrapper">
      
      <div className="userTrades-top-section">
        <section>
          <button onClick={()=> setGame("rl")} style={game==="rl" ? {backgroundColor: "#47384D"} : null}>Rocket League</button>
          {/*<button onClick={()=> setGame("csgo")} style={game==="csgo" ? {backgroundColor: "#47384D"} : null}>CSGO</button>*/}
        </section>

        {myID === pathID ? userTrades.length > 0 && <button onClick={()=> setOpenDeleteAllTrades(true)} id="del-all-trades-button" > Delete all trades</button> : null}
        
      </div>
      
      {userTrades.length <= 0 && 
        <div style={{color: "#f6f6f6", marginTop: "30px"}}>
          No active Rocket League trades. Create your 
          <a href={`/trading/rl/new`} className="addRepButton2" id="removeDecoration"> first trade</a>
        </div>
      }
      
      <TradeComponents />

    </div>
  )
  else return null


/*-----Functions                -------------*/

  function deleteTrade(trade){
    axios.delete(`/api/trades/deleteTrade?id=${trade._id}`)
    .then (res => { 
      window.location.reload(true)
    })
    .catch(err => console.log("Error: " + err))
  }

  function editTrade(trade){
    window.location.replace(`/trading/rl/edit/${trade._id}`)
  }

  function bumpTrade(trade){
    axios.put(`/api/trades/bumpTrade/${trade._id}`)
    .then (res => { 
      if (res.data.status === "success"){
        createNotification("success", "Trade was bumped")
      }
    })
    .catch(err => console.log("Error: " + err))
  }

  function TradeComponents(){
    var tradeComponents = userTrades.map(trade => 
      <>
        <RLTradeComponent trade={trade} userTradesPage={true}/>
        { myID === pathID ? 
          
          <div className="editDel-tradeButtons-section">
            <button onClick={() => editTrade(trade)} className="editTrade-button">Edit trade</button>
            <button onClick={() => deleteTrade(trade)} className="deleteTrade-button">Delete trade</button>
            <button onClick={() => bumpTrade(trade)} className="bumpTrade-button">Bump trade</button> 
          </div> : null
        }
      </>
    )

    return(
      <>
        {tradeComponents}
      </>
    )
  }

}

export default UserTrades
