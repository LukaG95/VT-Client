import React from 'react'
import {Link, Route, useLocation} from 'react-router-dom'

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
			
			<p class="accountSb-nav"><a href="/account" className={`${account}`}>My Account</a></p>
			<p class="accountSb-nav"><Link to="/account/privacy"><a className={`${privacy}`}>Privacy & Security</a></Link></p>
			<p class="accountSb-nav"><a href="/account/trades" className={`${trades}`}>My Trades</a></p>
			<p class="accountSb-nav"><a href="/account/platforms" className={`${platforms}`}>Platforms</a></p>
			
		</div>
	)
}

export default AccountSidebar;