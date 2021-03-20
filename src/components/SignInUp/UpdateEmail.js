import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";

function UpdateEmail() {
  const [emailConfirmed, setEmailConfirmed] = useState();

  const { pathID } = useParams()

  useEffect(() => {
    axios
      .put(`/api/auth/updateEmail`, {
        code: pathID,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          setEmailConfirmed(true);
        }
        // else if (res.data.status === "OldOrInvalid")
        else setEmailConfirmed(false);
      })
      .catch((err) => console.log(err));
  }, [pathID]);

  if (emailConfirmed)
    return (
      <div className="confirmEmailWrapper">
        <div style={{ textAlign: "center" }} className="displayTextWrapper">
          <h2>Success! You have updated your email</h2>
          <a href="/" style={{ textDecoration: "none" }}>
            Back to trading
          </a>
        </div>
      </div>
    );
  else if (emailConfirmed === undefined) return null;
  else return <Redirect to="/" />;

  /*-----Functions                -------------*/
}

export default UpdateEmail;
