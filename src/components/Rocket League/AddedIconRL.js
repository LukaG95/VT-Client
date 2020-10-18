import React, {useState, useContext, useEffect} from 'react'

import {TradeContextRL} from './TradeContextRL'
import AddedIconRLdropdown from './AddedIconRLdropdown'
import infoRL from '../../info/infoRL.json' 
import imageExists from '../../misc/func'

function AddedIconRL({item}) { 
  const {id, itemID, itemName, color, colorID, cert, amount, isDropdown} = item
  const {setIsDropdown} = useContext(TradeContextRL)

	return (
    <div className="RLicon noUserInteraction" style={{height: "95px"}}>
      
      <div onClick={() => setIsDropdown(id)} style={{height: "95px", width: "95px"}}>
        
        <img 
        name="enableDropdown"
        id={id}
        style={{height: "95px", width: "95px", cursor: "pointer"}} 
        src={imageExists(`${itemID}.${colorID}.webp`)}
        alt="" 
        />

        <EditIcon />
        <AmountIcon />
        <ColorIcon />
        <CertIcon />

      </div>

      <Dropdown />

    </div>		
  )
  

   /*-----Functions                -------------*/
/*
   function Dropdown(){
    const Dropdown = [...have, ...want].map(item => {
      if (item.id == id){
        if (item.isDropdown === true) 
          return <AddedIconRLdropdown id={id}/>
        else 
          return null
      }
    })
    return Dropdown
  }*/

  function Dropdown(){
    if (isDropdown === true) return <AddedIconRLdropdown id={id} itemID={itemID}/>
    else return null
  }

  function CertIcon(){
    if (cert !== "None")
    return <div className="certIcon">{cert}</div>
    else return null
  }

  function AmountIcon(){
    return <div className="AmountIcon">{`${amount}x`}</div>
  }

  function ColorIcon(){
    if (color !== "None")
      return (
        <div className={`colorIcon ${color.replace(/\s+/g, '')}`}>
          <span className="paint-tooltip">{color}</span>
        </div>
      )
    else return null
  }

  function EditIcon(){
    return <img className="editIcon" src={require(`../../images/other/Edit-icon.png`)} alt="" />
  }
}

export default AddedIconRL