import React, { useState, useContext } from "react";

import { PopupContext } from "../../context/PopupContext";
import LoginInfo from "./LoginInfo";
import SignUpInfo from "./SignUpInfo";
import ForgotPassword from "./ForgotPassword";
import manageFormResize from "../../misc/manageFormResize";
import useWindowDimensions from "../../misc/windowHW";

function LoginForm() {
  const [showLogin, setShowLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);

  const { openForm, setOpenForm } = useContext(PopupContext);
  const { width } = useWindowDimensions();

  manageFormResize(width, openForm);

  let x,
    y = "";
  showLogin ? (x = "colorBG") : (y = "colorBG");

  return (
    <div
      style={openForm ? { visibility: "visible" } : { visibility: "hidden" }}
      className="shading"
      onMouseDown={(event) =>
        event.target.className === "shading" && closeForm()
      }
    >
      <div className="loginWrapper" id="logForm">
        <div className="loginHeader">
          <div
            onClick={() => {
              setForgotPassword(false);
              setShowLogin(true);
            }}
            className={`loginHeader-left ${y}`}
          >
            Log in
          </div>
          <div
            onClick={() => {
              setForgotPassword(false);
              setShowLogin(false);
            }}
            className={`loginHeader-right ${x}`}
          >
            Sign up
          </div>
        </div>

        {forgotPassword ? (
          <ForgotPassword closeForm={closeForm} />
        ) : showLogin ? (
          <LoginInfo
            setForgotPassword={setForgotPassword}
            closeForm={closeForm}
          />
        ) : (
          <SignUpInfo closeForm={closeForm} />
        )}
      </div>
    </div>
  );

  function closeForm() {
    setOpenForm(false);
    setShowLogin(true);
    setForgotPassword(false);
    document.body.style.overflowY = "scroll";
  }

  /*-----Functions                -------------*/
}

export default LoginForm;
