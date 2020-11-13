import React, { useContext } from "react";
import axios from "axios";

import { PopupContext } from "../context/PopupContext";

function Popups() {
  const {
    openTradeNotice,
    setOpenTradeNotice,
    openDeleteAllTrades,
    setOpenDeleteAllTrades,
    openLogoutPopup,
    setOpenLogoutPopup,
  } = useContext(PopupContext);

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
              onClick={() => (window.location.href = "/trading/rl/new")}
              className="tradeNoticeLeftButton"
            >
              Create new trade
            </button>
            <button
              onClick={() => (window.location.href = "/trading/rl")}
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
  } else return null;

  /*-----Functions                -------------*/

  function handleDeleteAll() {
    axios
      .delete(`/api/trades/deleteTrades`)
      .then((res) => {
        if (res.data.info === "success") window.location.reload();
      })
      .catch((err) => console.log("Error: " + err));
  }

  function handleLogout() {
    axios
      .delete(`/api/auth/logout`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log("Error: " + err));
  }
}

export default Popups;
