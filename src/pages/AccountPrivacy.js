import React, {useState} from 'react'
import AccountSidebar from '../components/AccountSidebar'

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function handleUpdatePassword(password, newpass, newpass2) {
	if(isEmptyOrSpaces(password) || isEmptyOrSpaces(newpass) || isEmptyOrSpaces(newpass2)) return;
	if(newpass !== newpass2) return alert("passwords don't match!");
	
	console.log(`${password}, ${newpass}, ${newpass2}`);
	alert(`${password}, ${newpass}, ${newpass2}`);
}

function AccountPrivacy() {
	
	const [password, setPassword] = useState("")
	const [newpass, setNewpass] = useState("")
	const [newpass2, setNewpass2] = useState("")
	
	return (
		<div className="secondaryWrapper accountWrapper">
		
			<AccountSidebar />
			
			<div class="accountFieldsWrapper">
			
				<form onClick={(e)=>{e.preventDefault();handleUpdatePassword(password, newpass, newpass2)}}>
					<label for="curpassInput">Current password</label>
					<input required id="curpassInput" type="password" placeholder="old password" defaultValue={password} onChange={(e)=>setPassword(e.target.value)} />
					
					<label for="newpassInput">New password</label>
					<input required id="newpassInput" type="password" placeholder="new password" defaultValue={newpass} onChange={(e)=>setNewpass(e.target.value)} />
					
					<label for="newpass2Input">Confirm new password</label>
					<input required id="newpass2Input" type="password" placeholder="new password" defaultValue={newpass2} onChange={(e)=>setNewpass2(e.target.value)} />
					<button>Update password</button>
				</form>
				
			</div>
		
		</div>
	)
}

export default AccountPrivacy;
