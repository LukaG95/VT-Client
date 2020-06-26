import React from 'react'
import imageExists from '../../misc/func'

function TradepostIconRL({item}) { 

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

	return (
    <div className="RLicon">

<img 
        name="enableDropdown"
        style={{height: "95px", width: "95px", cursor: "pointer"}} 
        src={imageExists(item.url)} 
        alt="" 
      />
      
      <AmountIcon />
      <ColorIcon />
      <CertIcon />
      
      <span className="RLicon-name-hover"><p>{item.itemName}</p></span>


    </div>		
	)
}

export default TradepostIconRL




// This component is the rocket league icon that is displayed inside the live trade post