import React, {useState, useEffect, useContext} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import RLTradeComponent from '../components/RLTradeComponent'
import { UserContext } from '../UserContext'

function UserTrades() {
  const [userTrades, setUserTrades] = useState()
  const [game, setGame] = useState("rl")
  
  const pathID = useLocation().pathname.substring(8)   // reads url after /trades/ till the end

  const {myID} = useContext(UserContext)

  useEffect(() => {
    axios.get(`/api/trades/getTrades?userId=${pathID}`)
    .then (res => { 
      setUserTrades(res.data.trades)
    })
    .catch(err => console.log("Error: " + err))
  }, [])

  function deleteTrade(trade){
    axios.delete(`/api/trades/deleteTrade?id=${trade._id}`)
    .then (res => { 
      window.location.reload(true)
    })
    .catch(err => console.log("Error: " + err))
  }

  function deleteAllTrades(){
    axios.delete(`/api/trades/deleteTrade?all=true`)
    .then (res => { 
      window.location.reload(true)
    })
    .catch(err => console.log("Error: " + err))
  }

  function editTrade(trade){
    window.location.replace(`/trading/rl/edit/${trade._id}`)
  }

  function TradeComponents(){
      var tradeComponents = userTrades.map(trade => 
      <>
        <RLTradeComponent trade={trade} userTradesPage={true}/>
        { myID === pathID ? 
          
          <div className="editDel-tradeButtons-section">
            <button onClick={() => editTrade(trade)} className="editTrade-button">Edit trade</button>
            <button onClick={() => deleteTrade(trade)} className="deleteTrade-button">Delete trade</button>
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

if (userTrades)
  return (
      <div className={`userTrades-page-wrapper`}>
        <div className="userTrades-top-section">
          <section>
            <button onClick={()=> setGame("rl")} style={game==="rl" ? {backgroundColor: "#47384D"} : null}>Rocket League</button>
            <button onClick={()=> setGame("csgo")} style={game==="csgo" ? {backgroundColor: "#47384D"} : null}>CSGO</button>
          </section>

          { myID === pathID ? <button onClick={()=> deleteAllTrades()} id="del-all-trades-button" > Delete all trades</button> : null}
          
        </div>

        <TradeComponents />

      </div>
  )
  else return null
}

export default UserTrades
