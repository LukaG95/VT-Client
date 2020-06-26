import React from 'react'
import AccountSidebar from '../../components/AccountSidebar'
import {Link} from 'react-router-dom'

function AccountPlatforms() {
	return (
		<div className="secondaryWrapper accountWrapper">
		
			<AccountSidebar />
			
			<div className="accountFieldsWrapper">
    
        <div style={{marginTop: "50px"}}>
            <label><p>Are you sure you want to Logout?</p></label>
            <div className="underLogout">
              <Link to="/account" id="removeDecoration"><button id="logoutCancelButton">Cancel</button></Link>
              <button id="logoutAcceptButton">Logout</button>
            </div>
        </div>
				
			</div>
		
		</div>
	)
}

export default AccountPlatforms
