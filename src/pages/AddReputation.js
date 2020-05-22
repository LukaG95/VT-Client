import React, {useState, useEffect} from 'react'
import {useLocation, Link} from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import test_rep from '../info/test_reputation'

function AddReputation() {
  const [repCategory, setRepCategory] = useState()
  const [path, setPath] = useState(useLocation().pathname)


  useEffect(()=> {
    const id = path.substr(16)

    
  }, [])


  return (
    <div className="secondaryWrapper">

      <Sidebar />

      <main className="repWrapper">
        
        <div className="repHeader">
          <div className="flex">
            <div className="flex-col rep-header-left">
              <p className="rep-username">{test_rep.username}'s Reputation</p>
              <p className="rep-title">{test_rep.title}</p>
            </div>
            <p className="rep-grade">{test_rep.grade}</p>
          </div>

          <div className="flex rep-header-right">
            <section className="rep-cutout"></section>
            <div className="rep-ups-downs">
              <span className="rep-ups">+{test_rep.ups}</span>
              <span className="rep-middle"> | </span>
              <span className="rep-downs">-{test_rep.downs}</span>
            </div>
          </div>
        </div>
        
        <div className="rep-category-buttons">
          <button style={repCategory === "rl" ? {background: "#47384D"} : null} onClick={() => setRepCategory("rl")}>Rocket League</button>
          <button style={repCategory === "csgo" ? {background: "#47384D"} : null} onClick={() => setRepCategory("csgo")}>CSGO</button>
          <button style={repCategory === "other" ? {background: "#47384D"} : null} onClick={() => setRepCategory("other")}>Other</button>
        </div>

        <textarea placeholder="Add a comment..." className="rep-comment-input">
         
        </textarea>

        <button className="rep-button">Complete as positive</button>
        <button className="rep-button negative">Complete as negative</button>

      </main>
      
    </div>
  )
}

export default AddReputation;
