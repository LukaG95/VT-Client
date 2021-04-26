import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet";

import { createNotification } from "../../misc/ToastNotification";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { pathID } = useParams()

    return (
      <>

        <Helmet>
          <title>Reset password | VirTrade</title>
          <meta name="description" content="Reset password notice" />
          <link rel="canonical" href="http://virtrade.gg/password/reset" />
        </Helmet>

        <div className="resetPassWrapper">
          <form onSubmit={handleNewPassSubmit} className="resetPassForm">
            <div className="formItem">
              <p className="logFormText">New password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="logFormInput"
                value={password}
              ></input>
              <p className="formErrorMessage"></p>
            </div>

            <div className="formItem">
              <p className="logFormText">Confirm new password</p>
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="logFormInput"
                value={confirmPassword}
              ></input>
            </div>

            <button
              type="submit"
              style={{ marginTop: "15px" }}
              className="formItem loginNowButton"
            >
              Confirm new password
            </button>
          </form>
        </div>

      </>
    );

  /*-----Functions                -------------*/

  function handleNewPassSubmit(e) {
    e.preventDefault();

    if (password === "" || confirmPassword === "") return

    if (password.length < 6 || password.length > 30) {
      createNotification(
        "warning",
        "Password must be between 6 and 30 characters long",
        "password between 6 and 30"
      );
      return;
    } else if (
      !password.match(
        /^[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?a-zA-Z0-9]{4,30}$/gm
      )
    ) {
      createNotification(
        "warning",
        "Passwords contains inappropriate characters",
        "innapropriate characters"
      );
      return;
    } else if (password !== confirmPassword) {
      createNotification(
        "warning",
        "Passwords don't match",
        "pass don't match"
      );
      return;
    }

    axios
      .put("/api/auth/resetPassword", {
        code: pathID,
        password: password,
        passwordConfirm: confirmPassword,
      })
      .then((res) => {
        if (res.data.info === "blocked") {
          createNotification(
            "error",
            "Too many requests, please try again later",
            "Too many requests, please try again later"
          );
        } else if (res.data.info === "success") {
          setPassword("")
          setConfirmPassword("")
          createNotification(
            "success",
            "Your password has been changed",
            "Your password has been changed"
          );
          setTimeout(
            () =>
              createNotification(
                "info",
                "Redirecting in a few moments",
                "Redirecting in a few moments"
              ),
            200
          );
          setTimeout(() => (window.location.replace = "/"), 2500);
        } else
          createNotification(
            "error",
            "Oops, something went wrong...",
            "Oops, something went wrong..."
          );
      })
      .catch((err) => {});
  }
}

export default ResetPassword;
