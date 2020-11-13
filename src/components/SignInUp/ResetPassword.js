import React, { useState, useContext } from "react";
import { useLocation, Redirect } from "react-router-dom";
import axios from "axios";

import { createNotification } from "../../App";
import { UserContext } from "../../context/UserContext";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isLoggedIn } = useContext(UserContext);

  const pathID = useLocation().pathname.substring(16); // reads url after /password/reset/ till the end

  if (isLoggedIn === false)
    return (
      <div className="resetPassWrapper">
        <form onSubmit={handleNewPassSubmit} className="resetPassForm">
          <div className="formItem">
            <p className="logFormText">New password</p>
            <input
              required
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
              required
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
    );
  else if (isLoggedIn === true) return <Redirect to="/" />;
  else return null;

  /*-----Functions                -------------*/

  function handleNewPassSubmit(e) {
    e.preventDefault();

    if (password.length < 6 || password.length > 30) {
      createNotification(
        "warning",
        "Password must be between 6 and 30 characters long",
        "password between 6 and 30"
      );
      return;
    } else if (
      !password.match(
        /^[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?a-zA-Z0-9]{4,30}$/gm
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
        console.log(res);
        if (res.data.status === "blocked") {
          createNotification(
            "error",
            "Too many requests, please try again later",
            "too many requests"
          );
        } else if (res.data.status === "success") {
          createNotification(
            "success",
            "Your password has been changed",
            "pass has been changed"
          );
          setTimeout(
            () =>
              createNotification(
                "info",
                "Redirecting in a few moments",
                "redirecting in a few"
              ),
            1500
          );
          setTimeout(() => (window.location.href = "/"), 4000);
        } else
          createNotification(
            "error",
            "Oops, something went wrong...",
            "something went wrong"
          );
      })
      .catch((err) => console.log(err));
  }
}

export default ResetPassword;
