import React from 'react'

import imageExists from '../../misc/func'
import infoRL from '../../info/infoRL.json' 

function TradepostIconRL({item}) { 

  var paintID = 0
  infoRL.Colors.map(Color => { 
    if (Color.Name === item.paint)
    paintID = Color.ID
  }) 


	return (
    <div className="RLicon">

      <img 
        name="enableDropdown"
        style={{height: "95px", width: "95px", cursor: "pointer"}} 
        src={imageExists(`${item.itemID}.${paintID}.webp`, item.itemID)}  // pass in 2 params, if the painted image doesn't exist check if regular exists, 
        alt=""                                                                                         // and then if both don't exist return questionmark
      />
      
      <AmountIcon />
      <ColorIcon />
      <CertIcon />
      
      <span className="RLicon-name-hover"><p>{item.itemName}</p></span>

    </div>		
  )
  

  /*-----Functions                -------------*/

  function CertIcon(){
    if (item.cert !== "None")
      return <div className="certIcon">{item.cert}</div>
    else return null
  }

  function AmountIcon(){
    return <div className="AmountIcon">{`${item.amount}x`}</div>
  }

  function ColorIcon(){
    if (item.paint !== "None")
      return (
        <div className={`colorIcon ${item.paint.replace(/\s+/g, '')}`}>
          <span className="paint-tooltip">{item.paint}</span>
        </div>
      )
    else return null
  }
}

export default TradepostIconRL




// This component is the rocket league icon that is displayed inside the live trade post