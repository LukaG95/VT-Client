import React, { useState, useEffect, useContext } from "react";
import { useLocation, Redirect } from "react-router-dom";
import axios from "axios";

function ConfirmEmail() {
  const [emailConfirmed, setEmailConfirmed] = useState();

  const pathID = useLocation().pathname.substring(15); // reads url after /email/confirm/ till the end

  useEffect(() => {
    axios
      .put(`/api/auth/confirmEmail/`, {
        code: pathID,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") setEmailConfirmed(true);
        else setEmailConfirmed(false);
        // else if (res.data.status === "OldOrInvalid")
      })
      .catch((err) => console.log(err));
  }, []);

  if (emailConfirmed)
    return (
      <div className="confirmEmailWrapper">
        <div className="displayTextWrapper">
          <h2>Success! You have confirmed your email</h2>
          <p>
            Make sure you are familiar with our <a href="/">trading rules</a>
            and <a href="/">reputation rules</a>. <br />
            Be careful when clicking on links when trading with others. <br />
            List of <a href="/">scamming methods</a> and how to prevent them
            <br />
            <br />
            Happy trading and stay safe!
          </p>
          <div>
            <div>
              <p style={{ fontWeight: "700" }}>Discord</p>
              <img
                height="22"
                width="24"
                src={require("../../images/other/DiscordLogo.png")}
              />
            </div>
            <div>
              <p style={{ fontWeight: "700" }}>Twitter</p>
              <img
                height="14"
                width="19"
                src={require("../../images/other/TwitterLogo.png")}
              />
            </div>
            <div>
              <p style={{ fontWeight: "700" }}>Instagram</p>
              <img
                height="17"
                width="17"
                src={require("../../images/other/InstagramLogo.png")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  else if (emailConfirmed === undefined) return null;
  else return <Redirect to="/" />;

  /*-----Functions                -------------*/
}

export default ConfirmEmail;
