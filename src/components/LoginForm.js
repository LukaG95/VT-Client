import React, {useState, useContext} from 'react'

import {UserContext} from '../UserContext'
import LoginInfo from './LoginInfo'
import SignUpInfo from './SignUpInfo'

function LoginForm() {
  const [showLogin, setShowLogin] = useState(true)

  const {openForm, setOpenForm} = useContext(UserContext)

  let x,y = ""
  showLogin ? x = "colorBG" : y = "colorBG"

  return (
    <div 
    style={openForm ? {display: "flex"} : {display: "none"}}
    className="shading" 
    onClick={event => {
      if(event.target.className === "shading")
        setOpenForm(false)
    }}
    >
      <div className="loginWrapper">
          
        <div className="loginHeader">
          <div onClick={() => setShowLogin(true)} className={`loginHeader-left ${y}`}>Log in</div>
          <div onClick={() => setShowLogin(false)} className={`loginHeader-right ${x}`}>Sign up</div>
        </div>

        {showLogin ? <LoginInfo /> : <SignUpInfo />}

      </div>

    </div>
  )
}

export default LoginForm
