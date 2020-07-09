import React, {useState, useEffect, useContext} from 'react'
import {useLocation, Link} from 'react-router-dom'
import axios from 'axios'
import Filter from 'bad-words'

import {createNotification} from '../App'
import Sidebar from '../components/Sidebar'
import {UserContext} from '../UserContext'

const profanityFilter = new Filter({ regex: /^\*|\.|$/gi })

function AddReputation() {
  const [repInfo, setRepInfo] = useState() 
  const [userID, setUserID] = useState(useLocation().pathname.substring(16)) // reads url after /reputation/add/ till the end

  const [repCategory, setRepCategory] = useState()
  const [feedback, setFeedback] = useState()
  const [repErrorMessage, setRepErrorMessage] = useState("")

  const {myID} = useContext(UserContext)

  useEffect(()=> {
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

  if (repInfo !== undefined && repInfo !== "invalid")
  return (



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
          <Link style={{textDecoration: "none"}} to={`/reputation/${repInfo.userId}`}>
              <button className="rep-addrep-button">
                <img src={require('../images/other/Reputation orange.png')} className="rep-icon-inButton"/>Full reputation
              </button>
            </Link>

            <section className="rep-cutout"></section>
            <div className="rep-ups-downs">
              <span className="rep-ups">+{repInfo.ups}</span>
              <span className="rep-middle"> </span>
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
          className="rep-comment-input" 
          value = {feedback}
        />

        <p className="repErrorText">{repErrorMessage}</p>

        <button onClick={()=> handleRepSubmit(true)} className="rep-button">Complete as positive</button>
        <button onClick={()=> handleRepSubmit(false)} className="rep-button negative">Complete as negative</button>
        {/*<button className="rep-button-back">Back to reputation</button>*/}

      </main>
      
  )
  else if (repInfo === "invalid")
    return (
      <div className="rep-noUserFound-container">
        <p>Whoops no user matches that ID :'(</p>
        <a id="removeDecoration" href="/reputation">&#8617; Back to my reputation</a>
      </div>
    )
    else return null // <Spinner className="newPosition"> 

  
  /*-----Functions                -------------*/

  function handleRepSubmit(good_bad){

    if (myID === userID){
      setRepErrorMessage("You can't rep yourself")
      repErrorMessage !== "You can't rep yourself" && createNotification("error", "You can't rep yourself")
      return
    }

    if (repCategory === undefined){
      setRepErrorMessage("You have to pick a rep category 1st")
      repErrorMessage !== "You have to pick a rep category 1st" && createNotification("error", "Pick a rep category 1st")
      return
    }

    if (feedback === undefined || feedback.replace(/\s/g, '').length < 5) {
      setRepErrorMessage("Your message has to be at least 5 characters long")
      repErrorMessage !== "Your message has to be at least 5 characters long" && createNotification("error", "Your message has to be at least 5 characters long")
      return
    }

    if (feedback.length > 100) {
      setRepErrorMessage("Your message is too long, max 100 characters")
      repErrorMessage !== "Your message is too long, max 100 characters" && createNotification("error", "Your message is too long")
      return
    }

    if (!feedback.match(/^[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?a-zA-Z0-9 ]{5,100}$/gm)) {
      setRepErrorMessage("Your message includes inappropriate characters")
      repErrorMessage !== "Your message includes inappropriate characters" && createNotification("error", "Your message includes inappropriate characters")
      return
    }
    if (feedback.match(/\b(?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+(?:[\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/.*)?\b/gm)) {
      setRepErrorMessage("Your message must not inlcude links")
      repErrorMessage !== "Your message must not inlcude links" && createNotification("error", "Your message must not inlcude links")
      return
    }

  
    axios.post(`/api/reputation/addRep/${userID}`, {
      rep: {
        good: good_bad,
        feedback: profanityFilter.clean(feedback),
        game: repCategory
      }
    })
    .then(res => {console.log(res)
      if (res.data.status === "success"){
        setFeedback("")
        setRepCategory()
        setRepErrorMessage("")
        createNotification("success", "Reputation was submitted")
      }
      else if (res.data.status === "hours24"){
        setRepErrorMessage("You can only leave a rep for the same person once in 24 hours")
        repErrorMessage !== "You can only leave a rep for the same person once in 24 hours" && createNotification("error", `You have already repped ${repInfo.username}`)
        return
      }
    })
    .catch(err => console.log(err))
  }
}

export default AddReputation
