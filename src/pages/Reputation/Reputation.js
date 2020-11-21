import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../../context/UserContext";
import { PopupContext } from "../../context/PopupContext";
import { createNotification } from "../../misc/ToastNotification";
import useWindowDimensions from "../../misc/windowHW";

function Reputation() {
  const [repInfo, setRepInfo] = useState();
  const [repType, setRepType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const { myID, isLoggedIn } = useContext(UserContext);
  const { setOpenForm } = useContext(PopupContext);

  const pathID = useLocation().pathname.substring(12); // reads url after /reputation/ till the end

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (myID === undefined && pathID === "") {
      setRepInfo(undefined);
      return;
    }

    let searchUserID = 0;
    if (pathID === "") {
      searchUserID = myID;
    } else searchUserID = pathID;

    axios
      .get(`/api/reputation/${searchUserID}`)
      .then((res) => {
        if (res.data.info === "success") setRepInfo(res.data.rep);
        /*if (res.data.status === "invalid")*/ else setRepInfo("invalid");
      })
      .catch((err) => console.log(err));
  }, [myID, pathID]);

  if (repInfo !== undefined && repInfo !== "invalid")
    return (
      <>
        <form onSubmit={searchForUserRep}>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search users ..."
            className="rep-search-input"
          ></input>
        </form>

        <div className="reputation-topbar-field">
          <div className="rep-username">{repInfo.username}'s Reputation</div>

          <div className="rep-header-right">
            <div className="flex">
              <div className="rep-grade">{repInfo.grade}</div>
              <div className="rep-title-addrep-wrapper">
                <p className="rep-title">{repInfo.title}</p>
                {isLoggedIn ? (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/reputation/add/${repInfo.userId}`}
                  >
                    <button className="rep-addrep-button">
                      + Add reputation
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => setOpenForm(true)}
                    className="rep-addrep-button"
                  >
                    + Add reputation
                  </button>
                )}
              </div>
            </div>

            <div className="rep-ups-downs">
              <span className="rep-ups">+{repInfo.ups}</span>
              <span className="rep-middle"> </span>
              <span className="rep-downs">-{repInfo.downs}</span>
            </div>
          </div>
        </div>

        {repInfo.amount.all > 1 && <PageNumbers />}

        {repInfo.amount.all > 0 ? (
          <>
            {width > 800 ? (
              <section className="rep-inbetween-section">
                <div className="rep-inbetween-section-left">
                  <p style={{ marginLeft: "80px" }}>Created By</p>
                  <p style={{ marginLeft: "85px" }}>Date &#38; Time (UTC)</p>
                  <p style={{ marginLeft: "35px" }}>Feedback</p>
                </div>

                <div className="rep-inbetween-section-right">
                  {repInfo.amount.all > 0 && (
                    <button
                      onClick={() => {
                        setCurrentPage(1);
                        setRepType("all");
                      }}
                      style={repType === "all" ? { color: "#E7AA0F" } : null}
                    >
                      All ({repInfo.amount.all}) /&nbsp;
                    </button>
                  )}
                  {repInfo.amount.csgo > 0 && (
                    <button
                      onClick={() => {
                        setCurrentPage(1);
                        setRepType("csgo");
                      }}
                      style={repType === "csgo" ? { color: "#E7AA0F" } : null}
                    >
                      CSGO ({repInfo.amount.csgo}) /&nbsp;
                    </button>
                  )}
                  {repInfo.amount.rl > 0 && (
                    <button
                      onClick={() => {
                        setCurrentPage(1);
                        setRepType("rl");
                      }}
                      style={repType === "rl" ? { color: "#E7AA0F" } : null}
                    >
                      RL ({repInfo.amount.rl}) /&nbsp;
                    </button>
                  )}
                  {repInfo.amount.other > 0 && (
                    <button
                      onClick={() => {
                        setCurrentPage(1);
                        setRepType("other");
                      }}
                      style={repType === "other" ? { color: "#E7AA0F" } : null}
                    >
                      Other ({repInfo.amount.other})
                    </button>
                  )}
                </div>
              </section>
            ) : (
              <section className="rep-inbetween-section">
                <div className="rep-inbetween-section-left">
                  <p style={{ marginLeft: "59px" }}>Feedback</p>
                </div>

                <div className="rep-inbetween-section-category-wrapper">
                  <p>{repType}</p>
                  <div className="dropdownArrow"></div>
                </div>
              </section>
            )}

            <div className="all-reps-wrapper">
              <Reps />
            </div>
          </>
        ) : (
          <div className="noReputationMsg">
            <h2>User has no rep in the database.</h2>
            Be the 1st one to <span> </span>
            <Link
              to={`/reputation/add/${repInfo.userId}`}
              className="first-trade-text-button"
              id=""
            >
              add reputation
            </Link>
          </div>
        )}
      </>
    );
  else if (repInfo === "invalid")
    return (
      <div className="rep-noUserFound-container">
        <p>Whoops no user matches that ID :'(</p>
        <a id="removeDecoration" href="/reputation">
          &#8617; Back to my reputation
        </a>
      </div>
    );
  else if (isLoggedIn === false && pathID === "")
    return (
      <div className="rep-notLogged-in">
        <form onSubmit={searchForUserRep}>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search users ..."
            className="rep-search-input"
          ></input>
        </form>
        <p className="sign-in-to-receive-rep-text">
          You need an account to receive reputation
        </p>
        <p className="sign-in-to-begin-text">
          <span>Sign in</span> to begin
        </p>
        <p className="what-is-reputation-text">What is reputation?</p>
      </div>
    );
  else return null; // <Spinner className="newPosition">

  /*-----Functions                -------------*/

  function searchForUserRep(e) {
    e.preventDefault();

    axios
      .get(`/api/auth/getUserByUsername/${searchValue}`)
      .then((res) => {
        if (res.data.info === "success")
          window.location.href = `/reputation/${res.data.user._id}`;
      })
      .catch((err) => {
        if (err.response.data.info === "no user")
          createNotification(
            "error",
            "That user doesn't exist",
            "user doesn't exist"
          );
      });
  }

  function Reps() {
    const reps = repInfo.repsByGame[repType].map((rep, i) => {
      if (i >= currentPage * 17 - 17 && i <= currentPage * 17 - 1) {
        if (width > 800)
          return (
            <div className="rep-container noUserInteraction">
              <div
                className="rep-vote"
                style={
                  rep.good
                    ? { backgroundColor: "#2C8E54" }
                    : { backgroundColor: "#CE4646" }
                }
              >
                {rep.good ? "+ " : "- "}1
              </div>
              <p style={{ marginLeft: "19px", minWidth: "140px" }}>
                {rep.username}
              </p>
              <p style={{ minWidth: "130px" }}>{rep.createdAt}</p>
              <div style={{ width: width - 460 }} className="feedback-text">
                {rep.feedback}
              </div>
            </div>
          );
        else
          return (
            <div className="rep-container noUserInteraction">
              <div
                className="rep-vote-PHONEVIEW"
                style={
                  rep.good
                    ? { backgroundColor: "#2C8E54" }
                    : { backgroundColor: "#CE4646" }
                }
              >
                {rep.good ? "+ " : "- "}1
              </div>
              <div
                style={
                  width <= 650
                    ? { width: width - 110, marginLeft: "20px" }
                    : { width: width - 170, marginLeft: "20px" }
                }
                className="feedback-text"
              >
                {rep.feedback}
              </div>
            </div>
          );
      } else return null;
    });
    return reps;
  }

  function PageNumbers() {
    const pageButtons = [];
    const x = repInfo.amount[repType] / 17;
    const pageAmount = Number.isInteger(x) ? x : Math.floor(x + 1);

    const starting_number = () => {
      if (currentPage <= 5 || pageAmount <= 10) return 1;
      else if (currentPage + 5 >= pageAmount) return pageAmount - 9;
      else return currentPage - 5;
    };

    const ending_number = () => {
      if (pageAmount < 10) return pageAmount + 1;
      else return starting_number() + 10;
    };

    for (let i = starting_number(); i < ending_number(); i++)
      pageButtons.push(
        i === currentPage ? (
          <button className="pageButton highlighted-page">{i}</button>
        ) : (
          <button className="pageButton" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        )
      );

    return (
      <section className="page-numbers-field">
        <div
          onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
          className="page-left noUserInteraction"
        ></div>
        {pageButtons}
        <div
          onClick={() =>
            currentPage < pageAmount && setCurrentPage((prev) => prev + 1)
          }
          className="page-right noUserInteraction"
        ></div>
      </section>
    );
  }
}

export default Reputation;
