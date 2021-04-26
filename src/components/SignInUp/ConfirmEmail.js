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
import { UserContext } from "../../context/index";

function ConfirmEmail() {
  const [emailConfirmed, setEmailConfirmed] = useState();

  const { pathID } = useParams()
  const { setOpenForm } = useContext(PopupContext);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    axios
      .put(`/api/auth/confirmEmail`, {
        code: pathID,
      })
      .then((res) => {
        if (res.data.info === "success") setEmailConfirmed(true);
        else setEmailConfirmed(false);
      })
      .catch((err) => {
        setEmailConfirmed(false)
      });
  }, [pathID]);

  if (emailConfirmed)
    return (
      <>
      
        <Helmet>
          <title>Email confirmation | VirTrade</title>
          <meta name="description" content="Email confirmation notice" />
          <link rel="canonical" href="http://virtrade.gg/email/confirm" />
        </Helmet>

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
              {!isLoggedIn && <button onClick={()=> setOpenForm(true)}>Login</button>}
            </div>
          </div>
        </div>

      </>
    );
  else if (emailConfirmed === undefined) return null;
  else return <Redirect to="/" />

  /*-----Functions                -------------*/
}

export default ConfirmEmail;
