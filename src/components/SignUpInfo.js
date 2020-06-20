import React, {useState} from 'react'
import axios from 'axios'
import Filter from 'bad-words'
import {NotificationContainer, NotificationManager} from 'react-notifications'
const profanityFilter = new Filter({ regex: /^\*|\.|$/gi })

function SignUpInfo() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [usernameErrorMsg, setUsernameErrorMsg] = useState("")
  const [emailErrorMsg, setEmailErrorMsg] = useState("")
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("")

  const [readAndAgreed, setReadAndAgreed] = useState(false)

  function createNotification(type, message){
    NotificationManager[type](message, type.charAt(0).toUpperCase() + type.slice(1))
  }

  function handleSubmit(event){
    event.preventDefault()
    
    if (username.replace(/\s/g, '').length < 2 || username.length > 15){
      setUsernameErrorMsg("Username must be between 2 and 15 characters long")
      return
    }
    else if (!username.match(/^(?!.*[ ]{2,})[a-zA-Z0-9 _-]{2,15}$/gm)){
      setUsernameErrorMsg("Username can only contain characters a-z, 0-9, or '- _'")
      return
    }
    else if (profanityFilter.isProfane(username)){
      setUsernameErrorMsg("Username contains innapropriate words")
      return
    }
    if (password.length < 4 || password.length > 30){
      setPasswordErrorMsg("Password must be between 4 and 30 characters long")
      return
    }
    else if (!password.match(/^[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?a-zA-Z0-9]{4,30}$/gm)){
      setPasswordErrorMsg("Passwords contains inappropriate characters")
      return
    }
    else if (password !== confirmPassword){
      setPasswordErrorMsg("Passwords don't match")
      return
    }
    else if (!readAndAgreed){
      createNotification("warning", "Agree to Terms of service")
      return
    }

    axios.post('/api/auth/signup', {
      username: username,
      email: email,
      password: password,
      passwordConfirm: confirmPassword
    })
    .then(res => {
      console.log(res.data)
      if (res.data.status === "blocked"){
        alert("Too many requests, please try again later")
      }
      else if (res.data.status === "username"){
        setUsernameErrorMsg("Username is taken")
      }
      else if (res.data.status === "email"){
        setEmailErrorMsg("Email is already in use")
      }
      else if (res.data.status === "success"){
        createNotification("success", "You have signed up")
        setTimeout(()=> {createNotification("info", "Check your email for a confirmation link")}, 2000)
      }
      else createNotification("error", "Oops, something went wrong...") // alert("Oops, something went wrong...")
    })
    .catch(err => console.log(err))
    
  }

  return (
    <form onSubmit={handleSubmit} className="loginHolder">

      <div className="formItem">
        <p className="logFormText">Username</p>
        <input 
          onClick={()=> setUsernameErrorMsg("")}
          onChange={e => setUsername(e.target.value)}
          className="logFormInput"
          style={usernameErrorMsg !== "" ? {border: "1px solid rgb(255, 61, 61)"} : null}
          value={username}
          required={true}
        >
        </input>
        <p className="formErrorMessage">{usernameErrorMsg}</p>
      </div>


      <div className="formItem">
      <p className="logFormText">Email</p>
        <input 
          type="email"
          onClick={()=> setEmailErrorMsg("")}
          onChange={e => setEmail(e.target.value)}
          className="logFormInput"
          style={emailErrorMsg !== "" ? {border: "1px solid rgb(255, 61, 61)"} : null}
          value={email}
          required={true}
        >
        </input>
        <p className="formErrorMessage">{emailErrorMsg}</p>
      </div>


      <div className="formItem">
        <p className="logFormText">Password</p>
        <input 
          type="password"
          onClick={()=> {setPasswordErrorMsg("")}}
          onChange={e => setPassword(e.target.value)}
          className="logFormInput"
          style={passwordErrorMsg !== "" ? {border: "1px solid rgb(255, 61, 61)"} : null}
          value={password}
          required={true}
        >
        </input>
        <p className="formErrorMessage">{passwordErrorMsg}</p>
      </div>
      

      <div className="formItem">
      <p className="logFormText">Confirm password</p>
        <input 
          type="password"
          onClick={()=> {setPasswordErrorMsg("")}}
          onChange={e => setConfirmPassword(e.target.value)}
          className="logFormInput"
          style={passwordErrorMsg === "Passwords don't match" ? {border: "1px solid rgb(255, 61, 61)"} : null}
          value={confirmPassword}
          required={true}
        >
        </input>
      </div>


      <div className="formItem rememberMeSection">
          <div onClick={e => e.target.nodeName !== "A" && setReadAndAgreed(!readAndAgreed)} style={{display: "flex", flexDirection: "row", cursor: "pointer"}}>
            <div className="rememberMeButton">{readAndAgreed && <p> &#10004; </p>}</div>
            <div className="rememberMeText">I have read and agreed to <a style={{textDecoration: "none", color: "#e7aa0f"}} href="/terms">Terms of service</ a></div>
          </div>
      </div>


      <button type="submit" className="formItem loginNowButton">Sign Up</button>

      <NotificationContainer/>

    </form>
  )
}

export default SignUpInfo
