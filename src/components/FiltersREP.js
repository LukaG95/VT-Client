import React, { useState, useEffect } from "react";
import axios from "axios";

function FiltersREP() {
  const [leadInfo, setLeadInfo] = useState();
  const [timeType, setTimeType] = useState("Week");

  const trophy = (
    <img
      style={{ height: "25px", width: "25px", marginLeft: "50px" }}
      src={require("../images/other/icon-trophy.png")}
      alt=""
    />
  );
  const goldTrophy = (
    <img
      style={{ height: "25px", width: "25px" }}
      src={require("../images/other/icon-1st.png")}
      alt=""
    />
  );
  const silverTrophy = (
    <img
      style={{ height: "25px", width: "25px" }}
      src={require("../images/other/icon-2nd.png")}
      alt=""
    />
  );
  const bronzeTrophy = (
    <img
      style={{ height: "25px", width: "25px" }}
      src={require("../images/other/icon-3rd.png")}
      alt=""
    />
  );

  const hr = <div id="hr-line"></div>;

  useEffect(() => {
    axios
      .get(`/api/reputation/top10`)
      .then((res) => {
        setLeadInfo(res.data.top10);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="sbSection leaderboards-wrapper">
      <div className="leaderboards-header">
        <p>LEADERBOARDS</p>
        {trophy}
      </div>

      <div className="leaderboards-body">
        <div className="leaderboards-component" id="firstPlace">
          <div>
            {goldTrophy} <span className="paddingBetween" />
            {leadInfo
              ? leadInfo[timeType][0] && leadInfo[timeType][0].username
              : null}
          </div>
          {leadInfo
            ? leadInfo[timeType][0] && <p>{leadInfo[timeType][0].repRating}</p>
            : null}
        </div>

        {hr}

        <div className="leaderboards-component" id="secondPlace">
          <div>
            {silverTrophy} <span className="paddingBetween" />
            {leadInfo
              ? leadInfo[timeType][1] && leadInfo[timeType][1].username
              : null}
          </div>
          {leadInfo
            ? leadInfo[timeType][1] && <p>{leadInfo[timeType][1].repRating}</p>
            : null}
        </div>

        {hr}

        <div className="leaderboards-component" id="thirdPlace">
          <div>
            {bronzeTrophy} <span className="paddingBetween" />
            {leadInfo
              ? leadInfo[timeType][2] && leadInfo[timeType][2].username
              : null}
          </div>
          {leadInfo
            ? leadInfo[timeType][2] && <p>{leadInfo[timeType][2].repRating}</p>
            : null}
        </div>

        {hr}

        <div className="leaderboards-component">
          <div>
            
            4 <span className="paddingBetween2" />
            {leadInfo
              ? leadInfo[timeType][3] && leadInfo[timeType][3].username
              : null}
          </div>
          {leadInfo
            ? leadInfo[timeType][3] && <p>{leadInfo[timeType][3].repRating}</p>
            : null}
        </div>

        {hr}

        <div className="leaderboards-component">
          <div>
            
            5 <span className="paddingBetween2" />
            {leadInfo
              ? leadInfo[timeType][4] && leadInfo[timeType][4].username
              : null}
          </div>
          {leadInfo
            ? leadInfo[timeType][4] && <p>{leadInfo[timeType][4].repRating}</p>
            : null}
        </div>

        {hr}

        <div className="leaderboards-component">
          <div>
            
            6 <span className="paddingBetween2" />
            {leadInfo
              ? leadInfo[timeType][5] && leadInfo[timeType][5].username
              : null}
          </div>
          {leadInfo
            ? leadInfo[timeType][5] && <p>{leadInfo[timeType][5].repRating}</p>
            : null}
        </div>

        {hr}

        <div className="leaderboards-component">
          <div>
            
            7 <span className="paddingBetween2" />
            {leadInfo
              ? leadInfo[timeType][6] && leadInfo[timeType][6].username
              : null}
          </div>
          {leadInfo
            ? leadInfo[timeType][6] && <p>{leadInfo[timeType][6].repRating}</p>
            : null}
        </div>

        {hr}

        <div className="leaderboards-component">
          <div>
            
            8 <span className="paddingBetween2" />
            {leadInfo
              ? leadInfo[timeType][7] && leadInfo[timeType][7].username
              : null}
          </div>
          {leadInfo
            ? leadInfo[timeType][7] && <p>{leadInfo[timeType][7].repRating}</p>
            : null}
        </div>

        {hr}

        <div className="leaderboards-component">
          <div>
            
            9 <span className="paddingBetween2" />
            {leadInfo
              ? leadInfo[timeType][8] && leadInfo[timeType][8].username
              : null}
          </div>
          {leadInfo
            ? leadInfo[timeType][8] && <p>{leadInfo[timeType][8].repRating}</p>
            : null}
        </div>

        {hr}

        <div className="leaderboards-component">
          <div>
            
            10 <span className="paddingBetween2" />
            {leadInfo
              ? leadInfo[timeType][9] && leadInfo[timeType][9].username
              : null}
          </div>
          {leadInfo
            ? leadInfo[timeType][9] && <p>{leadInfo[timeType][9].repRating}</p>
            : null}
        </div>
      </div>

      <div className="timeType">
        <button
          onClick={() => setTimeType("All")}
          style={timeType === "All" ? { color: "#E7AA0F" } : null}
        >
          
          All time &nbsp;&nbsp;
        </button>
        <button
          onClick={() => setTimeType("Month")}
          style={timeType === "Month" ? { color: "#E7AA0F" } : null}
        >
          
          Month &nbsp;&nbsp;
        </button>
        <button
          onClick={() => setTimeType("Week")}
          style={timeType === "Week" ? { color: "#E7AA0F" } : null}
        >
          
          Week
        </button>
      </div>
    </div>
  );

  /*-----Functions                -------------*/
}

export default FiltersREP;
