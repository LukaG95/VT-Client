import React from 'react'

import AccountSidebar from '../../components/AccountSidebar'

function AccountPlatforms() {
	return (
		<div className="secondaryWrapper accountWrapper">
		
			<AccountSidebar />
			
			<div className="accountFieldsWrapper">
			
				<form onSubmit={(e)=>{e.preventDefault();handleUpdateDiscord()}}>
					<label><p>Discord</p></label>
					<button>Log in with Discord</button>
				</form>
				
				<form onSubmit={(e)=>{e.preventDefault();handleUpdateSteam()}}>
					<label><p>Steam</p></label>
					<button>Log in with Steam</button>
				</form>
				
			</div>
		
		</div>
  )
  
  /*-----Functions                -------------*/

  function handleUpdateDiscord() {
    console.log('Discord button was clicked');
  }
  
  function handleUpdateSteam() {
    console.log('Steam button was clicked');
  }
}

export default AccountPlatforms;
