import React, {useState, useEffect, useContext} from 'react'
import {useLocation, Redirect} from 'react-router-dom'
import axios from 'axios'

import { UserContext } from '../../UserContext'

import {NotificationContainer, NotificationManager} from 'react-notifications'

function ConfirmEmail() {
  const pathID = useLocation().pathname.substring(14)  // reads url after /emailconfirm/ till the end

  const {isLoggedIn} = useContext(UserContext)

  useEffect(() => {
    axios.put(`/api/reg/${pathID}`)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }, [])

  if (isLoggedIn === false)
  return (
    <div className="confirmEmailWrapper">

      <div className="displayTextWrapper">
        <h2>Success! You have confirmed your email</h2>
        <p>
          Make sure you are familiar with our <a href="/">trading rules</a> and <a href="/">reputation rules</a>. <br /> 
          Be careful when clicking on links when trading with others. <br /> 
          List of <a href="/">scamming methods</a> and how to prevent them <br />
          <br />
          Happy trading and stay safe!
        </p>
        <div>
          <div><p style={{fontWeight: "700"}}>Discord</p><img height="22" width="24" src={require("../../images/other/DiscordLogo.png")}/></div>
          <div><p style={{fontWeight: "700"}}>Twitter</p><img height="14" width="19" src={require("../../images/other/TwitterLogo.png")}/></div>
          <div><p style={{fontWeight: "700"}}>Instagram</p><img height="17" width="17" src={require("../../images/other/InstagramLogo.png")}/></div>
        </div>
      </div>

      <NotificationContainer/>

    </div>
  )
  else if (isLoggedIn === true)
  return <Redirect to="/" />
  else return null

  function createNotification(type, message){
    NotificationManager[type](message, type.charAt(0).toUpperCase() + type.slice(1))
  }

}

export default ConfirmEmail
