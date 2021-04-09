import React, { useState } from "react";
import axios from "axios";

function AlphaForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="alphaFormWrapper">
      <p>VT Alpha</p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="logFormInput"
          placeholder="Username"
          value={username}
        ></input>

        <input
          onChange={(e) => setPassword(e.target.value)}
          className="logFormInput"
          placeholder="Password"
          value={password}
          type="password"
        ></input>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );

  /*-----Functions                -------------*/

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("/api/test/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data)
        window.location.reload();
      })
      .catch((err) => console.log(err.response));
  }
}

export default AlphaForm;
