import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {Helmet} from "react-helmet";

export default function PreventScam() {
  const path = useLocation()
  const ref = useRef()

  useEffect(() => {
    if (ref.current)
      ref.current.scrollIntoView()
  }, [path])

  return (
    <>

      <Helmet>
        <title>Prevent Scam | VirTrade</title>
        <meta name="description" content="Carefully read the prevent scam guide before engaging in trading with others" />
        <link rel="canonical" href="http://virtrade.gg/security" />
      </Helmet>

      <div className="tos-header" ref={ref}>
        <h1>Prevent Scam</h1>
        <p>Last revisioned: 05.03.2021</p>
      </div>

      <div className="ToS-body">
        <h2>How to stay safe</h2>
        <p>
          Always double and triple check who you are trading with and what items are in the trade. 
          If there is any doubt in your mind, join us on <a href="https://discord.gg/nqSgyCr" target="popup" style={{textDecoration: "none", color: "#7289da"}}>Discord</a> and open a support ticket or call a middleman.<br /><br />

          <span style={{color: "yellow"}}>&#9888;</span> We will <span style={{color: "#fe3b3b"}}>never</span> assist you in DMs, ask for your credentials or send you links
        </p><br />

        <p>
          Although this will not shield you from getting scammed, it’s worth noting you should take screenshots and/or record the whole trade as it goes on. 
          If you get scammed, do not -rep the scammer, but report them <a href="https://forms.gle/6tqsDSbeMz1q7NpY6" target="_blank">here</a>. <br />Also feel free to email the developers of that game, explain what exactly happened and attach the proof. 
        </p>

        <h2>Indicators of potential scam</h2>
        <ul>
          <li>They are rushing you to make fast decisions</li>
          <li>They are trying hard to convince you the trade is good or they are trusted</li>
          <li>They cancel the trade (usually repeatedly)</li>
          <li>They want you to participate in a tournament or another trade</li>
          <li>They want to borrow items from you (usually for a youtube video or a screenshot)</li>
          <li>They want you to accept the trade before they put in their items</li>
          <li>They claim to know a hack or a glitch for duplicated / free items</li>
          <li>It looks way too good to be true</li>
          <li>Broken english</li>
        </ul>

        <h2>Popular types of scams</h2>
        <ol>
          <li><span style={{fontWeight: "bold"}}>Phishing Links</span><br />
            Fake links (also known as phishing links) are links that often lead to almost identical websites you are familiar with, but are actually not.
            When you log into that website you are giving your credentials to the scammers, which then lock you out of your account, take all your items 
            and then message friends on your friends list with the same phishing link. Your friends think it’s you and also get scammed. It is the most 
            brutal scam method and that’s why you should never click on links unless you are 110% certain they aren’t fake.
          </li><br />
          <li><span style={{fontWeight: "bold"}}>Chargeback</span><br />
            Chargeback is referred to when someone takes back the money they sent you. 
            Trading for cash is dangerous and usually against TOS so we suggest you avoid it unless you know what you are doing. 
          </li><br />
          <li><span style={{fontWeight: "bold"}}>Impersonation</span><br />
            Scammers will often change their name and pretend to be someone else (usually a middleman or a reputable trader). 
            It is very easy to fall for this. If you aren’t sure, open a support ticket.
          </li>
        </ol>

      </div>
    </>
  )
}
