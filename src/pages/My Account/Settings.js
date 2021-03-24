import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Filter from "bad-words";

import Topbar from "./Topbar";
import { UserContext } from "../../context/UserContext";
import { createNotification } from "../../misc/ToastNotification";
import useWindowDimensions from '../../misc/windowHW'
import Platforms from "./Platforms"
import {Helmet} from "react-helmet";

const profanityFilter = new Filter({ regex: /^\*|\.|$/gi });

function MyAccount() {
  const [sidebarChoice, setSidebarChoice] = useState("Username");

  const [view, setView] = useState()

  const [currentUsername, setCurrentUsername] = useState();
  const [newUsername, setNewUsername] = useState("");

  const [currentEmail, setCurrentEmail] = useState();
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");

  const [password, setPassword] = useState("aaaaaaaaaaaaaaaa");
  const [newPass, setNewpass] = useState("");
  const [newPass2, setNewpass2] = useState("");

  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passErrorMsg, setPassErrorMsg] = useState("");
  const [newPassErrorMsg, setNewPassErrorMsg] = useState("");
  const [newPass2ErrorMsg, setNewPass2ErrorMsg] = useState("");

  const { username, email } = useContext(UserContext);

  const { width } = useWindowDimensions()

  let chosenSidebarStyle = {
    border: "1px solid rgba(0, 0, 0, 0.8)",
    paddingTop: "17px",
    paddingLeft: "35px",
    backgroundColor: "#141115",
    color: "#f6f6f6",
  };

  useEffect(() => {
    if (width > 1065){
      resetStyles()
      setView("big")
    } else
      setView("small")

  }, [width]);

  useEffect(() => {
    setCurrentUsername(username);
    setCurrentEmail(email);

  }, [username, email]);

  return (
    <>
      <Helmet>
        {username ? <title>{username} | VirTrade</title> : <title></title>}
        <description>Profile page contains all user settings. Link your platforms, change your credentials and more</description>
        <link rel="canonical" href="http://virtrade.gg/account/settings" />
      </Helmet>

      <Topbar />

      <div className="account-settings-wrapper">
        <div className="account-settings-sidebar" id="account-sidebar">
          <div
            onClick={() => {
              setSidebarChoice("Username")
              if (view === "small") show2ndPage()
            }}
            style={sidebarChoice === "Username" && view === "big" ? chosenSidebarStyle : null}
          >
            Username
          </div>
          <div
            onClick={() => {
              setSidebarChoice("Password")
              if (view === "small")  show2ndPage()
            }}
            style={sidebarChoice === "Password" && view === "big" ? chosenSidebarStyle : null}
          >
            Password
          </div>
          <div
            onClick={() => {
              setSidebarChoice("Email")
              if (view === "small")  show2ndPage()
            }}
            style={sidebarChoice === "Email" && view === "big" ? chosenSidebarStyle : null}
          >
            Email
          </div>
          <div
            onClick={() => {
              setSidebarChoice("Platforms")
              if (view === "small")  show2ndPage()
            }}
            style={sidebarChoice === "Platforms" && view === "big" ? chosenSidebarStyle : null}
          >
            Platforms
          </div>
        </div>

        <div className="account-settings-main" id="account-main">
          {sidebarChoice === "Username" && Username()}
          {sidebarChoice === "Password" && Password()}
          {sidebarChoice === "Email" && Email()}
          {sidebarChoice === "Platforms" && Platforms(view)}
        </div>
      </div>
      
    </>
  );

  /*-----Functions                -------------*/

  function handleUpdateUsername(e) {
    e.preventDefault();

    if (username === newUsername) return;

    if (newUsername.replace(/\s/g, "").length < 2 || newUsername.length > 15) {
      setUsernameErrorMsg("Username must be between 2 and 15 characters long");
      return;
    } else if (!newUsername.match(/^(?!.*[ ]{2,})[a-zA-Z0-9 _-]{2,15}$/gm)) {
      setUsernameErrorMsg(
        "Username can only contain characters a-z, 0-9, or '- _'"
      );
      return;
    } else if (profanityFilter.isProfane(newUsername)) {
      setUsernameErrorMsg("Username contains innapropriate words");
      return;
    }

    // server request for username update
    axios
      .put(`/api/auth/updateUsername`, {
        newUsername: newUsername,
      })
      .then((res) => {
        if (res.data.status === "success") {
          createNotification(
            "success",
            "You have updated your username",
            "update username"
          );
        } else if (res.data.status === "username") {
          setUsernameErrorMsg("Username is taken");
        } else if (res.data.status === "days30") {
          setUsernameErrorMsg(
            "You can only change your username once per month"
          );
        } else
          createNotification(
            "error",
            "Oops something went wrong...",
            "something went wrong"
          );
      })
      .catch((err) => console.log(err));
  }

  function handleUpdatePassword(e) {
    e.preventDefault();

    if (password === "" || newPass === "" || newPass2 === "") {
      if (password === "") setPassErrorMsg("Please fill this field");
      if (newPass === "") setNewPassErrorMsg("Please fill this field");
      if (newPass2 === "") setNewPass2ErrorMsg("Please fill this field");
      return;
    } else if (newPass !== newPass2) {
      setNewPass2ErrorMsg("Passwords don't match");
      return;
    } else if (newPass.length < 6 || password.length > 30) {
      setNewPassErrorMsg("Password must be between 6 and 30 characters long");
      return;
    } else if (
      !newPass.match(/^[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?a-zA-Z0-9]{6,30}$/gm)
    ) {
      setNewPassErrorMsg("Password contains inappropriate characters");
      return;
    }

    // server request for password upate
    axios
      .put(`/api/auth/updatePassword`, {
        password: password,
        newPassword: newPass,
        passwordConfirm: newPass2,
      })
      .then((res) => {
        if (res.data.info === "success") {
          createNotification(
            "success",
            "Password was updated",
            "password updated"
          );
          setPassword("aaaaaaaaaaaaaaaa");
          setNewpass("");
          setNewpass2("");
        } else if (res.data.info === "wrongpass") {
          setPassErrorMsg("Current password doesn't match");
          createNotification(
            "error",
            "Current password doesn't match",
            "password missmatch"
          );
        } else
          createNotification(
            "error",
            "Oops something went wrong...",
            "something went wrong"
          );
      })
      .catch((err) => {
        console.log(err);
        createNotification(
          "error",
          "Oops something went wrong...",
          "something went wrong"
        );
      });
  }

  function handleUpdateEmail(e) {
    e.preventDefault();

    if (email === newEmail) return;

    if (newEmail !== confirmNewEmail) {
      setEmailErrorMsg("Emails don't match");
      return;
    }

    // server request for email update
    axios
      .post(`/api/auth/sendResetEmailToken`, {
        newEmail: newEmail,
      })
      .then((res) => {
        if (res.data.status === "success")
          createNotification(
            "success",
            "Success! Check your email for a confirmation link",
            "confirmation link"
          );
        else
          createNotification(
            "error",
            "Oops something went wrong...",
            "something went wrong 2"
          );
      })
      .catch((err) => console.log(err));
  }

  function Username() {
    return (
      <div className="account-username-container">
        {view === "small" && <div className="backArrow" onClick={()=> show1stPage()}>&#10140;</div>}
        <h3 className="acSettings-username-text">Username</h3>
        <h1 className="acSettings-currentUsername">{currentUsername}</h1>

        <p>
          <span style={{ color: "#C33030" }}>!warning</span> you can only change
          your username once every 30 days
        </p>
        <form onSubmit={(e) => handleUpdateUsername(e)}>
          <input
            required
            id="usernameInput"
            type="text"
            placeholder="New username..."
            style={
              usernameErrorMsg !== ""
                ? { border: "1px solid rgb(255, 61, 61)" }
                : null
            }
            defaultValue={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            onClick={(e) => {
              setUsernameErrorMsg("");
              e.target.focus();
            }}
          />
          <p id="accountUnError">{usernameErrorMsg}</p>
          <button>Update username</button>
        </form>
      </div>
    );
  }

  function Password() {
    return (
      <div className="account-password-container">
        <div className="center-align">
          {view === "small" && <div className="backArrow" onClick={()=> show1stPage()}>&#10140;</div>}
          <h1 className="acSettings-currentUEmail">Current password</h1>
        </div>
        <form onSubmit={(e) => handleUpdatePassword(e)}>
          <input
            style={
              passErrorMsg !== ""
                ? { border: "1px solid rgb(255, 61, 61)" }
                : null
            }
            id="passwordInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={(e) => {
              setPassErrorMsg("");
              e.target.focus();
            }}
          />
          <p id="currentPassError">{passErrorMsg}</p>

          <p style={{ marginTop: "50px" }}>New Password</p>
          <input
            style={
              newPassErrorMsg !== ""
                ? { border: "1px solid rgb(255, 61, 61)" }
                : null
            }
            id="passwordInput"
            type="password"
            placeholder="New Password..."
            value={newPass}
            onChange={(e) => setNewpass(e.target.value)}
            onClick={(e) => {
              setNewPassErrorMsg("");
              e.target.focus();
            }}
          />
          <p id="newPassError">{newPassErrorMsg}</p>

          <p style={{ marginTop: "10px" }}>Confirm New Password</p>
          <input
            style={
              newPass2ErrorMsg !== ""
                ? { border: "1px solid rgb(255, 61, 61)", marginTop: "10px" }
                : { marginTop: "10px" }
            }
            id="passwordInput"
            type="password"
            placeholder="Confirm New Password..."
            value={newPass2}
            onChange={(e) => setNewpass2(e.target.value)}
            onClick={(e) => {
              setNewPass2ErrorMsg("");
              e.target.focus();
            }}
          />
          <p id="NewPassError2">{newPass2ErrorMsg}</p>

          <p id="accountEmailError">{emailErrorMsg}</p>
          <button>Update Password</button>
        </form>
      </div>
    );
  }

  function Email() {
    return (
      <div className="account-email-container">
        {console.log("I've ran 2")}
        <div className="center-align">
        {view === "small" && <div className="backArrow" onClick={()=> show1stPage()}>&#10140;</div>}
        <h1 className="acSettings-currentUEmail">Current Email</h1>
        </div>
        <h3 className="acSettings-email-text">{currentEmail}</h3>

        <form onSubmit={(e) => handleUpdateEmail(e)}>
          <p>New Email</p>
          <input
            style={
              emailErrorMsg !== ""
                ? { border: "1px solid rgb(255, 61, 61)" }
                : null
            }
            required
            id="emailInput"
            type="email"
            placeholder="New Email..."
            defaultValue={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            onClick={(e) => {
              setEmailErrorMsg("");
              e.target.focus();
            }}
          />

          <p style={{ marginTop: "10px" }}>Confirm New Email</p>
          <input
            style={
              emailErrorMsg !== ""
                ? { border: "1px solid rgb(255, 61, 61)", marginTop: "10px" }
                : { marginTop: "10px" }
            }
            required
            id="emailInput"
            type="email"
            placeholder="Confirm New Email..."
            defaultValue={confirmNewEmail}
            onChange={(e) => setConfirmNewEmail(e.target.value)}
            onClick={(e) => {
              setEmailErrorMsg("");
              e.target.focus();
            }}
          />

          <p id="accountEmailError">{emailErrorMsg}</p>

          <p style={{ fontSize: "14px", marginTop: "30px" }}>
            <span style={{ color: "#34CEFF" }}>!info</span> we will send a
            confirmation link to the new email
          </p>
          <button>Update email</button>
        </form>
      </div>
    );
  }

  // phone view
  function show1stPage(){
    document.getElementById("account-sidebar").style.minWidth = "100%"
    document.getElementById("account-sidebar").style.maxWidth = "100%"
    document.getElementById("account-main").style.width = "0px"
    document.getElementById("account-main").style.marginLeft = "0px"
  }

  function show2ndPage(){
    document.getElementById("account-sidebar").style.minWidth = "0px"
    document.getElementById("account-sidebar").style.maxWidth = "0px"
    document.getElementById("account-main").style.width = "100%"
    document.getElementById("account-main").style.marginLeft = "0px"
  }

  function resetStyles(){
    document.getElementById("account-sidebar").style.minWidth = ""
    document.getElementById("account-sidebar").style.maxWidth = ""
    document.getElementById("account-main").style.width = ""
    document.getElementById("account-main").style.marginLeft = ""
  }
}

export default MyAccount;
