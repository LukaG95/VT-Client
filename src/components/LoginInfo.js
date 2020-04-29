import React, {useState} from 'react'
import {ReactComponent as ArrowIcon} from '../images/other/SteamCircle.png'

function LoginInfo() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState("")

  return (
    <form className="loginHolder">


      <div className="loginItem">
        <p className="logFormText">Username or Email</p>
        <input 
          onChange={e => setUsername(e.target.value)}
          className="logFormInput"
        >
        </input>
      </div>


      <div className="loginItem">
      <p className="logFormText">Password</p>
        <input 
          type="password"
          onChange={e => setPassword(e.target.value)}
          className="logFormInput"
        >
        </input>
      </div>


      <div className="loginItem rememberMeSection">
          <div style={{display: "flex", flexDirection: "row"}}>
            <div className="rememberMeButton"></div>
            <div className="rememberMeText">Remember me</div>
          </div>
          <p className="forgotPassword">Forgot password?</p>
      </div>


      <div className="loginItem loginNowButton">Log in now</div>


      <div className="loginItem orLoginWith"><hr />or log in with<hr /></div>


      <div className="loginItem loginSteamAndDiscord">
        <div className="loginSteam">
          <img src={require("../images/other/SteamCircle.png")} style={{marginRight: "10px"}}></img>
          <p>STEAM</p>
        </div>

        <div className="loginDiscord">
          <img src={require("../images/other/DiscordLogo.png")} style={{height: "28px", width: "35", marginRight: "8px"}}></img>
          <p>DISCORD</p>
        </div>
      </div>


    </form>
  )
}

export default LoginInfo
