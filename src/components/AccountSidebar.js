import React from 'react'
import {Link, useLocation} from 'react-router-dom'

function AccountSidebar() {
	let location = useLocation();
	let account = "", privacy = "", trades = "", platforms = "";
	
	switch(location.pathname) {
		case "/account":
			account = "currentPage";
			break;
		case "/account/privacy":
			privacy = "currentPage";
			break;
		case "/account/trades":
			trades = "currentPage";
			break;
		case "/account/platforms":
			platforms = "currentPage";
			break;
		default:
	}
	
	return (
		<div className="accountSb">
			
			<p className="accountSb-nav"><Link to="/account" className={account}>My Account</Link></p>
			<p className="accountSb-nav"><Link to="/account/privacy" className={privacy}>Privacy & Security</Link></p>
			<p className="accountSb-nav"><Link to="/account/trades" className={trades}>My Trades</Link></p>
			<p className="accountSb-nav"><Link to="/account/platforms" className={platforms}>Platforms</Link></p>
			
		</div>
	)
}

export default AccountSidebar;