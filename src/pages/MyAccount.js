import React, {useState, useContext} from 'react'
import AccountSidebar from '../components/AccountSidebar'
import Tooltip from '../components/Tooltip'

import {UserContext} from '../UserContext'

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

function isEmail(str) {
	return str === null || str.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/) !== null;
}

function handleUpdateUsername(username) {
	if(isEmptyOrSpaces(username)) return;
	
	console.log('A username was submitted: ' + username);
	alert('A username was submitted: ' + username);
}

function handleUpdateEmail(email) {
	if(!isEmail(email)) return;
	
	console.log('A email was submitted: ' + email);
	alert('A email was submitted: ' + email);
}

function MyAccount() {
	
	const {username, setUsername} = useContext(UserContext);
	const [email, setEmail] = useState("glukec4444@gmail.com");
	
	return (
		<div className="secondaryWrapper accountWrapper">
		
			<AccountSidebar />
			
			<div className="accountFieldsWrapper">
			
				<form onSubmit={(e)=>{e.preventDefault();handleUpdateUsername(username)}}>
					<label htmlFor="usernameInput"><p>Username</p></label>
					<Tooltip tip="You can only change Username once every 10 years" />
					<input required id="usernameInput" type="text" placeholder="username" defaultValue={username} onChange={(e)=>setUsername(e.target.value)} />
					<button>Update username</button>
				</form>
				
				<form onSubmit={(e)=>{e.preventDefault();handleUpdateEmail(email)}}>
					<label htmlFor="emailInput"><p>Email</p></label>
					<input required id="emailInput" type="email" placeholder="email" defaultValue={email} onChange={(e)=>setEmail(e.target.value)} />
					<button>Update email</button>
				</form>
				
			</div>
		
		</div>
	)
}

export default MyAccount
