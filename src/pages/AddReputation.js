import React, {useState, useEffect, useContext} from 'react'
import {useLocation, Redirect} from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import test_rep from '../info/test_reputation'
import axios from 'axios'
import { UserContext } from '../UserContext'

function AddReputation() {
  const [repInfo, setRepInfo] = useState() 
  const [userID, setUserID] = useState(useLocation().pathname.substring(16)) // reads url after /reputation/add/ till the end

  const [repCategory, setRepCategory] = useState()
  const [feedback, setFeedback] = useState()

  const {myID} = useContext(UserContext)

  useEffect(()=> {console.log("useEffect")
    if (myID === undefined) return

    let searchUserID = 0
    if (userID === ""){
      searchUserID = "invalid"
    }
    else 
      searchUserID = userID

    axios.get(`/api/reputation/${searchUserID}`)
    .then (res => { 
      if (res.data.status === "success")
        setRepInfo(res.data.rep)
      else /*if (res.data.status === "invalid")*/
        setRepInfo("invalid")
    })
    .catch(err => console.log(err))
    
    
  }, [myID])

  function handleRepSubmit(good_bad){
    if (myID === userID){
      alert("You can't rep yourself")
      return
    }

    if (repCategory === undefined){
      alert("You have to pick a rep category 1st")
      return
    }

    if (feedback === undefined || feedback.replace(/\s/g, '').length < 5) {
      alert("Your message has to be at least 5 characters long")
      return
    }
  

    axios.post(`/api/reputation/addRep/${userID}`, {
      rep: {
        good: good_bad,
        feedback: feedback,
        game: repCategory
      }
    })
    .then(res => {
    })
    .catch(err => console.log(err))
  }

  if (repInfo !== undefined && repInfo !== "invalid")
  return (
    <div className="secondaryWrapper">

      <Sidebar />

      <main className="repWrapper">
        
        <div className="repHeader">
          <div className="flex">
            <div className="flex-col rep-header-left">
              <p className="rep-username">{repInfo.username}'s Reputation</p>
              <p className="rep-title">{repInfo.title}</p>
            </div>
            <p className="rep-grade">{repInfo.grade}</p>
          </div>

          <div className="flex rep-header-right">
            <section className="rep-cutout"></section>
            <div className="rep-ups-downs">
              <span className="rep-ups">+{repInfo.ups}</span>
              <span className="rep-middle"> | </span>
              <span className="rep-downs">-{repInfo.downs}</span>
            </div>
          </div>
        </div>
        
        <div className="rep-category-buttons">
          <button style={repCategory === "rl" ? {background: "#47384D"} : null} onClick={() => setRepCategory("rl")}>Rocket League</button>
          <button style={repCategory === "csgo" ? {background: "#47384D"} : null} onClick={() => setRepCategory("csgo")}>CSGO</button>
          <button style={repCategory === "other" ? {background: "#47384D"} : null} onClick={() => setRepCategory("other")}>Other</button>
        </div>

        <textarea 
          onChange={e => {
            setFeedback(e.target.value)
          }} 
          placeholder="Add a comment..." 
          className="rep-comment-input">
         
        </textarea>

        <button onClick={()=> handleRepSubmit(true)} className="rep-button">Complete as positive</button>
        <button onClick={()=> handleRepSubmit(false)} className="rep-button negative">Complete as negative</button>

      </main>
      
    </div>
  )
  else if (repInfo === "invalid")
    return (
      <div className="rep-noUserFound-container">
        <p>Whoops no user matches that ID :'(</p>
        <a id="removeDecoration" href="/reputation">&#8617; Back to my reputation</a>
      </div>
    )
    else return null // <Spinner className="newPosition"> 
}

export default AddReputation;
