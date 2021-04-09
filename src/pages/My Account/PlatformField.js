import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from "./PlatformField.module.scss"
import {ReactComponent as Steam} from "../../images/icons/steam.svg"
import {ReactComponent as PSN} from "../../images/icons/playstation.svg"
import {ReactComponent as Nintendo} from "../../images/icons/switch.svg"
import {ReactComponent as Discord} from "../../images/icons/discord.svg"
import {ReactComponent as Xbox} from "../../images/icons/xbox.svg"
import {ReactComponent as Epic} from "../../images/icons/epic.svg"
import { createNotification } from '../../misc/ToastNotification'

export default function PlatformField({ name, linkedPlatform, getUserInfo }) {
  const [username, setUsername] = useState()
  const [unverifiedUsername, setUnverifiedUsername] = useState(()=> name==="SWITCH" ? "SW-" : null)
  const [state, setState] = useState()

  useEffect(() => {

    if (linkedPlatform){
      setUsername(linkedPlatform.username)
      if (name === "STEAM" || name === "DISCORD" || name === "XBOX" || name === "SWITCH")
        setState("Connected")
      else if (linkedPlatform.verified)
        setState("Connected")
      else
        setState("Unverified")
    }
    else {
      setState("Disconnected")
      setUsername()
    }

  }, [linkedPlatform])

  return (
    <div className={styles.platformField}>
      <div className={styles.header}>
        <div>
          {icon()}
          <p className={styles.name}>{name}</p> 
        </div>
        <div>
          <p>{username}</p>
          <p className={styles[state]}>{state}</p>
        </div>  
      </div>

      <div className={styles.body}>
        <div className={styles.text}>
          {text()}
        </div>
        <div className={styles.buttons}>
          {buttonsInput()}
        </div>
      </div>
    </div>
  )

  function icon(){
    const platforms={   
      steam: Steam,
      psn: PSN,
      switch: Nintendo,
      xbox: Xbox,
      epic: Epic,
      discord: Discord
    }

    const Platform = platforms[name.toLowerCase()]
    return <Platform className={styles.platformIcon}/>
  }

  function text(){
    if (state === "Disconnected" && (name !== "STEAM" && name !== "DISCORD" && name !== "XBOX"))
      return (
        <p>What is your {name==="SWITCH" ? "Friend code" : "IGN"}</p>
      )
    else if (state === "Unverified")
      return (
        <>
          <p>To verify your IGN add our account: virtradeAuth <br/> Please wait up to 30 seconds</p>
          <button onClick={()=> handleDisconnect()}>Disconnect</button>
        </>
      )
  }

  function buttonsInput(){
    
    if (state === "Connected")
      return (
        <button onClick={()=> handleDisconnect()} className={styles.signOut}>Sign out</button>
      )
    else if (state === "Disconnected" && (name === "STEAM" || name === "DISCORD" || name === "XBOX"))
      return (
          <button onClick={()=> window.open(`https://www.virtrade.gg/api/auth/${name==="STEAM" ? "linkSteam" : name==="DISCORD" ? "linkDiscord" : "xbox"}`)} className={styles.signIn}>Sign in</button>
      )
    else if (state === "Disconnected")
      return (
        <form onSubmit={handleSubmit}>
          <input 
            onChange={e => setUnverifiedUsername(e.target.value)} 
            minLength={name==="SWITCH" ? "17" : "1"} 
            maxLength={name==="SWITCH" ? "17" : name==="PSN" ? "16" : "20"}
            value={unverifiedUsername}  
            placeholder={name==="SWITCH" ? "SW-XXXX-XXXX-XXXX" : "IGN..."} />
        </form>
      )
      /*
    else if (state === "Unverified")
      return (
        <input placeholder="Verification code..." />
      )*/
    
    else return null
  }

  function handleSubmit(e){
    e.preventDefault();

    if (name === "SWITCH")
      if (!verifyFriendCode(unverifiedUsername))
        return createNotification(
          "error",
          `Incorrect friend code format. Must be: SW-XXXX-XXXX-XXXX`,
          `Wrong friend code`
        );

    axios
      .post(`/api/auth/linkPlatform?platform=${name.toLowerCase()}`, { 
        username: unverifiedUsername
      })
      .then((res) => { 
        if (res.data.info === "success"){
          getUserInfo()
        }
        
        if (res.data.message === "username already linked to another account")
        createNotification(
          "error",
          `IGN is already taken`,
          `IGN is already taken`
        );
        
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function handleDisconnect(){
    axios
    .delete(`/api/auth/linkPlatform?platform=${name.toLowerCase()}`)
    .then((res) => { 
      if (res.data.info === "success"){
        getUserInfo()
      }

      if (res.data.info === "error")
        createNotification(
          "error",
          res.data.message,
          res.data.message
        );
      
    })
    .catch((err) => {
      console.log(err.response);
    });
  }

  function verifyFriendCode(nickname){
    if (nickname.slice(0, 3) !== "SW-")
      return false
    
    if (nickname[7] !== "-" || nickname[12] !== "-")
      return false
    
    for (let i = 0; i<17; i++)
      if (i === 3 || i=== 4 || i===5 || i===6 || i===8 || i===9 || i===10 || i===11 || i===13 || i===14 || i===15 || i===16)
        if (!Number.isInteger(parseInt(nickname[i])))
          return false

    return true
  
  }

}
