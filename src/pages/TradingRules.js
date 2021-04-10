import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {Helmet} from "react-helmet";

export default function TradingRules() {
  const path = useLocation()
  const ref = useRef()

  useEffect(() => {
    if (ref.current)
      ref.current.scrollIntoView()
  }, [path])

  return (
    <>
      <Helmet>
        <title>Trading Rules | VirTrade</title>
        <description>Carefully read trading rules before creating trade posts</description>
        <link rel="canonical" href="http://virtrade.gg/rules/trading" />
      </Helmet>

      <div className="tos-header" ref={ref}>
        <h1>Trading</h1>
        <p>Last revisioned: 05.03.2021</p>
      </div>

      <div className="ToS-body">
        <h2>Trading Etiquette</h2>
        <p>
          We ask that all users on our platform employ common decency in all interactions with fellow traders. 
          Remember that there is a human being on the other end of the screen. 
          The rule of thumb is simple: don’t say or do anything you wouldn’t in real life. 
          Read below for our full trading and reputation rules. 
        </p>

        <h2>Trading Rules</h2>
        <ul>
          <li>In order to create trades, you need a confirmed registered account and a platform linked, which you are creating a trade in</li>
          <li>You are allowed to have up to 15 active trades</li>
          <li>You can bump a trade every 10 minutes</li>
          <li>No links allowed in the notes</li>
          <li>You must have all items that you are offering</li>
          <li>You can only trade items that are presented in the add trade page. Cash trading, and trading for anything else outside of the game you’re trading in is forbidden</li>
          <li>Scamming and sharking is forbidden and will result in an instant ban (do not -rep scammers, please report them <a href="https://forms.gle/6tqsDSbeMz1q7NpY6" target="_blank">here</a>)</li>
          <li>Bots, scripts or any sort of automation that will in any way help you trade is forbidden</li>
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
