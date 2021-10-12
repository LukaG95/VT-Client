import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../../context/UserContext";
import { PopupContext } from "../../context/PopupContext";
import useWindowDimensions from "../../misc/windowHW";
import { RepCategories } from "../../constants/RepCategories"
import useUserSearch from "./useUserSearch"
import pageNumbers from "../../components/pageNumbers"
import repTitle from "../../constants/repTitle"
import {Helmet} from "react-helmet";
import { createNotification } from "../../misc/ToastNotification";

function Reputation() {
  const [repInfo, setRepInfo] = useState();
  const [repType, setRepType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("big")
  const [openCategories, setOpenCategories] = useState(false)

  const [search, setSearch] = useState({
    open: false,
    text: ""
  })
 
  const { myID, isLoggedIn } = useContext(UserContext);
  const { setOpenForm, setOpenRepLeaderboards} = useContext(PopupContext);

  const { pathID } = useParams()
  const { width } = useWindowDimensions();
  const { users } = useUserSearch(search.text)

  const ref = useRef();

  function onClick(e) {

    if (!ref.current || !ref.current.contains(e.target))
      setSearch(prev=>  ({ ...prev, open: false }));
    else if (e.target.tagName === "INPUT")
      setSearch(prev=>  ({ ...prev, open: true }));
  }

  useEffect(() => {
    window.addEventListener("click", onClick);
    const checkingFocus = setInterval(()=> {if (!document.hasFocus()) setSearch(prev=>  ({ ...prev, open: false }));}, 300);

    return () => {
      window.removeEventListener("click", onClick);
      clearInterval(checkingFocus)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (width > 800){
      setView("big")
    } else{
      setView("small")
      setOpenCategories(false)
    }

  }, [width]);

  useEffect(() => {
    if (myID === undefined && !pathID) {
      setRepInfo(undefined);
      return;
    }

    let searchUserID = 0;
    if (!pathID) {
      searchUserID = myID;
    } else searchUserID = pathID;

    axios
      .get(`/api/reputation/${searchUserID}`)
      .then((res) => {
        if (res.data.info === "success") 
          setRepInfo(res.data.rep);
  
      })
      .catch(res => {
          setRepInfo("invalid")
      });
  }, [myID, pathID]);


  if (repInfo !== undefined && repInfo !== "invalid")
    return (
      <div className="rep-wrapper">
      {helmet()}

        <div className="rep-header">
          <div className="rep-header-left">
            <div className="rep-search-field-and-button">
              {searchInput()}
              {
                width > 800 && 
                  <div className="showLeaderboardsButton" onClick={()=> setOpenRepLeaderboards(true)}>
                    <div className="gg-trophy"></div>
                  </div>
              }
            </div>

            <div className="rep-username">{repInfo.username}'s Reputation</div>

            <div className="rep-title">{repTitle(repInfo.ups)}</div>

          </div>

          <div className="rep-header-right">
            {width > 915 && <div className="rep-filler" style={{marginBottom: "3px"}}></div>}
            
              <div className="right-middle">
                <div className="rep-grade-wrapper">
                  <div className="rep-grade">{repInfo.grade}</div>
                </div>
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
                <div className="filler" style={{marginLeft: "3px"}}></div>
              </div>
            <div className="rep-page-numbers">{pageNumbers(currentPage, pageAmount(), setCurrentPage, repInfo.amount.all)}</div>
          </div>

          {/*
          <div className="filler" style={{marginLeft: "3px", height: "auto"}}></div>
          */}
          
        </div>

        {/*
          {repInfo.amount.all > 0 && pageNumbers(currentPage, pageAmount(), setCurrentPage)}
        */}

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
                  {Categories()}
                </div>
              </section>
            ) : (
              <>
                <section 
                  style={ openCategories ? 
                    {visibility: "visible", height: "25px", marginBottom: "10px"} 
                      : 
                    {visibility: "hidden", height: "0px"}} 
                  className="rep-inbetween-section-right"
                >
                  {Categories()}
                </section>

                <section className="rep-inbetween-section">
                  <div className="rep-inbetween-section-left">
                    <p style={{ marginLeft: "59px" }}>Feedback</p>
                  </div>

                  <div onClick={()=> setOpenCategories(prev => !prev)} className="rep-inbetween-section-category-wrapper">
                    <p>Categories</p>
                    <div className="dropdownArrow"></div>
                  </div>
                </section>
              </>
            )}

            <div className="all-reps-wrapper">
              <Reps />
            </div>
          </>
        ) : (
          <div className="noTrades">
            {/* <NoReputationIcon style={{ width: "150px", height: "150px"}} /> */}
            <p>User has no rep in the database.<br />
            Be the 1st one to <span> </span>
            
            {isLoggedIn ? (
                  <Link
                  to={`/reputation/add/${repInfo.userId}`}
                  className="first-trade-text-button"
                >
                  add reputation
                </Link>
                ) : (
                  <span
                    onClick={() => setOpenForm(true)}
                    className="first-trade-text-button"
                  >
                    add reputation
                  </span>
                )}

            </p> 
          </div>
        )}
      </div>
    );
  else if (repInfo === "invalid")
    return (
      <>
        {helmet()}

        <div className="rep-noUserFound-container">
          <p>Whoops no user matches that ID :'(</p>
          <a id="removeDecoration" href="/reputation">
            &#8617; Back to my reputation
          </a>
        </div>
      </>
    );
  else if (isLoggedIn === false && !pathID)
    return (
      <>
        {helmet()}

        <div className="rep-notLogged-in">
          {searchInput(true)}
          <p className="sign-in-to-receive-rep-text">
            You need an account to receive reputation
          </p>
          <p className="sign-in-to-begin-text">
            <span onClick={() => setOpenForm(true)}>Sign in</span> to begin
          </p>
          <Link to="/rules/reputation" className="what-is-reputation-text">What is reputation?</Link>
        </div>
      </>
    );
  else return <>{helmet()}</>; // <Spinner className="newPosition">

  /*-----Functions                -------------*/



  function Categories(){
    let count = 0

    RepCategories.forEach(cat => {
      let category = cat.toLowerCase()
      if (repInfo.amount[category] > 0)
        count ++
    })

    return RepCategories.map((cat, i) => {
      let category = cat.toLowerCase()
      if (repInfo.amount[category] > 0){
        count --
        return (
          <button
            onClick={() => {
              setCurrentPage(1);
              setRepType(category);
            }}
            style={repType === category ? { color: "#FE3B3B" } : null}
          >
            {cat} ({repInfo.amount[category]}) {count === 0 ? <span>&nbsp;</span> : <span>/&nbsp;</span>}
         </button>
        )
      }
    })

  }

  function Reps() {
    const reps = repInfo.repsByGame[repType].map((rep, i) => {
      if (i >= currentPage * 17 - 17 && i <= currentPage * 17 - 1) {
        if (view === "big")
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
                {rep.createdBy.username}
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

  function pageAmount() {
    const x = repInfo.amount[repType] / 17;
    return Number.isInteger(x) ? x : Math.floor(x + 1);
  }

  function inputStyle(){

    if (search.open && search.text !== "")
      return {borderRadius: "5px 5px 0px 0px", border: "1px solid #4f4453", borderBottom: "none", paddingBottom: "1px", paddingLeft: "8px"} 
    else if (search.open)
      return {border: "1px solid #4f4453", borderBottom: "1px solid #4f4453", paddingLeft: "8px"} 
    else 
      return {borderRadius: "5px"} 
  }

  function searchForUserRep(e, search) {
    e.preventDefault();
  
    axios
      .get(`/api/auth/getUserByUsername/${search.text}`)
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

  function searchInput(x){
    return (
      <form onSubmit={e=> searchForUserRep(e, search)} ref={ref} className="rep-form" style={x ? {marginTop: "15px", width: "400px"} : {}}>
        <input
          onChange={(e) => setSearch({...search, text: e.target.value})}
          placeholder="Search users ..."
          className="rep-search-input"
          value={search.text}
          style={inputStyle()}
        ></input>
        {
          search.open && search.text !== "" && 
            <div className="rep-search-dropdown">
              <p>Results: {users.length}</p>
              {users.map(user => <Link to={`/reputation/${user._id}`} onClick={()=> setSearch(prev=>  ({ ...prev, text: user.username, open: false }))} className="">{user.username}</Link>)}
              {users.length > 0 && <div name="spacer" style={{minHeight: "5px"}}></div>}
            </div>
        }
      </form>
    )
  }

  function helmet(){
    return(
      <Helmet>
        <title>Reputation | VirTrade</title>
        <description>Reputation page contains user's reputation. You can add and review reputation here</description>
        <link rel="canonical" href="http://virtrade.gg/reputation" />
      </Helmet>
    )
  }
}

export default Reputation;
