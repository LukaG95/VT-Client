import React, {useContext} from 'react'

import AccountSidebar from './AccountSidebar'
import {UserContext} from '../../UserContext'

function AccountPlatforms() {

  const {user} = useContext(UserContext)

	return (
		<div className="secondaryWrapper accountWrapper">
		
			<AccountSidebar />
			
			<div className="accountFieldsWrapper">
			
				<form onSubmit={(e)=>{e.preventDefault();handleUpdateDiscord()}}>
        <label><p>Discord {user.discord && <>&#x2714;</>}</p></label>
					{!user.discord && <button>Log in with Discord</button>}
				</form>
				
				<form onSubmit={(e)=>{e.preventDefault();handleUpdateSteam()}}>
          <label><p>Steam {user.steam && <>&#x2714;</>}</p></label>
					{!user.steam && <button>Log in with Steam</button>}
				</form>
				
			</div>
		
		</div>
  )
  
  /*-----Functions                -------------*/

  function handleUpdateDiscord() {
    console.log('Discord button was clicked')
  }
  
  function handleUpdateSteam() {
    console.log('Steam button was clicked')
  }
}

export default AccountPlatforms
