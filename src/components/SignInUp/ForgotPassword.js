import React, { useState } from "react";
import axios from "axios";

import { createNotification } from "../../misc/ToastNotification";

function ForgotPassword({ closeForm }) {
  const [unOrEmail, setUnOrEmail] = useState("");

  return (
    <div className="logForm-body">
      <form onSubmit={handleSubmit} className="loginHolder">
        <p className="forgotPasswordText" style={{ marginBottom: "10px" }}>
          Enter your email address that you used to register and we will send
          you a password reset link
        </p>

        <div style={{ marginBottom: "0px" }} className="formItem">
          <input
            required
            placeholder="Enter your email address"
            type="email"
            onChange={(e) => setUnOrEmail(e.target.value)}
            className="logFormInput"
            style={{ marginBottom: "25px" }}
            value={unOrEmail}
          ></input>
        </div>

        <button type="submit" className="resetPassButton">
          Send password reset email
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
    createNotification(
      "success",
      "Password reset email sent",
      "password email sent"
    );

    axios
      .post(`/api/auth/sendResetPasswordToken`, {
        email: unOrEmail,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
}

export default ForgotPassword;
