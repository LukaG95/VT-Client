import React from 'react'

function RLitem_icon_tradePage({item}) { 

  function CertIcon(){
    if (item.cert !== "None")
      return <div className="certIcon">{item.cert}</div>
    else return null
  }

  function AmountIcon(){
    return <div style={{left: "6px"}} className="AmountIcon">{`${item.amount}x`}</div>
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
    <div className="RLicon" style={{height: "95px", width: "95px"}}>

      <img 
        name="enableDropdown"
        style={{height: "95px", width: "95px", cursor: "pointer"}} 
        src={require(`../images/RLimages/${item.url}`)} 
        alt="" 
      />
      
      <AmountIcon />
      <ColorIcon />
      <CertIcon />
      
      <span className="RLicon-name-hover"><p>{item.itemName}</p></span>


    </div>		
	)
}

export default RLitem_icon_tradePage