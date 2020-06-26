import React, {useState, useContext, useEffect} from 'react'
import AccountSidebar from '../../components/AccountSidebar'
import Tooltip from '../../components/Tooltip'
import Filter from 'bad-words'

import {UserContext} from '../../UserContext'

const profanityFilter = new Filter({ regex: /^\*|\.|$/gi })

function MyAccount() {
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("")
  const [emailErrorMsg, setEmailErrorMsg] = useState("")

  const [newUsername, setNewUsername] = useState()
  const [newEmail, setNewEmail] = useState()
	
  const {username, email} = useContext(UserContext);
  
  useEffect(() => {
    setNewUsername(username)
    setNewEmail(email)
  }, [username, email])

	return (
		<div className="secondaryWrapper accountWrapper">
		
			<AccountSidebar />
			
			<div className="accountFieldsWrapper">
			
				<form onSubmit={e => handleUpdateUsername(e)}>
					<label htmlFor="usernameInput"><p>Username</p></label>
					<Tooltip tip="You can only change your Username once per month" />
          <input 
            required 
            id="usernameInput" 
            type="text" 
            style={usernameErrorMsg !== "" ? {border: "1px solid rgb(255, 61, 61)"} : null}
            defaultValue={newUsername} 
            onChange={e => setNewUsername(e.target.value)}
            onClick={()=> setUsernameErrorMsg("")}
          />
          <p className="accountUnError">{usernameErrorMsg}</p>
					<button>Update username</button>
				</form>
				
				<form onSubmit={e=> handleUpdateEmail(e)}>
					<label htmlFor="emailInput"><p>Email</p></label>
					<input required id="emailInput" type="email" defaultValue={newEmail} onChange={e => setNewEmail(e.target.value)} />
          <p className="accountEmailError">{emailErrorMsg}</p>
					<button>Update email</button>
				</form>
				
			</div>
		
		</div>
  )
  
  function handleUpdateUsername(e) {
    e.preventDefault()

    if (newUsername.replace(/\s/g, '').length < 2 || newUsername.length > 15){
      setUsernameErrorMsg("Username must be between 2 and 15 characters long")
      return
    }
    else if (!newUsername.match(/^(?!.*[ ]{2,})[a-zA-Z0-9 _-]{2,15}$/gm)){
      setUsernameErrorMsg("Username can only contain characters a-z, 0-9, or '- _'")
      return
    }
    else if (profanityFilter.isProfane(newUsername)){
      setUsernameErrorMsg("Username contains innapropriate words")
      return
    }

    // server request for username update
  
  }

  function handleUpdateEmail(e) {
    e.preventDefault()

    // server request for email update
  }

}

export default MyAccount
