import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet";

import styles from "../Footer.module.scss";
import { PopupContext } from "../../context/PopupContext";
import { ReactComponent as DiscordIcon } from "../../images/icons/discord.svg";
import { ReactComponent as TwitterIcon } from "../../images/icons/twitter.svg";
import { ReactComponent as FacebookIcon } from "../../images/icons/facebook.svg";
import { ReactComponent as SteamIcon } from "../../images/icons/steam.svg";

function ConfirmEmail() {
  const [emailConfirmed, setEmailConfirmed] = useState(true);

  const { pathID } = useParams()
  const { setOpenForm } = useContext(PopupContext);
/*
  useEffect(() => {
    axios
      .put(`/api/auth/confirmEmail`, {
        code: pathID,
      })
      .then((res) => {
        console.log(res);
        if (res.data.info === "success") setEmailConfirmed(true);
        else setEmailConfirmed(false);
        // else if (res.data.info === "OldOrInvalid")
      })
      .catch((err) => console.log(err));
  }, [pathID]);
  */

/*
  <Helmet>
    <title>Email confirmation</title>
    <description>Email confirmation notice</description>
    <link rel="canonical" href="http://virtrade.gg/email/confirm" />
  </Helmet>
*/

  if (emailConfirmed)
    return (
      
      <div className="confirmEmailWrapper">
        <div className="displayTextWrapper">
          <h2>Success! You have confirmed your email</h2>
          <p>
            Make sure you are familiar with our <a href="/">trading rules </a>
            and <a href="/">reputation rules</a>. <br />
            Be careful when clicking on links when trading with others. <br />
            List of <a href="/">scamming methods</a> and how to prevent them
            <br />
            <br />
            Happy trading and stay safe!
          </p>
          <div>
            <div>
              <DiscordIcon onClick={()=> window.open("https://discord.gg/Qt6qKJx")} className={styles.social} />
              <TwitterIcon onClick={()=> window.open("https://twitter.com/VirtradeGG")} className={styles.social} />
              <FacebookIcon onClick={()=> window.open("https://www.facebook.com/Virtrade/")} className={styles.social} />
              <SteamIcon onClick={()=> window.open("https://steamcommunity.com/groups/virtrade")} className={styles.social} />
            </div>
            <button onClick={()=> setOpenForm(true)}>Login</button>
          </div>
        </div>
      </div>
    );
  else if (emailConfirmed === undefined) return null;
  else return <p>oops this page doesn't exist</p>// <Redirect to="/" />;

  /*-----Functions                -------------*/
}

export default ConfirmEmail;
