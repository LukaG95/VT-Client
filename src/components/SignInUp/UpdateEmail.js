import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet";

function UpdateEmail() {
  const [emailConfirmed, setEmailConfirmed] = useState();
  const [seconds, setSeconds] = useState(5)

  const { pathID } = useParams()

  useEffect(() => {
    axios
      .put(`/api/auth/updateEmail`, {
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

  useEffect(() => {
    let counter = setInterval(()=> {
      setSeconds(prev => prev-1)
    }, 1000)

    return ()=> clearInterval(counter) 
  }, []);

  useEffect(() => {
    if (seconds <= 0)
      window.location.replace("http://virtrade.gg");

  }, [seconds]);

  if (emailConfirmed)
    return (
      <>

        <Helmet>
          <title>Update email | VirTrade</title>
          <meta name="description" content="Update email notice" />
          <link rel="canonical" href="http://virtrade.gg/email/update" />
        </Helmet>

        <div className="confirmEmailWrapper">
          <div style={{ textAlign: "center" }} className="displayTextWrapper">
            <h2>Success! You have updated your email</h2>
            <p>Redirecting in: {seconds}</p>
            <a href="/" style={{ textDecoration: "none" }}>
              Back to trading
            </a>
          </div>
        </div>

      </>
    );
  else if (emailConfirmed === undefined) return null;
  else return <Redirect to="/" />


  /*-----Functions                -------------*/
}

export default UpdateEmail;
