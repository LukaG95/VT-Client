import React, {useState, useContext, useEffect} from 'react'

import {TradeContext} from './TradeContextRL'
import AddedIconRLdropdown from './AddedIconRLdropdown'
import infoRL from '../../info/infoRL.json' 
import imageExists from '../../misc/func'

function AddedIconRL({id, itemID, url}) { 
  const {have, want, setIsDropdown} = useContext(TradeContext)
  let all = [...have, ...want]

  const [name, setName] = useState("")

  useEffect(()=> {
    infoRL.Slots.map(Slot => Slot.Items.map(item => {
      if (item.ItemID === itemID)
        setName(item.Name)
    }))
  }, [])


	return (
    <div className="RLicon noUserInteraction">
      
      <div onClick={() => setIsDropdown(id)} style={{height: "95px", width: "95px"}}>
        
        <img 
        name="enableDropdown"
        id={id}
        style={{height: "95px", width: "95px", cursor: "pointer"}} 
        src={imageExists(url)} 
        alt="" 
        />

        <EditIcon />
        <AmountIcon />
        <ColorIcon />
        <CertIcon />
        
        <span className="RLicon-name-hover"><p>{name}</p></span>

      </div>

      <Dropdown />

    </div>		
  )
  

   /*-----Functions                -------------*/

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
  }

  function CertIcon(){
    if (all[id].cert !== "None")
    return <div className="certIcon">{all[id].cert}</div>
    else return null
  }

  function AmountIcon(){
    return <div className="AmountIcon">{`${all[id].amount}x`}</div>
  }

  function ColorIcon(){
    if (all[id].color !== "None")
    return (
      <div className={`colorIcon ${all[id].color.replace(/\s+/g, '')}`}>
        <span className="paint-tooltip">{all[id].color}</span>
      </div>
    )
    else return null
  }

  function EditIcon(){
    return <img className="editIcon" src={require(`../../images/other/Edit-icon.png`)} alt="" />
  }
}

export default AddedIconRL