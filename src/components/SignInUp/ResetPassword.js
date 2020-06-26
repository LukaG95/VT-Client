import React, {useState} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'

import {NotificationContainer, NotificationManager} from 'react-notifications'

function LoginForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const pathID = useLocation().pathname.substring(15)  // reads url after /passwordreset/ till the end

  // createNotification("warning", "Agree to Terms of service")

  return (
    <div className="resetPassWrapper" style={{background: "none"}}>

      <form onSubmit={handleNewPassSubmit} className="resetPassForm">
            
        <div className="formItem">
          <p className="logFormText">New password</p>
          <input 
            required
            type="password"
            onChange={e => setPassword(e.target.value)}
            className="logFormInput"
            value={password}
          >
          </input>
          <p className="formErrorMessage"></p>
        </div>


        <div className="formItem">
          <p className="logFormText">Confirm new password</p>
          <input 
            required
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
            className="logFormInput"
            value={confirmPassword}
          >
          </input>
        </div>


        <button type="submit" style={{marginTop: "15px"}} className="formItem loginNowButton">Confirm new password</button>

      </form>

      <NotificationContainer/>

    </div>
  )

  function createNotification(type, message){
    NotificationManager[type](message, type.charAt(0).toUpperCase() + type.slice(1))
  }

  function handleNewPassSubmit(e){
    e.preventDefault()

    if (password.length < 4 || password.length > 30){
      createNotification("warning", "Password must be between 4 and 30 characters long")
      return
    }
    else if (!password.match(/^[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?a-zA-Z0-9]{4,30}$/gm)){
      createNotification("warning", "Passwords contains inappropriate characters")
      return
    }
    else if (password !== confirmPassword){
      createNotification("warning", "Passwords don't match")
      return
    }

    /*axios.post('/api/', {
      password: password,
      confirmPassword: confirmPassword
    })
    .then(res => {
      if (res.data.status === "blocked"){
        alert("Too many requests, please try again later")
      }
      else if (res.data.status === "success"){
        createNotification("success", "Your password has been changed") 
        setTimeout(()=> createNotification("info", "Redirecting in a few moments"), 1500)
        setTimeout(()=> window.location.href = "/", 4000)
      }
      else createNotification("error", "Oops, something went wrong...") 
    })
    .catch(err => console.log(err))

*/
  }
}

export default LoginForm
