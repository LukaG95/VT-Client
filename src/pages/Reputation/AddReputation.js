import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Filter from "bad-words";

import { createNotification } from "../../misc/ToastNotification";
import { UserContext } from "../../context/UserContext";
import {Helmet} from "react-helmet";

const profanityFilter = new Filter({ regex: /^\*|\.|$/gi });

function AddReputation() {
  const [repInfo, setRepInfo] = useState();

  const [repCategory, setRepCategory] = useState();
  const [feedback, setFeedback] = useState();
  const [repErrorMessage, setRepErrorMessage] = useState("");

  const { myID } = useContext(UserContext);
  const { pathID } = useParams()

  useEffect(() => {
    if (myID === undefined) return;

    axios
      .get(`/api/reputation/${pathID}`)
      .then((res) => {
        if (res.data.info === "success") setRepInfo(res.data.rep);
        else setRepInfo("invalid");
      })
      .catch((err) => {
        console.log(err);
        setRepInfo("invalid");
      });
  }, [myID, pathID]);

  if (repInfo !== undefined && repInfo !== "invalid")
    return (
      <>
        <Helmet>
          <title>Add Reputation to {repInfo.username} | VirTrade</title>
          <description>Add Reputation page contains user's reputation. You can add and review reputation here</description>
          <link rel="canonical" href="http://virtrade.gg/reputation/add" />
        </Helmet>

        <div className="reputation-topbar-field">
          <div className="rep-username">{repInfo.username}'s Reputation</div>

          <div className="rep-header-right">
            <div className="flex">
              <div className="rep-grade">{repInfo.grade}</div>
              <div className="rep-title-addrep-wrapper">
                <p className="rep-title">{repInfo.title}</p>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/reputation/${repInfo.userId}`}
                >
                  <button className="rep-addrep-button">Full reputation</button>
                </Link>
              </div>
            </div>

            <div className="rep-ups-downs">
              <span className="rep-ups">+{repInfo.ups}</span>
              <span className="rep-middle"> </span>
              <span className="rep-downs">-{repInfo.downs}</span>
            </div>
          </div>
        </div>

        <div className="rep-category-buttons">
          <button
            style={repCategory === "rl" ? { background: "#47384D" } : null}
            onClick={() => {
              setRepCategory("rl");
              if (repErrorMessage === "You have to pick a rep category 1st")
                setRepErrorMessage("");
            }}
          >
            Rocket League
          </button>
          <button
            style={repCategory === "csgo" ? { background: "#47384D" } : null}
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
                ? { background: "#47384D", marginRight: "0px" }
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

        <p className="repErrorText">{repErrorMessage}</p>

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
  else return null; // <Spinner className="newPosition">

  /*-----Functions                -------------*/

  function handleRepSubmit(good_bad) {
    if (myID === pathID) {
      setRepErrorMessage("You can't rep yourself");
      createNotification("error", "You can't rep yourself", "rep yourself");
      return;
    }

    if (repCategory === undefined) {
      setRepErrorMessage("You have to pick a rep category 1st");
      createNotification(
        "error",
        "Pick a rep category 1st",
        "pick category 1st"
      );
      return;
    }

    if (feedback === undefined || feedback.replace(/\s/g, "").length < 5) {
      setRepErrorMessage("Your message has to be at least 5 characters long");
      createNotification(
        "error",
        "Your message has to be at least 5 characters long",
        "5 char long message"
      );
      return;
    }

    if (feedback.length > 300) {
      setRepErrorMessage("Your message is too long, max 300 characters");
      createNotification(
        "error",
        "Your message is too long",
        "message too long"
      );
      return;
    }

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
}

export default AddReputation;
