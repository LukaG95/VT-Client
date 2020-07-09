import React, {useContext} from 'react'
import {Link, useLocation} from 'react-router-dom'

import {UserContext} from '../UserContext'
import {PopupContext} from './PopupContext'
import {ReactComponent as Logo} from '../images/logo/logo.svg'
import {ReactComponent as TradingWhite} from '../images/other/tradingWhite.svg'
import {ReactComponent as ReputationWhite} from '../images/other/reputationWhite.svg'
import {ReactComponent as PricesWhite} from '../images/other/pricesWhite.svg'
import {ReactComponent as CrownIcon} from '../images/other/crown.svg'
import {ReactComponent as BellIcon} from '../images/other/bellWhite.svg'
import {ReactComponent as ProfileIcon} from '../images/other/profile.svg'

function Navbar() {
  let location = useLocation()
  let trading = "", prices = "", reputation ="", premium = ""

  const {isLoggedIn} = useContext(UserContext)
  const {openForm, setOpenForm} = useContext(PopupContext)

  switch(location.pathname) {
  case "/trading/rl":
      trading = "currentPage"
    break;
  case "/prices":
      prices = "currentPage"
    break;
  case "/reputation":
      reputation = "currentPage"
    break;
  case "/premium":
      premium = "currentPage"
  break;
  default:
} 

  return (
    <nav className="navWrapper">     

      <div className="navLeft">    

        <div className="navLeftItem" id="logo">
          <Link id="center" to="/trading/rl"> <Logo style={{height: "40px", width: "40px"}} /></Link>
        </div>
        

        <Link to="/trading/rl" id="removeDecoration">
          <div className={`navLeftItem ${trading}`}>
            <TradingWhite style={{height: "13px", width: "13px"}} className="navLeftContent"/>
            <div className="navLeftContent">Trading</div>
          </div>
        </Link>

        <Link to="/reputation" id="removeDecoration">
          <div className={`navLeftItem ${reputation}`} id="removeDecoration">
            <ReputationWhite style={{height: "13px", width: "13px"}} className="navLeftContent" />
            <div className="navLeftContent">Reputation</div>
          </div>
        </Link>
      {/*
        <Link to="/prices" id="removeDecoration">
          <div className={`navLeftItem ${prices}`}>
            <PricesWhite style={{height: "13px", width: "13px"}} className="navLeftContent" />
            <div className="navLeftContent">Prices</div>
          </div>
        </Link>
      */}
        
      {/*
        <Link to="/premium" id="removeDecoration">
          <div className={`navLeftItem ${premium}`}>
            <CrownIcon style={{height: "13px", width: "13px"}} className="navLeftContent" />
            <div className="navLeftContent">Premium</div>
          </div>
        </Link>
      */}

      </div>                         

      <div className="navRight">     

        <div className="navRightItem tradeBellSection">
          <div onClick={()=> isLoggedIn ? window.location.href = "/trading/rl/new" : setOpenForm(true)} className="navRightContent addTrade">+ New trade</div>
          <BellIcon style={{height: "25px", width: "25px"}} className="navRightContent bell" />
        </div>
       
        {handleIconDisplay()}

      </div>                         

    </nav>
  )


  /*-----Functions                -------------*/
  
  function handleIconDisplay(){
    if(isLoggedIn) return(
      <Link to="/account">
        <div className="navRightItem profile">
          <ProfileIcon style={{height: "40px", width: "40px"}} className="navRightContent" />
        </div> 
      </Link>
    )
      else if (isLoggedIn === undefined) return (
        <div className="navRightItem profile"></div>
      )
      else return <div onClick={()=>setOpenForm(true)} className="navRightItem profile loginButton">Login</div>
  }
}


export default Navbar;
