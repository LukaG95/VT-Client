import React, { useState } from "react";
import axios from "axios";
import Filter from "bad-words";

import { createNotification } from "../../App";

const profanityFilter = new Filter({ regex: /^\*|\.|$/gi });

function SignUpInfo({ closeForm }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const [readAndAgreed, setReadAndAgreed] = useState(false);

  return (
    <div className="logForm-body">
      <form onSubmit={handleSubmit} className="loginHolder">
        <div className="formItem">
          <p className="logFormText">Username</p>
          <input
            onClick={() => setUsernameErrorMsg("")}
            onChange={(e) => setUsername(e.target.value)}
            className="logFormInput"
            style={
              usernameErrorMsg !== ""
                ? { border: "1px solid rgb(255, 61, 61)" }
                : null
            }
            value={username}
            required
          ></input>
          <p className="formErrorMessage">{usernameErrorMsg}</p>
        </div>

        <div className="formItem">
          <p className="logFormText">Email</p>
          <input
            type="email"
            onClick={() => setEmailErrorMsg("")}
            onChange={(e) => setEmail(e.target.value)}
            className="logFormInput"
            style={
              emailErrorMsg !== ""
                ? { border: "1px solid rgb(255, 61, 61)" }
                : null
            }
            value={email}
            required
          ></input>
          <p className="formErrorMessage">{emailErrorMsg}</p>
        </div>

        <div className="formItem">
          <p className="logFormText">Password</p>
          <input
            type="password"
            onClick={() => {
              setPasswordErrorMsg("");
            }}
            onChange={(e) => setPassword(e.target.value)}
            className="logFormInput"
            style={
              passwordErrorMsg !== ""
                ? { border: "1px solid rgb(255, 61, 61)" }
                : null
            }
            value={password}
            required
          ></input>
          <p className="formErrorMessage">{passwordErrorMsg}</p>
        </div>

        <div className="formItem">
          <p className="logFormText">Confirm password</p>
          <input
            type="password"
            onClick={() => {
              setPasswordErrorMsg("");
            }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="logFormInput"
            style={
              passwordErrorMsg === "Passwords don't match"
                ? { border: "1px solid rgb(255, 61, 61)" }
                : null
            }
            value={confirmPassword}
            required
          ></input>
        </div>

        <div className="formItem keepMeSection">
          <div
            onClick={(e) =>
              e.target.nodeName !== "A" && setReadAndAgreed(!readAndAgreed)
            }
            style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
          >
            <div className="keepMeButton">
              {readAndAgreed && <p> &#10004; </p>}
            </div>
            <div className="keepMeText">
              I have read and agreed to
              <a style={{ color: "#2297D9" }} href="/terms">
                Terms of service
              </a>
            </div>
          </div>
        </div>

        <button type="submit" className="formItem loginNowButton">
          Sign Up
        </button>

        <div onClick={closeForm} className="formItem closeFormButton">
          Close
        </div>
      </form>
    </div>
  );

  /*-----Functions                -------------*/

  function handleSubmit(e) {
    e.preventDefault();

    if (username.replace(/\s/g, "").length < 2 || username.length > 15) {
      setUsernameErrorMsg("Username must be between 2 and 15 characters long");
      return;
    } else if (!username.match(/^(?!.*[ ]{2,})[a-zA-Z0-9 _-]{2,15}$/gm)) {
      setUsernameErrorMsg(
        "Username can only contain characters a-z, 0-9, or '- _'"
      );
      return;
    } else if (profanityFilter.isProfane(username)) {
      setUsernameErrorMsg("Username contains innapropriate words");
      return;
    }
    if (password.length < 6 || password.length > 30) {
      setPasswordErrorMsg("Password must be between 6 and 30 characters long");
      return;
    } else if (
      !password.match(
        /^[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?a-zA-Z0-9]{6,30}$/gm
      )
    ) {
      setPasswordErrorMsg("Passwords contains inappropriate characters");
      return;
    } else if (password !== confirmPassword) {
      setPasswordErrorMsg("Passwords don't match");
      return;
    } else if (!readAndAgreed) {
      createNotification(
        "warning",
        "Agree to Terms of service",
        "terms of service"
      );
      return;
    }

    axios
      .post("/api/auth/signup", {
        username: username,
        email: email,
        password: password,
        passwordConfirm: confirmPassword,
      })
      .then((res) => {
        console.log("POST /api/auth/signup", res);

        createNotification(
          "success",
          "You have signed up",
          "you have signed up"
        );
        setTimeout(() => {
          createNotification(
            "info",
            "Check your email for a confirmation link",
            "confirmation link"
          );
        }, 2000);
      })
      .catch((err) => {
        if (err.response.status === 429)
          createNotification(
            "error",
            "Too many requests, please try again later",
            "too many requests"
          );
        else if (err.response.data.info === "username")
          setUsernameErrorMsg("Username is taken");
        else if (err.response.data.info === "email")
          setEmailErrorMsg("Email is already in use");
        else
          createNotification(
            "error",
            "Oops, something went wrong...",
            "something went wrong"
          );
      });
  }
}

export default SignUpInfo;
