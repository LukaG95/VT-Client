import React, {useState} from 'react'
import {NotificationContainer, NotificationManager} from 'react-notifications'

function ForgotPassword() {
  const [unOrEmail, setUnOrEmail] = useState("")


function createNotification(type, message){
  NotificationManager[type](message, type.charAt(0).toUpperCase() + type.slice(1))
}
  
function handleSubmit(e){
  e.preventDefault()
  createNotification("success", "Password reset sent")
}

  return (
    <form onSubmit={handleSubmit} className="loginHolder">

      <p className="forgotPasswordText" style={{marginBottom: "10px"}}>Enter your email address that you used to register and we will send you a password reset link</p>

      <div style={{marginBottom: "0px"}} className="formItem">
        <input 
          required
          placeholder="Enter your email address"
          type="email"
          onChange={e => setUnOrEmail(e.target.value)}
          className="logFormInput"
          value={unOrEmail}
        >
        </input>
      </div>

      <button type="submit" className="resetPassButton">Send password reset email</button>

      <NotificationContainer/>

    </form>
  )
}

export default ForgotPassword
