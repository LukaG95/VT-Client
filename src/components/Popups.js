import React, { useContext } from "react";
import axios from "axios";

import { PopupContext } from "../context/PopupContext";
import { UserContext } from "../context/UserContext";
import ReputationBody from "./Sidebar Left/ReputationBody"

function Popups() {
  const {
    openTradeNotice,
    setOpenTradeNotice,
    openDeleteAllTrades,
    setOpenDeleteAllTrades,
    openLogoutPopup,
    setOpenLogoutPopup,
    openEditTradePopup,
    setOpenEditTradePopup,
    openRepLeaderboards,
    setOpenRepLeaderboards
  } = useContext(PopupContext);

  const { handleLogout } = useContext(UserContext);

  // create a function, pass in setOpenTradeNotice as a parameter
  if (openTradeNotice)
    return (
      <div
        className="shading"
        onMouseDown={(e) => {
          if (e.target.className === "shading") setOpenTradeNotice(false);
        }}
      >
        <div className="tradeNotice">
          <div className="tradeNoticeTop">
            <p>
              <span style={{ color: "#2C8E54" }}>Successfully</span> submited
              your trade
            </p>
          </div>

          <div
            className="tradeNoticeBottom"
            style={{ justifyContent: "space-evenly" }}
          >
            <button
              onClick={() => (window.location.href = "/trading/new")}
              className="tradeNoticeLeftButton"
            >
              Create new trade
            </button>
            <button
              onClick={() => (window.location.href = "/trading")}
              className="tradeNoticeRightButton"
            >
              Trading page
            </button>
          </div>
        </div>
      </div>
    );
  else if (openDeleteAllTrades) {
    return (
      <div
        className="shading"
        onMouseDown={(e) => {
          if (e.target.className === "shading") setOpenDeleteAllTrades(false);
        }}
      >
        <div style={{ width: "500px" }} className="tradeNotice">
          <p className="tradeNoticeTop">
            Are you sure you want to delete all trades?
          </p>

          <div
            className="tradeNoticeBottom"
            style={{ justifyContent: "space-evenly" }}
          >
            <button
              onClick={() => handleDeleteAll()}
              className="tradeNoticeLeftButton"
            >
              Yes
            </button>
            <button
              onClick={() => setOpenDeleteAllTrades(false)}
              className="tradeNoticeRightButton"
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  } else if (openLogoutPopup) {
    return (
      <div
        className="shading"
        onMouseDown={(e) => {
          if (e.target.className === "shading") setOpenLogoutPopup(false);
        }}
      >
        <div style={{ width: "500px" }} className="tradeNotice">
          <p className="tradeNoticeTop">Are you sure you want to logout?</p>

          <div
            className="tradeNoticeBottom"
            style={{ justifyContent: "space-evenly" }}
          >
            <button
              onClick={() => handleLogout()}
              className="tradeNoticeLeftButton"
            >
              Yes
            </button>
            <button
              onClick={() => setOpenLogoutPopup(false)}
              className="tradeNoticeRightButton"
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
    
  } 
  else if (openEditTradePopup) 
    return (
      <div
        className="shading"
        onMouseDown={(e) => {
          if (e.target.className === "shading") {
            setOpenEditTradePopup(false)
            window.location.replace("/trading") 
          };
        }}
      >
        <div style={{ width: "500px" }} className="tradeNotice">
          <p className="tradeNoticeTop">You have edited your trade</p>

          <div
            className="tradeNoticeBottom"
            style={{ justifyContent: "space-evenly" }}
          >
            <button
              onClick={() => {
                setOpenEditTradePopup(false)
                window.location.replace("/trading/new") 
              }}
              className="tradeNoticeLeftButton"
            >
              New trade
            </button>
            <button
              onClick={() => {
                setOpenEditTradePopup(false)
                window.location.replace("/trading") 
              }}
              className="tradeNoticeRightButton"
            >
              Go to trading
            </button>
          </div>
        </div>
      </div>
    );
  else if (openRepLeaderboards)
  return (
    <div
        className="shading"
        onMouseDown={(e) => {
          if (e.target.className === "shading") setOpenRepLeaderboards(false);
        }}
      >
        <ReputationBody popup={true}/>
      </div>
  )
    
  else return null;

  /*-----Functions                -------------*/

  function handleDeleteAll() {
    axios
      .delete(`/api/trades/deleteTrades`)
      .then((res) => {
        if (res.data.info === "success") window.location.reload();
      })
      .catch((err) => {});
  }

}

export default Popups;
