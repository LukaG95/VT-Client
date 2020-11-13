import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Filter from "bad-words";
import Spinner from "../../../components/Spinner";

import AddedIconRL from "../../../components/Rocket League/AddedIconRL";
import { TradeContextRL } from "../../../context/TradeContextRL";
import useWindowDimensions from "../../../misc/windowHW";

const profanityFilter = new Filter({ regex: /^\*|\.|$/gi });

function Small1stPage({ handleTradeSubmit, setShowPage, setClickedItem }) {
  const [itemImages, setItemImages] = useState();

  const {
    have,
    want,
    platform,
    setPlatform,
    notes,
    setNotes,
    manageFocus,
    pushItem,
    clearWantItems,
    clearHaveItems,
    gotInfo,
    tradesAmount,
    setTradesAmount,
  } = useContext(TradeContextRL);

  const pathID = useLocation().pathname.substring(17); // reads url after /trades/ till the end

  const { height, width } = useWindowDimensions();

  const displayed_have_items = have.map((item) => {
    if (item.isAdded === false) {
      if (item.isFocused === false)
        return (
          <button
            name={item.id}
            onClick={(e) => {
              manageFocus(e);
              setShowPage("2");
            }}
          ></button>
        );
      else
        return (
          <button
            name={item.id}
            onClick={(e) => {
              manageFocus(e);
              setShowPage("2");
            }}
            id="focusedButton"
          >
            +
          </button>
        );
    } else
      return (
        <AddedIconRL
          item={item}
          setShowPage={setShowPage}
          setClickedItem={setClickedItem}
        />
      );
  });

  const displayed_want_items = want.map((item) => {
    if (item.isAdded === false) {
      if (item.isFocused === false)
        return (
          <button
            name={item.id}
            onClick={(e) => {
              manageFocus(e);
              setShowPage("2");
            }}
          ></button>
        );
      else
        return (
          <button
            name={item.id}
            onClick={(e) => {
              manageFocus(e);
              setShowPage("2");
            }}
            id="focusedButton"
          >
            +
          </button>
        );
    } else
      return (
        <AddedIconRL
          item={item}
          setShowPage={setShowPage}
          setClickedItem={setClickedItem}
        />
      );
  });

  return (
    <div id="add-trade-1st-page">
      <div className="rlHaveWantSection-SMALL">
        <div className="hTitle-SMALL">
          <p>
            You <b>have</b>
          </p>
          <div
            onClick={clearHaveItems}
            className="rl-resetFilters-button noUserInteraction"
            style={{ margin: "0px" }}
          >
            <img
              src={require(`../../../images/other/trash.png`)}
              style={{ height: "14px", width: "14px" }}
            />
          </div>
        </div>

        <div className="you-have-wrapper" style={{ marginBottom: "10px" }}>
          <div className="haveItems-SMALL">{displayed_have_items}</div>
        </div>

        <div className="wTitle-SMALL">
          <p>
            You <b>want</b>
          </p>
          <div
            onClick={clearWantItems}
            className="rl-resetFilters-button noUserInteraction"
            style={{ margin: "0px" }}
          >
            <img
              src={require(`../../../images/other/trash.png`)}
              style={{ height: "14px", width: "14px" }}
            />
          </div>
        </div>

        <div className="you-want-wrapper">
          <div className="wantItems-SMALL">{displayed_want_items}</div>
        </div>
      </div>

      <div className="notes-and-submit-button-SMALL">
        <div className="notesSection">
          <textarea
            placeholder="Add notes..."
            className="notesArea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
          <div className="platformSection">
            <h4>PLATFORM:</h4>
            <label className="noUserInteraction platf-button-container">
              <input
                type="radio"
                checked={platform === "Steam"}
                onChange={() => setPlatform("Steam")}
              />
              <p style={platform === "Steam" ? { color: "#2C8E54" } : null}>
                STEAM
              </p>
            </label>
            <label className="noUserInteraction platf-button-container">
              <input
                type="radio"
                checked={platform === "PS4"}
                onChange={() => setPlatform("PS4")}
              />
              <p style={platform === "PS4" ? { color: "#2C8E54" } : null}>
                PS4
              </p>
            </label>
            <label className="noUserInteraction platf-button-container">
              <input
                type="radio"
                checked={platform === "XBOX"}
                onChange={() => setPlatform("XBOX")}
              />
              <p style={platform === "XBOX" ? { color: "#2C8E54" } : null}>
                XBOX
              </p>
            </label>
            <label className="noUserInteraction platf-button-container">
              <input
                type="radio"
                checked={platform === "SWITCH"}
                onChange={() => setPlatform("SWITCH")}
              />
              <p style={platform === "SWITCH" ? { color: "#2C8E54" } : null}>
                SWITCH
              </p>
            </label>
          </div>
        </div>

        <button onClick={() => handleTradeSubmit()} className="rlSubmitButton">
          SUBMIT TRADE
        </button>
      </div>
    </div>
  );
}

export default Small1stPage;
