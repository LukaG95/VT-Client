import React, {useState} from 'react'

function RLitem_icon({}) { 

  function CertIcon(){
    if (cert !== "None")
    return <div className="certIcon">{cert}</div>
    else return null
  }

  function AmountIcon(){
    return <div className="AmountIcon">{`${amount}x`}</div>
  }

  function ColorIcon(){
    if (paint !== "None")
    return (
      <div className={`colorIcon ${paint.replace(/\s+/g, '')}`}>
        <span className="paint-tooltip">{paint}</span>
      </div>
    )
    else return null
  }

	return (
    <div className="RLicon" style={{height: "95px", width: "95px"}}>

      <img 
        name="enableDropdown"
        id={id}
        style={{height: "95px", width: "95px", cursor: "pointer"}} 
        src={require(`../images/RLimages/${url}`)} 
        alt="" 
      />
      
      <AmountIcon />
      <ColorIcon />
      <CertIcon />
      
      <span className="RLicon-name-hover"><p>{name}</p></span>


    </div>		
	)
}

export default RLitem_icon;