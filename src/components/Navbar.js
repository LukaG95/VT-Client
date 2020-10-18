import React, {useContext} from 'react'
import {Link, useLocation} from 'react-router-dom'

import {UserContext} from '../UserContext'
import {PopupContext} from './PopupContext'
import {ReactComponent as TradingWhite} from '../images/other/tradingWhite.svg'
import {ReactComponent as ReputationWhite} from '../images/other/reputationWhite.svg'
import {ReactComponent as PricesWhite} from '../images/other/pricesWhite.svg'
import {ReactComponent as CrownIcon} from '../images/other/crown.svg'
import {ReactComponent as LogoIcon} from '../images/logo/vt-red.svg'
import {ReactComponent as BellIcon} from '../images/other/bellWhite.svg'
import {ReactComponent as ProfileIcon} from '../images/other/profile.svg'

function Navbar() {
  let location = useLocation()
  let trading = "", prices = "", reputation ="", premium = ""

  const {isLoggedIn, username} = useContext(UserContext)
  const {openForm, setOpenForm} = useContext(PopupContext)

  switch(location.pathname) {
  case "/trading/rl":
      trading = "currentPage"
    break;
  case "/":
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

        <div className="navLeftItem">
          <Link to="/" style={{marginLeft: "10px", marginRight: "15px"}}>  
            <LogoIcon style={{width: "150px", height: "150px"}} />
          </Link>
        </div>

        <div className="navRightItem" id="separator"></div>

        <Link to="/trading/rl" id="removeDecoration" style={{marginLeft: "20px"}}>
          <div className="navLeftItem">
            <div className={`navLeftContent ${trading}`}>Trading</div>
          </div>
        </Link>

        <Link to="/reputation" id="removeDecoration">
          <div className="navLeftItem" id="removeDecoration">
            <div className={`navLeftContent ${reputation}`}>Reputation</div>
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

        <div className="navRightItem" id="separator"></div>
       
        {handleIconDisplay()}

      </div>                         

    </nav>
  )


  /*-----Functions                -------------*/
  
  function handleIconDisplay(){
    if(isLoggedIn) 
      return(
        <Link to="/account/settings" id="removeDecoration">
          <div className="navRightItem profile">
            <ProfileIcon style={{height: "40px", width: "40px"}} className="navRightContent" />
            <p style={{marginLeft: "10px"}}>{username}</p>
          </div> 
        </Link>
      )
      else if (isLoggedIn === undefined) 
        return (
          <div className="navRightItem profile"></div>
        )
      else return <div onClick={()=>setOpenForm(true)} className="navRightItem profile loginButton">Login</div>
  }
}


export default Navbar
