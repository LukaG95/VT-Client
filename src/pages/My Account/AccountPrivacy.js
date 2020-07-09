import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'

import AccountSidebar from './AccountSidebar'
import {createNotification} from '../../App'

function AccountPrivacy() {
	const [password, setPassword] = useState("")
	const [newPass, setNewpass] = useState("")
  const [newPass2, setNewpass2] = useState("")
  
  const [passErrorMsg, setPassErrorMsg] = useState("")
  const [newPassErrorMsg, setNewPassErrorMsg] = useState("")
  const [newPass2ErrorMsg, setNewPass2ErrorMsg] = useState("")
	
	return (
		<div className="secondaryWrapper accountWrapper">
		
			<AccountSidebar />
			
			<div className="accountFieldsWrapper">
			
				<form onSubmit={e => handleUpdatePassword(e)}>

					<label htmlFor="curpassInput"><p>Current password</p></label>
          <input 
            id="curpassInput" 
            type="password" 
            style={passErrorMsg !== "" ? {border: "1px solid rgb(255, 61, 61)"} : null}
            onChange={(e)=>setPassword(e.target.value)} 
            onClick={()=> setPassErrorMsg("")}
            value={password}
            />
          <p className="currentPassError">{passErrorMsg}</p>
					
					<label htmlFor="newpassInput"><p>New password</p></label>
          <input 
            id="newpassInput" 
            type="password" 
            style={newPassErrorMsg !== "" ? {border: "1px solid rgb(255, 61, 61)"} : null}
            onChange={(e)=>setNewpass(e.target.value)} 
            onClick={()=> setNewPassErrorMsg("")}
            value={newPass}
          />
          <p className="newPassError">{newPassErrorMsg}</p>
					
					<label htmlFor="newpass2Input"><p>Confirm new password</p></label>
          <input 
            id="newpass2Input" 
            type="password" 
            style={newPass2ErrorMsg !== "" ? {border: "1px solid rgb(255, 61, 61)"} : null}
            onChange={(e)=>setNewpass2(e.target.value)} 
            onClick={()=> setNewPass2ErrorMsg("")}
            value={newPass2}
          />
          <p className="NewPassError2">{newPass2ErrorMsg}</p>

					<button type="submit" >Update password</button>
				</form>
				
			</div>
		
		</div>
  )

  /*-----Functions                -------------*/
  
  function handleUpdatePassword(e){
    e.preventDefault()

    if (password === "" || newPass === "" || newPass2 === ""){
      if (password === "")
      setPassErrorMsg("Please fill this field")
      if (newPass === "")
      setNewPassErrorMsg("Please fill this field")
      if (newPass2 === "")
      setNewPass2ErrorMsg("Please fill this field")
      return
    }
    
    else if (newPass !== newPass2){
      setNewPass2ErrorMsg("Passwords don't match")
      return
    }
    else if (newPass.length < 6 || password.length > 30){
      setNewPassErrorMsg("Password must be between 6 and 30 characters long")
      return
    }
    else if (!newPass.match(/^[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?a-zA-Z0-9]{6,30}$/gm)){
      setNewPassErrorMsg("Password contains inappropriate characters")
      return
    }

    // server request for password upate
    axios.put(`/api/auth/updatePassword`, {
      password: password,
      newPassword: newPass,
      passwordConfirm: newPass2
    })
    .then(res => { 
      if (res.data.status === "success"){
        createNotification("success", "Password was updated")
        setPassword("")
        setNewpass("")
        setNewpass2("")
      }
      else createNotification("error", "Oops something went wrong...")
    })
    .catch(err => console.log(err))

  }
}

export default AccountPrivacy
