import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../context/UserContext";

function AdminPage() {
  const [testUsers, setTestUsers] = useState();
  const [newUsername, setNewUsername] = useState();
  const [deleteUsername, setDeleteUsername] = useState();

  const { role } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("/api/auth/getTestUsers")
      .then((res) => {
        console.log("/api/auth/getTestUsers", res);
        const test_users = res.data.testers.map((item) => (
          <>
            <div className="testUserComponent">
              <p>{item.role}</p>
              <p>{item.username}</p>
              <p>{item.password}</p>
            </div>
            <hr />
          </>
        ));
        setTestUsers(test_users);
      })
      .catch((err) => console.log(err));
  }, []);

  if (role === "admin")
    return (
      <div className="adminPageWrapper">
        <div>
          <input onChange={(e) => setNewUsername(e.target.value)} />
          <button onClick={() => createUser()}>Create test user</button>
          <input onChange={(e) => setDeleteUsername(e.target.value)} />
          <button onClick={() => deleteUser()}>Delete test user</button>
        </div>

        <div className="testUsersWrapper">{testUsers}</div>
      </div>
    );
  else if (role === undefined) return null;
  else return <Redirect to="/" />;

  /*-----Functions                -------------*/

  function createUser() {
    axios
      .post("/api/auth/createTestUser", {
        username: newUsername,
      })
      .then((res) => {
        // console.log(res)
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  function deleteUser() {
    axios
      .delete("/api/auth/deleteTestUser", {
        data: {
          username: deleteUsername,
        },
      })
      .then((res) => {
        // console.log(res)
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }
}

export default AdminPage;
