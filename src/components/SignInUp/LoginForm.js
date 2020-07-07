import React, {useState, useContext} from 'react'

import {PopupContext} from '../PopupContext'
import LoginInfo from './LoginInfo'
import SignUpInfo from './SignUpInfo'
import ForgotPassword from './ForgotPassword'

function LoginForm() {
  const [showLogin, setShowLogin] = useState(true)
  const [forgotPassword, setForgotPassword] = useState(false)

  const {openForm, setOpenForm} = useContext(PopupContext) 

  let x,y = ""
  showLogin ? x = "colorBG" : y = "colorBG"


  return (
    <div 
    style={openForm ? {visibility: "visible"} : {visibility: "hidden"}}
    className="shading" 
    onMouseDown={event => {
      if(event.target.className === "shading"){
        setOpenForm(false)
        setShowLogin(true)
        setForgotPassword(false)
      }
    }} 
    >
      <div className="loginWrapper">
          
        <div className="loginHeader">
          <div onClick={() => {setForgotPassword(false); setShowLogin(true)}} className={`loginHeader-left ${y}`}>Log in</div>
          <div onClick={() => {setForgotPassword(false); setShowLogin(false)}} className={`loginHeader-right ${x}`}>Sign up</div>
        </div>

        {forgotPassword ? <ForgotPassword/> : showLogin ? <LoginInfo setForgotPassword={setForgotPassword}/> : <SignUpInfo/>}

      </div>

    </div>
  )


  /*-----Functions                -------------*/

}

export default LoginForm
