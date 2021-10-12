import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { createNotification } from "../misc/ToastNotification";
import RLTradeComponent from "../components/Categories/Rocket League/RLTradeComponent";
import { UserContext } from "../context/UserContext";
import { PopupContext } from "../context/PopupContext";
import Topbar from "./My Account/Topbar";
import useWindowDimensions from "../misc/windowHW";
import TradeComponentsSkeleton from "../skeleton/TradeComponentsSkeleton"
import {Helmet} from "react-helmet";

function UserTrades() {
  const [userTrades, setUserTrades] = useState();
  const [username, setUsername] = useState();

  const { pathID } = useParams()
  const { myID } = useContext(UserContext);
  
  const { setOpenDeleteAllTrades } = useContext(PopupContext);
  const { width } = useWindowDimensions();

  useEffect(() => {
    axios
      .get(`/api/trades/getUserTrades?searchId=${pathID}`)
      .then((res) => { 
        if (res.data.info === "success" || res.data.info === "no trades") {
          setUserTrades(res.data.trades);
          setUsername(res.data.username);
        }
      })
      .catch((res) => {
        if (res.response.data.info === "no user"){}
        createNotification(
          "error",
          "Oops, something went wrong",
          `oops something went wrong`
        );
      });

  }, [pathID]);

    return (
      <>
        <Helmet>
          {username ? <title>{username}'s Trades | VirTrade</title> : <title></title>}
          <meta name="description" content="UserTrades page contains all trades from a user. Delete, edit or bump trades if they are yours" />
          <link rel="canonical" href="http://virtrade.gg/trades" />
        </Helmet>

        {myID === pathID ? <Topbar /> : usernameField()}

        {
          !userTrades ? 
            <>
              {width < 700 && myID === pathID ? <div style={{height: "15px"}}></div> : null /* Topbar is hidden to hamburger on smaller width so we need spacing*/} 
              <TradeComponentsSkeleton /> 
            </>
          : 
            userTrades.length <= 0 ? 
              NoTrades() 
            : 
              <>
                {width < 700 && myID === pathID ? <div style={{height: "15px"}}></div> : null} 
                {TradeComponents()}
              </>
        }

      </>
    );

  /*-----Functions                -------------*/

  function deleteTrade(trade) {
    axios
      .delete(`/api/trades/deleteTrade?tradeId=${trade._id}`)
      .then((res) => {
        if (res.data.info === "success") window.location.reload();
      })
      .catch((err) => {});
  }

  function editTrade(trade) {
    window.location.replace(`/trading/edit/${trade._id}`);
  }

  function bumpTrade(trade) {
    axios
      .put(`/api/trades/bumpTrade/?tradeId=${trade._id}`)
      .then((res) => {
        if (res.data.info === "success")
          createNotification(
            "success",
            "Your trade was bumped!",
            `bumping trade ${trade._id}`
          );
      })
      .catch((err) => {
        if (err.response.data.info === "already bumped"){
          createNotification(
            "info",
            "You have already bumped this trade",
            `already bumped ${trade._id}`
          );
        }
      });
  }

  function NoTrades() {
    if (myID === pathID)
      return (
        <div className="noTrades">
          <p>
            No active Rocket League trades. <br /> Create your<span> </span>
            <Link to="/trading/new" className="first-trade-text-button">
              first trade
            </Link>
          </p>
        </div>
      );
    else
      return (
        <div className="noTrades">
          No active Rocket League trades.
        </div>
      );
  }

  function TradeComponents() {
    let manageTrade = { deleteTrade, editTrade, bumpTrade };

    return userTrades.map((trade) => {
      if (myID === pathID)
        return <RLTradeComponent trade={trade} manageTrade={manageTrade} />;
      else return <RLTradeComponent trade={trade} />;
    });
  }

  function usernameField(){
    if(username)
    return(
      <div className="user-trades-topbar-field">
        <div className="user-trades-topbar-left">
          <p>{username}'s <span style={{ color: "#FE3B3B" }}>trades</span></p>
          
          {/*
            <div id="separator" ></div>
          <button
            onClick={() => setGame("rl")}
            style={game === "rl" ? { backgroundColor: "#47384D" } : null}
          >
            Rocket League
          </button>
          */}
          
        </div>
  
        {myID === pathID
          ? userTrades.length > 0 && (
            <button
              onClick={() => setOpenDeleteAllTrades(true)}
              id="del-all-trades-button"
            >
              Delete all trades
            </button>
          )
        : null}
      </div>
    )
    else return(
      <div className="user-trades-topbar-field">
        <div className="nameSkeleton"></div>
      </div>
    )
  }
  
}

export default UserTrades;

/*
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
*/
