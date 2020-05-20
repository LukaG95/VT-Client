import React, {useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import test_rep from '../info/test_reputation'

function Reputation() {
  const [repType, setRepType] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(()=> {

  }, [repType, currentPage])

  function Reps(){
    const reps = test_rep.reps.map(rep => 
      <div className={"rep-container" }>
        <div className="rep-vote" style={rep.good ? {backgroundColor: "#2C8E54"} : {backgroundColor: "#CE4646"}} >{rep.good ? "+ " : "- "}1</div>
        <p style={{marginLeft: "19px", width: "114px"}}>{rep.createdBy}</p>
        <p style={{width: "150px"}}>{rep.dateTime}</p>
        <p>{rep.feedback}</p>
      </div>
    )
    return reps
  }

  function PageNumbers(){
    const pageButtons = []

    const starting_number = () => {
      if (currentPage <= 5) 
        return 1 
      else if (currentPage + 5 >= test_rep.pageAmount)
        return test_rep.pageAmount - 9
      else 
        return currentPage - 5
    }
  
    for (let i = starting_number(); i < starting_number() + 10; i++)
      pageButtons.push(
        i === currentPage ? 
        <button className="pageButton highlighted-page">{i}</button> : 
        <button className="pageButton" onClick={() => setCurrentPage(i)}>{i}</button>
      )

    return(
      <section style={{marginTop: "20px"}} className="page-numbers">
        <div onClick={()=> currentPage > 1 && setCurrentPage(prev => prev - 1)} className="page-left noUserInteraction"></div>
          {pageButtons}
        <div onClick={()=> currentPage < 100 && setCurrentPage(prev => prev + 1)} className="page-right noUserInteraction"></div>
      </section>
    )
  }

  return (
    <div className="secondaryWrapper">

      <Sidebar />
      
      <main className="repWrapper">

        <div>
          <input placeholder="(SteamID, Discord or VT Name)" className="rep-search-input"></input>
        </div>

        <div className="repHeader">
          <div className="flex">
            <div className="flex-col rep-header-left">
              <p className="rep-username">{test_rep.username}'s Reputation</p>
              <p className="rep-title">{test_rep.title}</p>
            </div>
            <p className="rep-grade">{test_rep.grade}</p>
          </div>

          <div className="flex rep-header-right">
            <button className="rep-addrep-button"><img src={require('../images/other/Reputation orange.png')} className="rep-icon-inButton"/>Add reputation</button>
            <section className="rep-cutout"></section>
            <div className="rep-ups-downs">
              <span className="rep-ups">+{test_rep.ups}</span>
              <span className="rep-middle"> | </span>
              <span className="rep-downs">-{test_rep.downs}</span>
            </div>
          </div>
        </div>

        <section className="rep-inbetween-section">
          <div className="rep-inbetween-section-left">
            <p>Created By</p>
            <p>Date &#38; Time (UTC)</p>
            <p>Feedback</p>
          </div>

          <div className="rep-inbetween-section-right">
            <button onClick={()=> setRepType("all")} style={repType==="all" ? {color: "#E7AA0F"} : null}> All ({test_rep.amount.all}) /&nbsp;</button>
            <button onClick={()=> setRepType("csgo")} style={repType==="csgo" ? {color: "#E7AA0F"} : null}> CSGO ({test_rep.amount.csgo}) /&nbsp;</button>
            <button onClick={()=> setRepType("rl")} style={repType==="rl" ? {color: "#E7AA0F"} : null}> RL ({test_rep.amount.rl}) /&nbsp;</button>
            <button onClick={()=> setRepType("other")} style={repType==="other" ? {color: "#E7AA0F"} : null}> Other ({test_rep.amount.other})</button>
          </div>
        </section>

        <Reps />
       
        <PageNumbers />

      </main>
      
    </div>
  )
}

export default Reputation;
