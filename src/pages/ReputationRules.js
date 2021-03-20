import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {Helmet} from "react-helmet";

export default function ReputationRules() {
  const path = useLocation()
  const ref = useRef()
  
  useEffect(() => {
    if (ref.current)
      ref.current.scrollIntoView()
  }, [path])

  return (
    <>
      <Helmet>
        <title>Reputation Rules | VirTrade</title>
        <description>Carefully read reputation rules before adding reputation to others</description>
        <link rel="canonical" href="http://virtrade.gg/rules/reputation" />
      </Helmet>

      <div className="tos-header" ref={ref}>
        <h1>Reputation</h1>
        <p>Last revisioned: 05.03.2021</p>
      </div>

      <div className="ToS-body">
        <h2>What is Reputation?</h2>
        <p>
          Reputation system is here to help you make a better decision when trading with others.
          It is a documentation of your trading history and experience with the person on the other side. <br/>

          More reputation will grant you higher reputation titles.<br/><br/>
          An even better representation of your reputation quality is your grade (1.0 - 5.0). <br/>
          Grade is calculated based on: <br/><br/>
          <ul style={{marginLeft: "30px"}}>
            <li>Who you received reputation from</li>
            <li>In what time you gained reputation</li>
            <li> Amount of positive reputation, relative to negative</li>
          </ul> <br/>
          <span style={{color: "yellow"}}>&#9888;</span> By no means does this mean we vouch or state you should trust someone, regardless of their 
          reputation, grade, titles, tags or status and aren’t responsible for any potential scams. Full in depth prevent scam guide
        </p>

        <h2>Reputation Rules</h2>
        <ul>
          <li>In order to add reputation, you need a confirmed registered account</li>
          <li>You can only receive 1 reputation from the same person in 24 hours</li>
          <li>Adding proof is recommended but is always required when adding negative reputation</li>
          <li>Adding unreal, fake or meme reputation is forbidden</li>
          <li>No links allowed in feedback</li>
          <li>You are allowed to add reputation to the user that you have traded with</li>
          <li>You are also allowed to add negative reputation for verbal abuse (harrasment, offensive language, spam) but not things like for example, wasting your time when not responding, or not taking your offer</li>
        </ul>

        <h2>Notes</h2>
        <ul>
          <li>We hold the right to change these rules in the future</li>
          <li>We can issue warnings or bans for reasons that are not in the scope of these rules</li>
          <li>In the case of permanent account bans, your trades, reputation and progress is lost</li>
        </ul>

      </div>
    </>
  )
}
