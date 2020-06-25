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

      <p className="logFormText" style={{marginBottom: "10px"}}>Enter email to reset your password</p>

      <div style={{marginBottom: "0px"}} className="formItem">
        <input 
          required
          type="email"
          onChange={e => setUnOrEmail(e.target.value)}
          className="logFormInput"
          value={unOrEmail}
        >
        </input>
      </div>

      <button type="submit" className="form item resetPassButton">Reset password</button>

      <NotificationContainer/>

    </form>
  )
}

export default ForgotPassword
