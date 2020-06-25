import React from 'react'
import info from '../../info/items.json'
import imageExists from '../../misc/func'

function RLicon_TradePost({item}) { 

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

  function ItemImage(){
    let x = null
    info.Colors.map(color => {
      if (color.Name === item.paint)
        x = color.ID
    })

    if (item.paint === "None")
      return (
        <img 
          name="enableDropdown"
          style={{height: "95px", width: "95px", cursor: "pointer"}} 
          src={imageExists(item.url)} 
          alt="" 
        />
      )
    else return (
        <img 
          name="enableDropdown"
          style={{height: "95px", width: "95px", cursor: "pointer"}} 
          src={imageExists(`${item.itemID}.${x}.webp`)} 
          alt="" 
        />
    )

  }
    // tole namest <ItemImage /> pa zbrisat to funkcijo zgori
  /*
  <img 
        name="enableDropdown"
        style={{height: "95px", width: "95px", cursor: "pointer"}} 
        src={imageExists(item.url)} 
        alt="" 
      />
  */

	return (
    <div className="RLicon">

      <ItemImage />
      
      <AmountIcon />
      <ColorIcon />
      <CertIcon />
      
      <span className="RLicon-name-hover"><p>{item.itemName}</p></span>


    </div>		
	)
}

export default RLicon_TradePost




// This component is the rocket league icon that is displayed inside the live trade post