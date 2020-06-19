import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'

function LoginInfo({setForgotPassword}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [rememberMe, setRememberMe] = useState(false)

  const [unPassErrorMsg, setUnPassErrorMsg] = useState("")

  function handleSubmit(event){
    event.preventDefault()

    /*setUnPassErrorMsg("Wrong username or password")*/

    axios.post('/api/auth/login', {
      email: username,
      password: password
    })
    .then(res => { console.log(res)
      if (res.data.status === "blocked"){
        alert("Too many requests, please try again later")
      }
      else if (res.data.status === "logorpass"){
        setUnPassErrorMsg("Wrong username or password")
      }
      else if (res.data.status === "success"){
        // handle this
        // window.location.reload(true)
      }
      else alert("Oops, something went wrong...")
      
    })
    .catch(err => console.log(err))  
    
  }

  return (
    <form onSubmit={handleSubmit} className="loginHolder">

      <div className="formItem">
        <p className="logFormText">Username or Email</p>
        <input 
          onClick={()=> setUnPassErrorMsg("")}
          onChange={e => setUsername(e.target.value)}
          className="logFormInput"
          style={unPassErrorMsg !== "" ? {border: "1px solid rgb(255, 61, 61)"} : null}
          value={username}
        >
        </input>
        <p className="formErrorMessage">{unPassErrorMsg}</p>
      </div>


      <div className="formItem">
      <p className="logFormText">Password</p>
        <input 
          onClick={()=> setUnPassErrorMsg("")}
          type="password"
          onChange={e => setPassword(e.target.value)}
          className="logFormInput"
          style={unPassErrorMsg !== "" ? {border: "1px solid rgb(255, 61, 61)"} : null}
          value={password}
        >
        </input>
      </div>


      <div className="formItem rememberMeSection">
          <div onClick={() => setRememberMe(!rememberMe)} style={{display: "flex", flexDirection: "row", cursor: "pointer"}}>
            <div className="rememberMeButton">{rememberMe && <p> &#10004; </p>}</div>
            <div className="rememberMeText">Remember me</div>
          </div>
          <p onClick={() => setForgotPassword(true)} className="forgotPassword">Forgot password?</p>
      </div>


      <button type="submit" className="formItem loginNowButton">Log in now</button>


      <div className="formItem orLoginWith"><hr />or log in with<hr /></div>


      <div className="formItem loginSteamAndDiscord">
        <div onClick={()=> window.location.href='/auth/steam'} className="loginSteam">
          <img src={require("../images/other/SteamCircle.png")} alt="" style={{marginRight: "10px"}}></img>
          <p>STEAM</p>
        </div>


        <div onClick={()=> window.location.href='/auth/discord'} className="loginDiscord">
          <img src={require("../images/other/DiscordLogo.png")} alt="" style={{height: "28px", width: "35", marginRight: "8px"}}></img>
          <p>DISCORD</p>
        </div>

      </div>


    </form>
  )
}

export default LoginInfo
