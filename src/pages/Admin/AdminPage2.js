import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import styles from './AdminPage.module.scss'

import TestUsers from "./TestUsers.js"
import Campaigns from "./Campaigns.js"
import { UserContext } from "../../context/UserContext";

export default function AdminPage2() {
  const [selection, setSelection] = useState("campaigns")

  const { role } = useContext(UserContext);

  if (role === "admin")
  return (
    <div className={styles.wrapper}>
      <div className={styles.selectionHeader}>
        <button 
          style={selection === "test users" ? {color: "#fe3b3b"} : {color: "#f6f6f6"}}
          onClick={()=> setSelection("test users")}
        >
          Test users
        </button>
        <button 
          style={selection === "campaigns" ? {color: "#fe3b3b"} : {color: "#f6f6f6"}}
          onClick={()=> setSelection("campaigns")}
        >
          Campaigns
        </button>
      </div>

      {
        selection === "test users" ? 
          <TestUsers />
        :
        selection === "campaigns" ? 
          <Campaigns />
        :
          null
      }
    </div>
  )
  else if (role === undefined) return null;
  else return <Redirect to="/" />;
}
