import React, { useState, useEffect } from "react";
import axios from "axios";

const UserContext = React.createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [myID, setMyID] = useState();

  // testing user
  // const [displayWebsite, setDisplayWebsite] = useState();

  useEffect(() => {
    getUserInfo()

    return () => resetUserInfo() // not really needed
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
        //displayWebsite,
        getUserInfo,
        handleLogout
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
      /*if (err.response)
      if (err.response.status === 400 || 401){}*/
    });

  /* TEST USERS

  axios
    .get("/api/test/getUser")
    .then((res) => {
      if (res.status === 200) {
        setDisplayWebsite(true);
      }
    })
    .catch((err) => {
      setDisplayWebsite(false);
    });

    */
  }

  function resetUserInfo(){
    setUser();
    setIsLoggedIn();
    setMyID();
    setUsername();
    setEmail();
    setRole();
  }

  function handleLogout(){
    axios
      .delete(`/api/auth/logout`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
    
  }
}



export { UserContextProvider, UserContext };
