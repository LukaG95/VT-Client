import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";

import Item from "./Item";
import useWindowDimensions from "../../misc/windowHW";
import { UserContext } from "../../context/UserContext";
import ItemContainer from "./ItemContainer";
import CrownImage from "../../images/icons/crown.svg";
import { ReactComponent as SteamIcon } from "../../images/icons/steam.svg";
import { ReactComponent as PSNIcon } from "../../images/icons/playstation.svg";
import { ReactComponent as XBOXIcon } from "../../images/icons/xbox.svg";
import { ReactComponent as SwitchIcon } from "../../images/icons/switch.svg";
import { ReactComponent as EPICIcon } from "../../images/icons/epic.svg";
import repTitle from "../../constants/repTitle"

const platformIcons = {
  steam: <SteamIcon style={{ height: "20px", width: "20px", marginRight: "5px" }} />,
  psn: <PSNIcon style={{ height: "20px", width: "20px", marginRight: "5px" }} />,
  xbox: <XBOXIcon style={{ height: "20px", width: "20px", marginRight: "5px" }} />,
  switch: <SwitchIcon style={{ height: "20px", width: "20px", marginRight: "5px" }} />,
  epic: <EPICIcon style={{ height: "20px", width: "20px", marginRight: "5px" }} />
};

function RLTradeComponent({ trade, manageTrade }) {
  const [rep, setRep] = useState();

  const { isLoggedIn } = useContext(UserContext);
  const { width } = useWindowDimensions();
  const noteBox = useRef(null)

  useEffect(() => {
    
    axios
      .get(`/api/reputation/compact/${trade.user._id}`)
      .then((res) => {
        if (res.status === 200) setRep(res.data.rep);
      })
      .catch((err) => {
        console.log(err);
        /*if (err.response)
      if (err.response.status === 400 || 401){}*/
      });
  }, [trade]);

  return (
    <div className="rltrade-container">
      {width >= 957 ? PCTabledTradeHeader() : PhoneTradeHeader()}

      <div className="rltrade_cMidPlace" ref={noteBox}>
        <div className="flex-col rl-has-container">
          <p className="haswant-text">Has</p>
          <ItemContainer className="smallerIcon">{haveItems()}</ItemContainer>
        </div>

        <div className="flex-col rl-wants-container">
          <p className="haswant-text">Wants</p>
          <ItemContainer className="smallerIcon">{wantItems()}</ItemContainer>
        </div>

        <div className="flex-col rl_notes_buttons_container">
          <div className="notes-box">
          {noteBox.current ? 
            (<div style={{ maxHeight: `${noteBox.current.offsetHeight-105}px` }} className="notes">
              {trade.notes}
            </div>) : null}
          </div>

          <div className="buttons-box">
            {manageTrade ? (
              <>
                <button
                  onClick={() => manageTrade.editTrade(trade)}
                  id="editTrade-button"
                >
                  Edit trade
                </button>
                <button
                  onClick={() => manageTrade.deleteTrade(trade)}
                  id="deleteTrade-button"
                >
                  Delete trade
                </button>
                <button
                  onClick={() => manageTrade.bumpTrade(trade)}
                  id="bumpTrade-button"
                >
                  Bump trade
                </button>
               
              </>
            ) : isLoggedIn ? (
              <>
                <button
                  onClick={() => window.open(`/account/messages/${trade.user._id}`)}
                >
                  Message
                </button>
                <button
                  onClick={() => window.open(`/reputation/${trade.user._id}`)}
                >
                  View reputation
                </button>
                <button
                  onClick={() => window.open(`/trades/${trade.user._id}`)}
                >
                  View all trades
                </button>
              </>
            ) : (
                  <p className="buttons-box-sign-to-interact">
                    Sign in to interact
                  </p>
                )}
          </div>
        </div>
      </div>
      
      {manageTrade &&
          <p className="trade-expire-text">
          Expires 
          {trade.expiresIn.days < 1
            ? "today"
            : ` in ${trade.expiresIn.days} days `}
          at {trade.expiresIn.at}
        </p>
      }
      
    </div>
  );

  /*-----Functions                -------------*/

  function PCTabledTradeHeader() {
    return (
      <div className="rltrade-cTopPlace">
        <div className="flex">
          {userName()}
          <div className="trade-reputation">
            <p
              style={{
                fontSize: "12px",
                color: "#CEC6E0",
                marginBottom: "3px",
              }}
            >
              Reputation
            </p>
            <div className="flex">
              <p className="trade-component-pozitiveRep">
                +{rep ? rep.ups : null}
              </p>
              <p style={{ marginLeft: "6px" }}> </p>
              <p className="trade-component-negativeRep">
                -{rep ? rep.downs : null}
              </p>
            </div>
          </div>
          <div className="trade-component-tagsAndTitle">
            <div className="trade-component-tags">{tags()}</div>
            <p className="trade-component-title">{rep ? repTitle(rep.ups) : null}</p>
          </div>
        </div>

        <div className="rl-trade-component-top-right">
          <div className="right-gamePlatform">
            {platformIcons[trade.platform.toLowerCase()]}
            {trade.platform}
          </div>

          <div className="flex">
            <div className="trade-post-time">Active {trade.bumpedAt}</div>
          </div>
        </div>
      </div>
    );
  }

  function PhoneTradeHeader() {
    return (
      <div className="rltrade-cTopPlace">
        <div className="trade-component-header-left">
          {userName()}
          <div className="trade-component-header-repTitleTags-PHONEVIEW">
            <div className="trade-reputation">
              <div className="flex">
                <p
                  className="trade-component-pozitiveRep"
                  style={{ fontSize: "15px" }}
                >
                  +{rep ? rep.ups : null}
                </p>
                <p style={{ marginLeft: "6px" }}> </p>
                <p
                  className="trade-component-negativeRep"
                  style={{ fontSize: "15px" }}
                >
                  -{rep ? rep.downs : null}
                </p>
              </div>
            </div>
            <div className="trade-component-tagsAndTitle-PHONEVIEW">
              <p className="trade-component-title-PHONEVIEW">
                {rep ? repTitle(rep.ups) : null}
              </p>
              <div className="trade-component-tags-PHONEVIEW">{tags()}</div>
            </div>
          </div>
        </div>

        <div className="rl-trade-component-top-right">
          <div className="right-gamePlatform-PHONEVIEW">
            {platformIcons[trade.platform.toLowerCase()]}
            {trade.platform}
          </div>

          <div className="flex">
            <div className="trade-post-time-PHONEVIEW">
              Active {trade.bumpedAt}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function userName() {
    if (trade.user.isPremium)
      return (
        <div className="username premium">
          <img
            style={{
              marginTop: "4px",
              marginRight: "6px",
              width: "17px",
              height: "17px",
            }}
            src={CrownImage}
            alt=""
          />
          <p>{trade.user.username}</p>
        </div>
      );
    else
      return (
        <div className="username">
          {width >= 957 ? (
            <p style={{ fontSize: "12px", color: "#CEC6E0" }}>User</p>
          ) : null}
          <p
            style={
              ({ fontWeight: "600", fontSize: "21px" },
                width < 957 ? { fontSize: "17px", marginBottom: "5px" } : null)
            }
          >
            {trade.user.username}
          </p>
        </div>
      );
  }

  function tags() {
    if (trade.user.tags)
      return trade.user.tags.map((tag) => (
        <div
          style={{ color: tag.color, border: `1px solid ${tag.color}` }}
          className="displayed-user-tag"
        >
          {tag.name.toUpperCase()}
        </div>
      ));
    else return null;
  }

  function haveItems() {
    return trade.have.map((item) => <Item item={item} />);
  }

  function wantItems() {
    return trade.want.map((item) => <Item item={item} />);
  }
}

export default RLTradeComponent;
