import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Filter from "bad-words";

import useWindowDimensions from "../../misc/windowHW";
import { PopupContext } from "../../context/PopupContext";
import { createNotification } from "../../misc/ToastNotification";
import { UserContext } from "../../context/UserContext";
import {Helmet} from "react-helmet";
import repTitle from "../../constants/repTitle"
import {Categories} from "../../constants/Categories/Categories"
import useUserSearch from "./useUserSearch"
import Dropdown from "../../components/Dropdown";
import styles from "./AddReputation.module.scss"

const profanityFilter = new Filter({ regex: /^\*|\.|$/gi });

function AddReputation() {
  const [repInfo, setRepInfo] = useState();

  const [repCategory, setRepCategory] = useState("Rocket League");
  const [feedback, setFeedback] = useState();
  const [repErrorMessage, setRepErrorMessage] = useState("");
  const [search, setSearch] = useState({
    open: false,
    text: ""
  })

  const { myID, user, isLoggedIn } = useContext(UserContext);
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
   
  }, []);

  useEffect(() => {
    if (myID === undefined) return;

    axios
      .get(`/api/reputation/${pathID}`)
      .then((res) => { 
        if (res.data.info === "success") setRepInfo(res.data.rep);
        else setRepInfo("invalid");
      })
      .catch((err) => {
        setRepInfo("invalid");
      });
  }, [myID, pathID]);

  if (repInfo !== undefined && repInfo !== "invalid")
    return (
      <div className="rep-wrapper">
        <Helmet>
          <title>Add Reputation to {repInfo.username} | VirTrade</title>
          <description>Add Reputation page contains user's reputation. You can add and review reputation here</description>
          <link rel="canonical" href="http://virtrade.gg/reputation/add" />
        </Helmet>

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
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/reputation/${repInfo.userId}`}
                  >
                    <button className="rep-addrep-button">
                      View reputation
                    </button>
                  </Link>
                <div className="filler" style={{marginLeft: "3px"}}></div>
              </div>
            <div className="rep-choose-category">
              <Dropdown
                name="Choose category"
                value={repCategory}
                items={Object.keys(Categories).map(c => Categories[c])}
                className={styles.dropdown}
                onChange={(c) => setRepCategory(c) }
                floating
              />
              <div className="filler" style={{marginLeft: "3px"}}></div>
            </div>
            
          </div>

          {/*
          <div className="filler" style={{marginLeft: "3px", height: "auto"}}></div>
          */}
          
        </div>

      {/*
        <div className="rep-category-buttons">
          <button
            style={repCategory === "rl" ? { background: "#1d191f" } : null}
            onClick={() => {
              setRepCategory("rl");
              if (repErrorMessage === "You have to pick a rep category 1st")
                setRepErrorMessage("");
            }}
          >
            Rocket League
          </button>
          <button
            style={repCategory === "csgo" ? { background: "#1d191f" } : null}
            onClick={() => {
              setRepCategory("csgo");
              if (repErrorMessage === "You have to pick a rep category 1st")
                setRepErrorMessage("");
            }}
          >
            CSGO
          </button>
          <button
            style={
              repCategory === "other"
                ? { background: "#1d191f", marginRight: "0px" }
                : { marginRight: "0px" }
            }
            onClick={() => {
              setRepCategory("other");
              if (repErrorMessage === "You have to pick a rep category 1st")
                setRepErrorMessage("");
            }}
          >
            Other
          </button>
        </div>
        */}

        <textarea
          onChange={(e) => {
            setFeedback(e.target.value);
            if (
              repErrorMessage !== "You can't rep yourself" &&
              repErrorMessage !== "You have to pick a rep category 1st"
            )
              setRepErrorMessage("");
          }}
          placeholder="Add a comment..."
          className="rep-comment-input"
          value={feedback}
        />

        <div className="add-rep-bottom">
          
          <div className="complete-rep-buttons-section">
            <button onClick={() => handleRepSubmit(true)} className="rep-button">
              Complete as positive
            </button>
            <button
              onClick={() => handleRepSubmit(false)}
              className="rep-button negative"
              style={{ marginRight: "0px" }}
            >
              Complete as negative
            </button>
            {/*<button className="rep-button-back">Back to reputation</button>*/}
          </div>
          <div className="filler"></div>
        </div>

        <p className="repErrorText">{repErrorMessage}</p>

      </div>
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
  else return null; // <Spinner className="newPosition">

  /*-----Functions                -------------*/

  function handleRepSubmit(good_bad) {

    //Check if repping yourself
    if (myID === pathID) {
      setRepErrorMessage("You can't rep yourself");
      createNotification("error", "You can't rep yourself", "rep yourself");
      return;
    }
    //Check category
    if (repCategory === undefined) {
      setRepErrorMessage("You have to pick a rep category 1st");
      createNotification(
        "error",
        "Pick a rep category 1st",
        "pick category 1st"
      );
      return;
    }
    //Check feedback
    if (feedback === undefined || feedback.replace(/\s/g, "").length < 5) {
      setRepErrorMessage("Your message has to be at least 5 characters long");
      createNotification(
        "error",
        "Your message has to be at least 5 characters long",
        "5 char long message"
      );
      return;
    }
    //Check feedback2
    if (feedback.length > 300) {
      setRepErrorMessage("Your message is too long, max 300 characters");
      createNotification(
        "error",
        "Your message is too long",
        "message too long"
      );
      return;
    }
    //Check feedback3
    if (
      !feedback.match(
        /^[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?a-zA-Z0-9 ]{5,100}$/gm
      )
    ) {
      setRepErrorMessage("Your message includes inappropriate characters");
      createNotification(
        "error",
        "Your message includes inappropriate characters",
        "innapropriate characters"
      );
      return;
    }
    //Check feedback4
    if (
      feedback.match(
        /\b(?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+(?:[-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/.*)?\b/gm
      )
    ) {
      setRepErrorMessage("Your message must not inlcude links");
      createNotification(
        "error",
        "Your message must not include links",
        "must not include links"
      );
      return;
    }

    //Check activated account
    if (!user.activatedAccount){
      createNotification("error", "Confirm your email before adding reputation", "Confirm your email before adding reputation", "/account/settings/email");
    }

    axios
      .post(`/api/reputation/addRep/${pathID}`, {
        good: good_bad,
        category: repCategory,
        feedback: profanityFilter.clean(feedback),
      })
      .then((res) => {  
        if (res.data.info === "success") {
          setFeedback("");
          setRepCategory();
          setRepErrorMessage("");
          createNotification(
            "success",
            "Reputation was submitted",
            "rep submited"
          );
        } 
      })
      .catch((res) => {
        if (res.response.data.info === "hours24") {
          setRepErrorMessage(
            "You can only leave a rep for the same person once in 24 hours"
          );
          createNotification(
            "error",
            `You have already repped ${repInfo.username}`,
            "already repped"
          );
        }
      });
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
}

export default AddReputation;
