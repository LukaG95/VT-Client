import React, { useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom'
import {Helmet} from "react-helmet";

function Terms() {
  const path = useLocation()
  const ref = useRef()

  useEffect(() => {
    if (ref.current)
      ref.current.scrollIntoView()
  }, [path])

  return (
    <>
      <Helmet>
        <title>Terms and conditions | VirTrade</title>
        <meta name="description" content="Carefully read terms and conditions before using features of this website" />
        <link rel="canonical" href="http://virtrade.gg/terms" />
      </Helmet>

      <div className="tos-header" ref={ref}>
        <h1><span style={{ color: "#fe3b3b" }}>Terms</span> and conditions</h1>
        <p>Last revisioned: 05.03.2021</p>
      </div>

      <div className="ToS-body">
        <h2>VirTrade</h2>
        <p>
          VirTrade (otherwise referred to as “We/we, Our/ouror Us/us”) is an online, 
          peer-to-peer trading platform which allows users to transact digital cosmetics 
          on a variety of different platforms. VirTrade operates under the internet 
          domain name “virtrade.gg”
        </p>

        <h2>Refund Policy</h2>
        <p>
          VirTrade is not responsible for any transactions occurring on or off our platform. 
          Consider all trades as FINAL with no claim of refund, both to VirTrade and other users, 
          under any circumstances. It is the responsibility of you, the user, to practice good judgement 
          and ensure the safety of your property
        </p>

        <h2>TERMS OF SERVICE</h2>
        <p>
          Upon signing up to VirTrade you agree to the following terms of service stated below; <br/><br/>
          1. All services or sales carried out or made by VirTrade are final. No refunds will be offered
          under any circumstances.<br/><br/>
          2. By conducting any transaction with VirTrade or its users, you agree to waive your right to
          claim a refund or raise a payment dispute against VirTrade.<br/><br/>
          3. By using such service, and agreeing to the terms laid out within, you waive the right to
          pursue legal action against VirTrade for the services provided, regardless of quality, delivery
          time or disruption to service. Any contractual invalidities related to this agreement shall be
          given a period of thirty days to be resolved without disruption to the invalid term(s). Any
          other terms laid out within this agreement shall still be considered enforceable and remain
          unaffected and independent to any invalid term(s). Remedies and damages cannot be claimed
          against VirTrade for any discrepancies found within.<br/><br/>
          4. You understand and agree that the use of this website, external services, or any other
          content is made available and provided to you at your own risk. We disclaim all warranties of
          any kind, expressed or implied, including but not limited to warranties of merchantability,
          fitness for a purpose, and non-infringement. You use all information and services at your own
          risk without our liability of any kind. VirTrade will not be held liable for any inaccuracies
          displayed on any of our platforms, or be held liable for discrepancies that may arise resultant
          of third party platforms.<br/><br/>
          5. You understand and agree that we shall not be liable for any direct, indirect, incidental,
          special, exemplary, accidental, or consequential damages resulting from the use or inability of
          any services, unauthorized action to or alteration of your data, statements or conduct of any
          third party on the service, or any other matter relating to the service.<br/><br/>
          6. In the event of a financial dispute being submitted against VirTrade, VirTrade has the right
          to halt any further support to the user, or any services or sales being made to the user until the
          case has been resolved. If the case has been resolved, it is to the discretion of VirTrade to
          continue offering any form of support or carry out any services being made to the user.
          7. VirTrade cannot be held responsible for any downtime or transaction failures suffered
          resultant of third-party sources.<br/><br/>
          8. VirTrade is not associated with or endorsed by the following legal entities in any capacity:<br/><br/>

          <ul>
            <li>Psyonix Inc.</li>
            <li>Epic Games, Inc.</li>
            <li>Microsoft Corporation</li>
            <li>Sony Corporation</li>
            <li>Nintendo Co., Ltd</li>
            <li>Valve Corporation</li>
          </ul><br/><br/>

          9. In the event in which a user redistributes proprietary content hosted on the VirTrade
          platform or communications made between said user and VirTrade, VirTrade shall reserve the
          right to terminate any services, or delivery of product(s) being carried out by VirTrade
          immediately without refund. Any services and products provided by VirTrade is not a
          solicitation for redistribution. The user may not attempt to resell any content provided by
          VirTrade or services provided by VirTrade.<br/><br/>
          10. Children, specifically aged 17 and under are not intended to use this service without
          parental consent. We take no responsibility in loss or dispute occurring as a result of minors
          using services provided by VirTrade.<br/><br/>
          11. Any services provided by VirTrade is conditionally tied to the agreement of these terms
          and conditions.
        </p>

        <h2>PRIVACY POLICY</h2>
        <p>
          This Privacy Policy (“Policy”) will describe the type of information VirTrade (otherwise
          referred to as “We/we, Our/our or Us/us”) will use and store on this website, and any services
          associated. In using all services operated by VirTrade, you agree to the terms listed within
          this document.
        </p>

        <h4>Information Collected</h4>
        <p>
          VirTrade may collect a variety of personal information from you whilst you use VirTrade
          operated services. Such information may include:<br/><br/>

        </p>
        <ul>
          <li>Contact Details: in registering for our website, we require an email address. Any
          other information collected may or may not include name, telephone address and
          home address</li>
          <li>Account Details: in registering for our website, we may require further information
          from you which includes a username, password, location, address, and various
          security questions accompanied by answers to such questions</li>
          <li>Device Information: we may keep records of the type of device you use to access our
          services. Device Information allows us to optimize our services to cater to your needs</li>
          <li>Technical Information: we may keep records of your IP address, device ID and the
          browser you are using to access our services</li>
          <li>Payment Information: any information which is required in order to make a
          payment</li>
          <li>Any information you provide us with: this could include website message
          interaction, email interaction and social media interaction</li>
        </ul>
   

        <h4>Protection of Information</h4>
        <p>
          All information collected by VirTrade has been stored using proper security protocols. All
          information by default is stored within secure online cloud servers. It should be noted, that
          such information may be transferred to a physical state – in the event that this occurs, proper
          measures shall be taken to secure such information.
          Information collected by VirTrade may be stored out-with the European Economic Area. Any
          information deemed vulnerable should be handled with care by you, the individual using our
          services.
          It is good practice to ensure your email account is secure and any passwords you use are hard
          to guess.
        </p>

        <h4>Use of Information Collected</h4>
        <p>
          VirTrade shall only use information collected when it is deemed necessary to do so, and if it
          is legal to do so. Various ways in which we may use your information include, but are not
          limited to:
        </p><br/>
        <ul>
          <li>Processing your order</li>
          <li>Dealing with support queries</li>
          <li>Handling payment issues</li>
          <li>Responding to payment disputes/chargebacks</li>
          <li>Market Research</li>
          <li>Tailoring our services to your device needs</li>
          <li>To contact you</li>
          <li>Law Enforcement</li>
          <li>Contracted Partners</li>
        </ul>

        <h4>Rights to Information Stored</h4>
        <p>
          Some information stored by VirTrade may be removed upon request. You may delete your
          website account at any time.<br/> To request removal of information, please email
          support@virtrade.com.<br/>
          You may also request a copy of the information we store about you. To do so, please email
          support@virtrade.com.
        </p>

        <h4>Access to Data</h4>
        <p>
          All VirTrade authorised staff shall have access to the information collected about you. Any
          contracted third parties who may require or have access to personal information will follow
          secure protocols to ensure data remains protected.
        </p>

        <h4>Changes</h4>
        <p>
          VirTrade reserves the right to change this privacy policy at any time. It is the responsibility of
          you to keep updated on any changes.
        </p>

        <h4>Contacting Us</h4>
        <p>
          If you have any information in relation to the information we hold about you, please email us
          at support@virtrade.com.
        </p>
      </div>
    </>

  );
}

export default Terms;
