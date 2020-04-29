import React, {useState} from 'react'
import axios from 'axios'

function SignUpInfo() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [readAndAgreed, setReadAndAgreed] = useState(false)

  function handleSubmit(event){
    event.preventDefault()
    
    axios.post('https://justlearningfront.website/auth/signin', {
      username: username,
      email: email,
      password: password
    }).then(res => console.log(res)).catch(err => console.log(err))

  }

  return (
    <form onSubmit={handleSubmit} className="loginHolder">


      <div className="formItem">
        <p className="logFormText">Username</p>
        <input 
          onChange={e => setUsername(e.target.value)}
          className="logFormInput"
          value={username}
        >
        </input>
      </div>


      <div className="formItem">
      <p className="logFormText">Email</p>
        <input 
          onChange={e => setEmail(e.target.value)}
          className="logFormInput"
          value={email}
        >
        </input>
      </div>


      <div className="formItem">
      <p className="logFormText">Password</p>
        <input 
          type="password"
          onChange={e => setPassword(e.target.value)}
          className="logFormInput"
          value={password}
        >
        </input>
      </div>


      <div className="formItem">
      <p className="logFormText">Confirm password</p>
        <input 
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}
          className="logFormInput"
          value={confirmPassword}
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


    </form>
  )
}

export default SignUpInfo
