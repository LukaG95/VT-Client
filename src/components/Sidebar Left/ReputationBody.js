import React, { useState, useEffect } from "react";
import axios from "axios";

import SidebarFooter from "./Footer";
import { ReactComponent as Badge1stIcon } from "../../images/icons/icon1st.svg";
import { ReactComponent as Badge2ndIcon } from "../../images/icons/icon2nd.svg";
import { ReactComponent as Badge3rdIcon } from "../../images/icons/icon3rd.svg";

function ReputationBody() {
  const [leadInfo, setLeadInfo] = useState();
  const [timeType, setTimeType] = useState("Week");

  const goldTrophy = <Badge1stIcon style={{ height: "25px", width: "25px" }} />
  const silverTrophy = <Badge2ndIcon style={{ height: "25px", width: "25px" }} />
  const bronzeTrophy = <Badge3rdIcon style={{ height: "25px", width: "25px" }} />

  useEffect(() => {
    axios
      .get(`/api/reputation/top10`)
      .then((res) => {
        setLeadInfo(res.data.top10);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="sidebar-body-rep">
      <div className="leaderboards-wrapper">
        <div className="leaderboards-header">
          <p>LEADERBOARDS</p>
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

        <div className="leaderboards-body">
          <div className="leaderboards-component" id="firstPlace">
            <div>
              {goldTrophy} <span className="paddingBetween" />
              {userName(0)}
            </div>
            {leadInfo
              ? leadInfo[timeType][0] && (
                  <p>{leadInfo[timeType][0].repRating}</p>
                )
              : null}
          </div>

          <div className="leaderboards-component" id="secondPlace">
            <div>
              {silverTrophy} <span className="paddingBetween" />
              {userName(1)}
            </div>
            {leadInfo
              ? leadInfo[timeType][1] && (
                  <p>{leadInfo[timeType][1].repRating}</p>
                )
              : null}
          </div>

          <div className="leaderboards-component" id="thirdPlace">
            <div>
              {bronzeTrophy} <span className="paddingBetween" />
              {userName(2)}
            </div>
            {leadInfo
              ? leadInfo[timeType][2] && (
                  <p>{leadInfo[timeType][2].repRating}</p>
                )
              : null}
          </div>

          <div className="leaderboards-component">
            <div style={{ paddingLeft: "8px" }}>
              4 <span className="paddingBetween2" />
              {userName(3)}
            </div>
            {leadInfo
              ? leadInfo[timeType][3] && (
                  <p>{leadInfo[timeType][3].repRating}</p>
                )
              : null}
          </div>

          <div className="leaderboards-component">
            <div style={{ paddingLeft: "8px" }}>
              5 <span className="paddingBetween2" />
              {userName(4)}
            </div>
            {leadInfo
              ? leadInfo[timeType][4] && (
                  <p>{leadInfo[timeType][4].repRating}</p>
                )
              : null}
          </div>

          <div className="leaderboards-component">
            <div style={{ paddingLeft: "8px" }}>
              6 <span className="paddingBetween2" />
              {userName(5)}
            </div>
            {leadInfo
              ? leadInfo[timeType][5] && (
                  <p>{leadInfo[timeType][5].repRating}</p>
                )
              : null}
          </div>

          <div className="leaderboards-component">
            <div style={{ paddingLeft: "8px" }}>
              7 <span className="paddingBetween2" />
              {userName(6)}
            </div>
            {leadInfo
              ? leadInfo[timeType][6] && (
                  <p>{leadInfo[timeType][6].repRating}</p>
                )
              : null}
          </div>

          <div className="leaderboards-component">
            <div style={{ paddingLeft: "8px" }}>
              8 <span className="paddingBetween2" />
              {userName(7)}
            </div>
            {leadInfo
              ? leadInfo[timeType][7] && (
                  <p>{leadInfo[timeType][7].repRating}</p>
                )
              : null}
          </div>

          <div className="leaderboards-component">
            <div style={{ paddingLeft: "8px" }}>
              9 <span className="paddingBetween2" />
              {userName(8)}
            </div>
            {leadInfo
              ? leadInfo[timeType][8] && (
                  <p>{leadInfo[timeType][8].repRating}</p>
                )
              : null}
          </div>

          <div className="leaderboards-component">
            <div style={{ paddingLeft: "6px" }}>
              10 <span className="paddingBetween3" />
              {userName(9)}
            </div>
            {leadInfo
              ? leadInfo[timeType][9] && (
                  <p>{leadInfo[timeType][9].repRating}</p>
                )
              : null}
          </div>
        </div>
      </div>

      <div className="separator-horizontal"></div>

      <SidebarFooter />
    </div>
  );

  /*-----Functions                -------------*/

  function userName(position){
    if (leadInfo)
      if (leadInfo[timeType][position])
        return leadInfo[timeType][position].username
      else 
        return "TBD"

  }
}

export default ReputationBody;
