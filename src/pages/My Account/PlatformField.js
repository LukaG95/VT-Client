import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from "./PlatformField.module.scss"
import {ReactComponent as Steam} from "../../images/icons/steam.svg"
import {ReactComponent as PSN} from "../../images/icons/playstation.svg"
import {ReactComponent as Nintendo} from "../../images/icons/switch.svg"
import {ReactComponent as Discord} from "../../images/icons/discord.svg"
import {ReactComponent as Xbox} from "../../images/icons/xbox.svg"
import {ReactComponent as Epic} from "../../images/icons/epic.svg"

export default function PlatformField({ name, linkedPlatform, getUserInfo }) {
  const [username, setUsername] = useState()
  const [unverifiedUsername, setUnverifiedUsername] = useState()
  const [state, setState] = useState()

  useEffect(() => {
    if (linkedPlatform){
      setUsername(linkedPlatform.username)
      if (linkedPlatform.verified)
        setState("Connected")
      else
        setState("Unverified")
    }
    else setState("Disconnected")
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
    if (state === "Disconnected" && (name !== "STEAM" && name !== "DISCORD"))
      return (
        <p>What is your IGN</p>
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
    else if (state === "Disconnected" && (name === "STEAM" || name === "DISCORD"))
      return (
          <button className={styles.signIn}>Sign in</button>
      )
    else if (state === "Disconnected")
      return (
        <form onSubmit={handleSubmit}>
          <input onChange={e => setUnverifiedUsername(e.target.value)} value={unverifiedUsername} placeholder="IGN..." />
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

    axios
      .post(`/api/auth/linkPlatform?platform=${name.toLowerCase()}`, { 
        username: unverifiedUsername
      })
      .then((res) => { 
        if (res.data.info === "success"){
          getUserInfo()
        }
        
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function handleDisconnect(){
    axios
    .delete(`/api/auth/linkPlatform?platform=${name.toLowerCase()}`)
    .then((res) => { console.log(res.data)
      if (res.data.info === "success"){
        getUserInfo()
      }
      
    })
    .catch((err) => {
      console.log(err.response);
    });
  }

}
