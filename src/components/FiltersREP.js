import React, {useState, useEffect} from 'react'
import axios from 'axios'

function FiltersREP() {
  const [leadInfo, setLeadInfo] = useState()
  const [timeType, setTimeType] = useState("Week") 

  const trophy = <img style={{height: "25px", width: "25px", marginLeft: "45px"}} src={require("../images/other/cup.png")} />
  const goldTrophy = <img style={{height: "20px", width: "20px"}} src={require("../images/other/cup.png")} />
  const silverTrophy = <img style={{height: "20px", width: "20px"}} src={require("../images/other/cup.png")} />
  const bronzeTrophy = <img style={{height: "20px", width: "20px"}} src={require("../images/other/cup.png")} />

  const hr = <div id="hr-line"></div>

  useEffect(()=> {
    axios.get(`/api/reputation/top10`)
      .then (res => { 
        setLeadInfo(res.data.top10)
        console.log(res.data.top10)
      })
      .catch(err => console.log(err))
  }, [])

/*function leadComponents(){
    leadInfo.map((item, i) => {
      if(i === 1) 
        return (
          <div> 
            <div>{goldTrophy} {leadInfo ? leadInfo[0].username : null}</div> 
            <p>+200</p>
          </div>
        ) 
        else if(i === 2) 
          return (
            <div className="leaderboards-component"> 
              <div>{silverTrophy} {leadInfo ? leadInfo[1].username : null}</div> 
              <p>+200</p>
            </div>
          )
        else if (i === 3)
          return (
            <div className="leaderboards-component"> 
              <div>{silverTrophy} {leadInfo ? leadInfo[1].username : null}</div> 
              <p>+200</p>
            </div>
          )
    })

    return(
      <div className="leaderboards-body">
        <div> {goldTrophy} first</div>
        <div> {silverTrophy} second</div>
        <div> {bronzetrophy} third</div>
        <div> {leadInfo[0].username} </div>
        <div> 5 </div>
        <div> 6 </div>
        <div> 7 </div>
        <div> 8 </div>
        <div> 9 </div>
        <div> 10 </div>
      </div>
)}*/

  return (
    <div className="sbSection leaderboards-wrapper">

      <div className="leaderboards-header">
        <p>LEADERBOARDS</p>
        {trophy}
      </div>

      <div className="leaderboards-body">

        <div className="leaderboards-component" id="firstPlace"> 
          <div>{goldTrophy} <span className="paddingBetween" /> {leadInfo ? leadInfo[0] && leadInfo[0].username : null}</div> 
          <p>{leadInfo ? leadInfo[0] && leadInfo[0].repRating : null}</p>
        </div>

        {hr}

        <div className="leaderboards-component" id="secondPlace"> 
          <div>{silverTrophy} <span className="paddingBetween" /> {leadInfo ? leadInfo[1] && leadInfo[1].username : null}</div> 
          <p>{leadInfo ? leadInfo[1] && leadInfo[1].repRating : null}</p>
        </div>

        {hr}

        <div className="leaderboards-component" id="thirdPlace"> 
          <div>{bronzeTrophy} <span className="paddingBetween" /> {leadInfo ? leadInfo[2] && leadInfo[2].username : null}</div> 
          <p>{leadInfo ? leadInfo[2] && leadInfo[2].repRating : null}</p>
        </div>

        {hr}

        <div className="leaderboards-component"> 
          <div> 4 <span className="paddingBetween2" /> {leadInfo ? leadInfo[3] && leadInfo[3].username : null} </div>
          <p>{leadInfo ? leadInfo[3] && leadInfo[3].repRating : null}</p>
        </div>

        {hr}

        <div className="leaderboards-component"> 
          <div> 5 <span className="paddingBetween2" /> {leadInfo ? leadInfo[4] && leadInfo[4].username : null} </div>
          <p>{leadInfo ? leadInfo[4] && leadInfo[4].repRating : null}</p>
        </div>
        

        {hr}

        <div className="leaderboards-component"> 
          <div> 6 <span className="paddingBetween2" /> {leadInfo ? leadInfo[5] && leadInfo[5].username : null} </div>
          <p>{leadInfo ? leadInfo[5] && leadInfo[5].repRating : null}</p>
        </div>

        {hr}

        <div className="leaderboards-component"> 
          <div> 7 <span className="paddingBetween2" /> {leadInfo ? leadInfo[5] && leadInfo[5].username : null} </div>
          <p>{leadInfo ? leadInfo[5] && leadInfo[5].repRating : null}</p>
        </div>

        {hr}

        <div className="leaderboards-component"> 
          <div> 8 <span className="paddingBetween2" /> {leadInfo ? leadInfo[5] && leadInfo[5].username : null} </div>
          <p>{leadInfo ? leadInfo[5] && leadInfo[5].repRating : null}</p>
        </div>

        {hr}

        <div className="leaderboards-component"> 
          <div> 9 <span className="paddingBetween2" /> {leadInfo ? leadInfo[5] && leadInfo[5].username : null} </div>
          <p>{leadInfo ? leadInfo[5] && leadInfo[5].repRating : null}</p>
        </div>

        {hr}

        <div className="leaderboards-component"> 
          <div> 10 <span className="paddingBetween2" /> {leadInfo ? leadInfo[5] && leadInfo[5].username : null} </div>
          <p>{leadInfo ? leadInfo[5] && leadInfo[5].repRating : null}</p>
        </div>

      </div>

    </div>
  )
}

export default FiltersREP
