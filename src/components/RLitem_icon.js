import React, {useState, useContext, useEffect} from 'react'
import {TradeContext} from '../components/TradeContextProvider'
import RLitem_icon_dropdown from './RLitem_icon_dropdown'

function RLitem_icon({id, url}) { 
  const {have, want, setIsDropdown} = useContext(TradeContext)
  let all = [...have, ...want]

  const [paint, setPaint] = useState("None")
  const [cert, setCert] = useState("None")
  const [amount, setAmount] = useState(1)

  useEffect(()=> {
    for (let i=0; i<all.length; i++){
      if (all[i].id === id){
        // console.log("test color")
        setPaint(all[i].color)
      }
    }
  }, [all[id-1].color])

  useEffect(()=> {
    for (let i=0; i<all.length; i++){
      if (all[i].id === id){
        // console.log("test color")
        setCert(all[i].cert)
      }
    }
  }, [all[id-1].cert])


  function Dropdown(){
    const Dropdown = [...have, ...want].map(item => {
      if (item.id == id){
        if (item.isDropdown === true) 
          return <RLitem_icon_dropdown id={id}/>
        else 
          return null
      }
    })
    return Dropdown
  }

  function CertIcon(){
    if (cert !== "None")
    return <div className="certIcon">{cert}</div>
  }

  function ColorIcon(){
    if (paint !== "None")
    return <img className="colorIcon" src={require(`../images/rl-colors/${paint}.png`)} alt="" /> 
  }

	return (
    <div 
    
    style={{height: "95px", width: "95px"}}>
      
      <div onClick={() => setIsDropdown(id)} style={{height: "95px", width: "95px"}}>

        <img 
        name="enableDropdown"
        id={id}
        style={{height: "95px", width: "95px", cursor: "pointer"}} 
        src={require(`../images/RLimages/${url}`)} 
        alt="" 
        />

        {/*edit icon*/}
        <img className="editIcon" src={require(`../images/other/Edit-icon.png`)} alt="" />

        {CertIcon()}
        {ColorIcon()}

        
      </div>

      <Dropdown />

    </div>		
	)
}

export default RLitem_icon;