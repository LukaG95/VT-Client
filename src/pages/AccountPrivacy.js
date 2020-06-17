import React, {useState} from 'react'
import AccountSidebar from '../components/AccountSidebar'

function AccountPrivacy() {
	const [password, setPassword] = useState("")
	const [newpass, setNewpass] = useState("")
  const [newpass2, setNewpass2] = useState("")
  
  const [passErrorMsg, setPassErrorMsg] = useState("")
  const [newPassErrorMsg, setNewPassErrorMsg] = useState("")
  const [cNewPassErrorMsg, setCNewPassErrorMsg] = useState("")
	
	return (
		<div className="secondaryWrapper accountWrapper">
		
			<AccountSidebar />
			
			<div className="accountFieldsWrapper">
			
				<form onSubmit={e => handleUpdatePassword(e)}>

					<label htmlFor="curpassInput"><p>Current password</p></label>
          <input 
            required 
            id="curpassInput" 
            type="password" 
            style={passErrorMsg !== "" ? {border: "1px solid rgb(255, 61, 61)"} : null}
            defaultValue={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            onClick={()=> setPassErrorMsg("")}
            />
          <p className="currentPassError">{passErrorMsg}</p>
					
					<label htmlFor="newpassInput"><p>New password</p></label>
          <input 
            required 
            id="newpassInput" 
            type="password" 
            style={newPassErrorMsg !== "" ? {border: "1px solid rgb(255, 61, 61)"} : null}
            defaultValue={newpass} 
            onChange={(e)=>setNewpass(e.target.value)} 
            onClick={()=> setNewPassErrorMsg("")}
          />
          <p className="newPassError">{newPassErrorMsg}</p>
					
					<label htmlFor="newpass2Input"><p>Confirm new password</p></label>
          <input 
            required 
            id="newpass2Input" 
            type="password" 
            style={cNewPassErrorMsg !== "" ? {border: "1px solid rgb(255, 61, 61)"} : null}
            defaultValue={newpass2} 
            onChange={(e)=>setNewpass2(e.target.value)} 
            onClick={()=> setCNewPassErrorMsg("")}
          />
          <p className="cNewPassError">{cNewPassErrorMsg}</p>

					<button type="submit" >Update password</button>
				</form>
				
			</div>
		
		</div>
  )
  
  function handleUpdatePassword(e){
    e.preventDefault()

    if (password.length < 4 || password.length > 30){
      setPassErrorMsg("Password must be between 4 and 30 characters long")
      return
    }
    else if (!password.match(/^[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?a-zA-Z0-9]{4,30}$/gm)){
      setPassErrorMsg("Passwords contains inappropriate characters")
      return
    }
    // server request and validation

  }
}

export default AccountPrivacy;
