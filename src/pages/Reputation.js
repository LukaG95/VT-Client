import React, {useState, useEffect, useContext} from 'react'
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios'

import {UserContext} from '../UserContext'
import { createNotification } from '../App'

function Reputation() {
  const [repInfo, setRepInfo] = useState() 
  const [repType, setRepType] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")

  const {myID, isLoggedIn} = useContext(UserContext)

  const pathID = useLocation().pathname.substring(12) // reads url after /reputation/ till the end 

  useEffect(()=> {
    if (myID === undefined && pathID === "") {
      setRepInfo(undefined)
      return
    }

    let searchUserID = 0
    if (pathID === ""){
      searchUserID = myID
    }
    else 
      searchUserID = pathID

    axios.get(`/api/reputation/${searchUserID}`)
    .then (res => { 
      if (res.data.info === "success")
        setRepInfo(res.data.rep)
      else /*if (res.data.status === "invalid")*/
        setRepInfo("invalid")
    })
    .catch(err => console.log(err))

  }, [myID, pathID])


  if (repInfo !== undefined && repInfo !== "invalid")
  return (
    <main className="repWrapper">

      <div className="flex" style={{marginBottom: "20px"}}>
        <input 
          onChange = {e => setSearchValue(e.target.value)}
          placeholder="Search by username..." 
          className="rep-search-input">
        </input>
        <button className="searchRep-button" onClick={searchForUserRep}>
          <img style={{width: "11px", height: "11px", marginRight: "6px"}} src={require("../images/other/MagnGlass.png")} /> 
          SEARCH
        </button>
      </div>

      <div className="repHeader">
        <div className="flex">
          <div className="flex-col rep-header-left">
            <p className="rep-username">{repInfo.username}'s Reputation</p>
            <p className="rep-title">{repInfo.title}</p>
          </div>
          <p className="rep-grade">{repInfo.grade}</p>
        </div>

        <div className="flex rep-header-right">
          <Link style={{textDecoration: "none"}} to={`/reputation/add/${repInfo.userId}`}>
            {isLoggedIn && 
            <button className="rep-addrep-button">
              <img src={require('../images/other/Reputation orange.png')} className="rep-icon-inButton"/>Add reputation
            </button>}
          </Link>

          <section className="rep-cutout"></section>
          <div className="rep-ups-downs">
            <span className="rep-ups">+{repInfo.ups}</span>
            <span className="rep-middle"> </span>
            <span className="rep-downs">-{repInfo.downs}</span>
          </div>
        </div>
      </div>

      {repInfo.amount.all > 0 ? 
      <>
        <section className="rep-inbetween-section">
          <div className="rep-inbetween-section-left">
            <p style={{marginLeft: "80px"}}>Created By</p>
            <p style={{marginLeft: "145px"}}>Date &#38; Time (UTC)</p>
            <p style={{marginLeft: "60px"}}>Feedback</p>
          </div>

          <div className="rep-inbetween-section-right">
            <button onClick={()=> {setCurrentPage(1); setRepType("all")}} style={repType==="all" ? {color: "#E7AA0F"} : null}> All ({repInfo.amount.all}) /&nbsp;</button>
            <button onClick={()=> {setCurrentPage(1); setRepType("csgo")}} style={repType==="csgo" ? {color: "#E7AA0F"} : null}> CSGO ({repInfo.amount.csgo}) /&nbsp;</button>
            <button onClick={()=> {setCurrentPage(1); setRepType("rl")}} style={repType==="rl" ? {color: "#E7AA0F"} : null}> RL ({repInfo.amount.rl}) /&nbsp;</button>
            <button onClick={()=> {setCurrentPage(1); setRepType("other")}} style={repType==="other" ? {color: "#E7AA0F"} : null}> Other ({repInfo.amount.other})</button>
          </div>
        </section>

        <Reps />
      
        {repInfo.amount[repType] > 17 && <PageNumbers />}
      </>
      : <div className="noReputationMsg">User has no reputation in the database. Be the 1st one to 
      <Link to={`/reputation/add/${repInfo.userId}`} className="addRepButton2" id="removeDecoration"> add reputation</Link>
        </div>
      }

    </main> 
  )
  else if (repInfo === "invalid")
    return (
      <div className="rep-noUserFound-container">
        <p>Whoops no user matches that ID :'(</p>
        <a id="removeDecoration" href="/reputation">&#8617; Back to my reputation</a>
      </div>
    )
    else if (isLoggedIn === false && pathID === "") return (
      <div className="repSearch_wrapper">
          <input 
            onChange = {e => setSearchValue(e.target.value)}
            placeholder="Search by username..." 
            className="rep-search-input">
          </input>

          <button className="searchRep-button" onClick={searchForUserRep}>
            <img style={{width: "11px", height: "11px", marginRight: "6px"}} src={require("../images/other/MagnGlass.png")} /> 
            SEARCH
          </button>
      </div>
    )  
    else return null // <Spinner className="newPosition">


  /*-----Functions                -------------*/

  function searchForUserRep(){
    
    axios.get(`/api/auth/getUserByUsername/${searchValue}`)
    .then (res => { 
      if (res.data.info === "success")
        window.location.href = `/reputation/${res.data.user._id}`
    })
    .catch(err => {
      if (err.response.data.info === "no user")
        createNotification("error", "That user doesn't exist", "user doesn't exist") 
    })
  }

  function Reps(){
    const reps = repInfo.repsByGame[repType].map((rep, i) => {
      if (i >= currentPage * 17 - 17 && i <= currentPage * 17 - 1)
        return(
          <div className={"rep-container noUserInteraction" }>
            <div className="rep-vote" style={rep.good ? {backgroundColor: "#2C8E54"} : {backgroundColor: "#CE4646"}} >{rep.good ? "+ " : "- "}1</div>
            <p style={{marginLeft: "19px", width: "200px"}}>{rep.createdBy}</p>
            <p style={{width: "150px"}}>{rep.createdAt}</p>
            <p>{rep.feedback}</p>
          </div>
        )
    })
    return reps
  }

  function PageNumbers(){
    const pageButtons = []
    const x = repInfo.amount[repType] / 17
    const pageAmount = Number.isInteger(x) ? x : Math.floor(x + 1)

    const starting_number = () => {
      if (currentPage <= 5 || pageAmount <= 10) 
        return 1 
      else if (currentPage + 5 >= pageAmount)
        return pageAmount - 9
      else 
        return currentPage - 5
    }

    const ending_number = () => {
      if (pageAmount < 10)
        return pageAmount + 1
      else
        return starting_number() + 10
    }

    for (let i = starting_number(); i < ending_number(); i++)
      pageButtons.push(
        i === currentPage ? 
        <button className="pageButton highlighted-page">{i}</button> : 
        <button className="pageButton" onClick={() => setCurrentPage(i)}>{i}</button>
      )

    return(
      <section style={{marginTop: "20px"}} className="page-numbers">
        <div onClick={()=> currentPage > 1 && setCurrentPage(prev => prev - 1)} className="page-left noUserInteraction"></div>
          {pageButtons}
        <div onClick={()=> currentPage < pageAmount && setCurrentPage(prev => prev + 1)} className="page-right noUserInteraction"></div>
      </section>
    )
  }
}

export default Reputation
