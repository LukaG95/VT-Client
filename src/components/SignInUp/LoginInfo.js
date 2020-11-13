import React, { useState } from "react";
import axios from "axios";

import { createNotification } from "../../misc/ToastNotification";

function LoginInfo({ setForgotPassword, closeForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [keepMe, setKeepMe] = useState(false);

  const [unPassErrorMsg, setUnPassErrorMsg] = useState("");

  return (
    <div className="logForm-body">
      <form onSubmit={handleSubmit} className="loginHolder">
        <div className="formItem">
          <p className="logFormText">Username or Email</p>
          <input
            onClick={() => setUnPassErrorMsg("")}
            onChange={(e) => setUsername(e.target.value)}
            className="logFormInput"
            style={
              unPassErrorMsg !== ""
                ? { border: "1px solid rgb(255, 61, 61)" }
                : null
            }
            value={username}
            required
          ></input>
          <p className="formErrorMessage">{unPassErrorMsg}</p>
        </div>

        <div className="formItem">
          <p className="logFormText">Password</p>
          <input
            onClick={() => setUnPassErrorMsg("")}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="logFormInput"
            style={
              unPassErrorMsg !== ""
                ? { border: "1px solid rgb(255, 61, 61)" }
                : null
            }
            value={password}
            required
          ></input>
        </div>

        <div className="formItem keepMeSection">
          <div
            onClick={() => setKeepMe(!keepMe)}
            style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
          >
            <div className="keepMeButton">{keepMe && <p> &#10004; </p>}</div>
            <div className="keepMeText">Keep me logged in</div>
          </div>
          <p onClick={() => setForgotPassword(true)} className="forgotPassword">
            Forgot password?
          </p>
        </div>

        <button type="submit" className="formItem loginNowButton">
          Log in now
        </button>

        <div onClick={closeForm} className="formItem closeFormButton">
          Close
        </div>

        <div className="formItem orLoginWith">
          <hr />
          or log in with
          <hr />
        </div>

        <div className="formItem loginSteamAndDiscord">
          <div
            onClick={() => (window.location.href = "/api/auth/steam")}
            className="loginSteam"
          >
            <img
              src={require("../../images/other/SteamCircle.png")}
              alt=""
              style={{ marginRight: "10px" }}
            ></img>
            <p>STEAM</p>
          </div>

          <div
            onClick={() => (window.location.href = "/api/auth/discord")}
            className="loginDiscord"
          >
            <img
              src={require("../../images/other/DiscordLogo.png")}
              alt=""
              style={{ height: "28px", width: "35", marginRight: "8px" }}
            ></img>
            <p>DISCORD</p>
          </div>
        </div>
      </form>
    </div>
  );

  /*-----Functions                -------------*/

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("/api/auth/login", {
        email: username,
        password: password,
      })
      .then((res) => {
        console.log("POST /api/auth/login", res);

        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 429)
          createNotification(
            "error",
            "Too many requests, please try again later",
            "too many requests"
          );
        else if (
          err.response.data.info === "logorpass" ||
          err.response.data.info === "invalid credentials"
        )
          setUnPassErrorMsg("Wrong username or password");
        else
          createNotification(
            "error",
            "Oops, something went wrong...",
            "something went wrong"
          );
      });
  }
}

export default LoginInfo;
