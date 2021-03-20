import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";

import { ReactComponent as DiscordIcon } from "../../images/icons/discord.svg";
import { ReactComponent as TwitterIcon } from "../../images/icons/twitter.svg";
import { ReactComponent as InstagramIcon } from "../../images/icons/instagram.svg";

function ConfirmEmail() {
  const [emailConfirmed, setEmailConfirmed] = useState();

  const { pathID } = useParams()

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
  }, [pathID]);

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
              <DiscordIcon style={{ height: "17px", width: "17px" }} /> {/*h: 22, w: 24 */}
            </div>
            <div>
              <p style={{ fontWeight: "700" }}>Twitter</p>
              <img height="14" width="19" src={TwitterIcon} alt="" />
              <TwitterIcon style={{ height: "17px", width: "17px" }} />
            </div>
            <div>
              <p style={{ fontWeight: "700" }}>Instagram</p>
              <InstagramIcon style={{ height: "17px", width: "17px" }} />
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
