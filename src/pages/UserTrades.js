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
    .then (res => { console.log(res, pathID)
      setUserTrades(res.data.trades)
    })
    .catch(err => console.log("Error: " + err))
  }, [])

  function TradeComponents(){
    if (userTrades){
      var tradeComponents = userTrades.map(trade => 
      <>
        <RLTradeComponent trade={trade} />
        <div className="editDel-tradeButtons-section">
          <button className="editTrade-button">Edit trade</button>
          <button className="deleteTrade-button">Delete trade</button>
        </div>
      </>
      )

    }else return null // <Spinner className="newPosition" />

  return(
    <>
      {tradeComponents}
    </>
  )
}

  return (
      <div className="userTrades-page-wrapper">
        <div className="userTrades-top-section">
          <section>
            <button onClick={()=> setGame("rl")} style={game==="rl" ? {backgroundColor: "#47384D"} : null}>Rocket League</button>
            <button onClick={()=> setGame("csgo")} style={game==="csgo" ? {backgroundColor: "#47384D"} : null}>CSGO</button>
          </section>

          <button id="del-all-trades-button" >Delete all trades</button>
        </div>
         <TradeComponents />
      </div>
  )
}

export default UserTrades
