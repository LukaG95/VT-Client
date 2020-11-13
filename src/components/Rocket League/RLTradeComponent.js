import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import TradePostIconRL from "./TradePostIconRL";
import useWindowDimensions from "../../misc/windowHW";
import { UserContext } from "../../context/UserContext";

function RLTradeComponent({ trade, manageTrade }) {
  const [rep, setRep] = useState();
  const [notesHeight, setNotesHeight] = useState(() => {
    if (trade.have.length >= 9 || trade.want.length >= 9) return "300px";
    else if (trade.have.length >= 5 || trade.want.length >= 5) return "179px";
    else return "68px";
  });

  const { isLoggedIn } = useContext(UserContext);

  const { width } = useWindowDimensions();

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
  }, []);

  return (
    <div className="rltrade-container">
      {width >= 957 ? PCTabledTradeHeader() : PhoneTradeHeader()}

      <div className="rltrade_cMidPlace">
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
            <div style={{ maxHeight: `${notesHeight}` }} className="notes">
              {trade.notes}
            </div>
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
                <p className="trade-expire-text">
                  Expires
                  {trade.expiresIn.days < 1
                    ? "today"
                    : `in ${trade.expiresIn.days} days`}
                  at {trade.expiresIn.at}
                </p>
              </>
            ) : isLoggedIn ? (
              <>
                <button
                  onClick={() => window.open("#")}
                  style={{ marginRight: "10px" }}
                >
                  Message
                </button>
                <button
                  onClick={() => window.open(`/reputation/${trade.user._id}`)}
                  style={{ marginRight: "10px" }}
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
            <p className="trade-component-title">{rep ? rep.title : null}</p>
          </div>
        </div>

        <div className="rl-trade-component-top-right">
          <div className="right-gamePlatform">
            {/*<img style={{height: "20px", width: "20px", marginRight: "5px"}} src={require(`../../images/other/SWITCH icon.png`)} alt="" />*/}
            {/*<img style={{height: "20px", width: "20px", marginRight: "5px"}} src={require(`../../images/other/SWITCH icon.png`)} alt="" />*/}
            <img
              style={{ height: "20px", width: "20px", marginRight: "5px" }}
              src={require(`../../images/other/${trade.platform} icon.png`)}
              alt=""
            />
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
                {rep ? rep.title : null}
              </p>
              <div className="trade-component-tags-PHONEVIEW">{tags()}</div>
            </div>
          </div>
        </div>

        <div className="rl-trade-component-top-right">
          <div className="right-gamePlatform-PHONEVIEW">
            {/*<img style={{height: "20px", width: "20px", marginRight: "5px"}} src={require(`../../images/other/SWITCH icon.png`)} alt="" />*/}
            {/*<img style={{height: "20px", width: "20px", marginRight: "5px"}} src={require(`../../images/other/SWITCH icon.png`)} alt="" />*/}
            <img
              style={{ height: "20px", width: "20px", marginRight: "5px" }}
              src={require(`../../images/other/${trade.platform} icon.png`)}
              alt=""
            />
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
            src={require("../../images/other/crown.svg")}
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
    return trade.have.map((item) => <TradePostIconRL item={item} />);
  }

  function wantItems() {
    return trade.want.map((item) => <TradePostIconRL item={item} />);
  }
}

export default RLTradeComponent;
