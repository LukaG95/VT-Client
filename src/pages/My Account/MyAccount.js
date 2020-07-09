import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import Filter from 'bad-words'

import AccountSidebar from './AccountSidebar'
import Tooltip from '../../components/Tooltip'
import {UserContext} from '../../UserContext'
import {PopupContext} from '../../components/PopupContext'
import {createNotification} from '../../App'

const profanityFilter = new Filter({ regex: /^\*|\.|$/gi })

function MyAccount() {
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("")
  const [emailErrorMsg, setEmailErrorMsg] = useState("")

  const [newUsername, setNewUsername] = useState()
  const [newEmail, setNewEmail] = useState()
	
  const {username, email} = useContext(UserContext)

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


  /*-----Functions                -------------*/
  
  function handleUpdateUsername(e) {
    e.preventDefault()

    if (username === newUsername) return

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
    axios.put(`/api/auth/updateUsername`, {
      newUsername: newUsername
    })
    .then(res => { 
      if (res.data.status === "success"){
        createNotification("success", "You have updated your username")
      }
      else if (res.data.status === "username"){ 
        setUsernameErrorMsg("Username is taken")
      }
      else if (res.data.status === "days30"){
        setUsernameErrorMsg("You can only change your username once per month")
      }
      else createNotification("error", "Oops something went wrong...")
    })
    .catch(err => console.log(err))
  }

  function handleUpdateEmail(e) {
    e.preventDefault()

    if (email === newEmail) return

    // server request for email update
    axios.post(`/api/auth/sendResetEmailToken `, {
      newEmail: newEmail
    })
    .then(res => { 
      if (res.data.status === "success")
        createNotification("info", "Check your email for a confirmation link")
      else 
        createNotification("error", "Oops something went wrong...")
    })
    .catch(err => console.log(err))
  }

}

export default MyAccount
