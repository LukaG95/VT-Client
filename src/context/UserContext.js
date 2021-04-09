import React, { useState, useEffect } from "react";
import axios from "axios";

const UserContext = React.createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [myID, setMyID] = useState();

  // testing
  const [displayWebsite, setDisplayWebsite] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    getUserInfo()
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        username,
        email,
        isLoggedIn,
        setIsLoggedIn,
        myID,
        role,
        displayWebsite,
        getUserInfo
      }}
    >
      {children}
    </UserContext.Provider>
  );

  function getUserInfo(){
    axios
    .get("/api/auth/getUser")
    .then((res) => { 
      if (res.data.info === "success") {
        setUser(res.data.user);
        setIsLoggedIn(true);
        setMyID(res.data.user._id);
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
        setRole(res.data.user.role);
      }
    })
    .catch((err) => {
      setIsLoggedIn(false);
      console.log(err);
      /*if (err.response)
      if (err.response.status === 400 || 401){}*/
    });

  axios
    .get("/api/test/getUser")
    .then((res) => {
      // console.log('/api/test/getUser', res)
      if (res.status === 200) {
        setDisplayWebsite(true);
      }
    })
    .catch((err) => {
      setDisplayWebsite(false);
      console.log(err.response);
      /*if (err.response)
      if (err.response.status === 400 || 401){}*/
    });
  }
}



export { UserContextProvider, UserContext };
