import React, {useState, useContext, useEffect} from 'react'
import {TradeContext} from '../components/TradeContextProvider'

function RLitem_icon({id, url}) {
  const [open, setOpen] = useState(false)
  
  const {have, want, setHave, setWant} = useContext(TradeContext)


  const dropdown = have.map(item => {
    if (item.id == id){
      if (item.isDropdown === true) return <div name="enableDropdown" className="rl-attributes-dropdown"></div>
      else return null
    } 
  })


	return (
    <div 
    onClick={() => {
      let temp = []
      have.map(item => {
        if (item.id == id){
          item.isDropdown = !item.isDropdown
          temp.push(item)
        }
        else {
          item.isDropdown = false
          temp.push(item)
        }
      })
      setHave(temp)
    }}
    style={{height: "95px", width: "95px"}}>
      
      <div style={{height: "95px", width: "95px"}}>

        <img 
        name="enableDropdown"
        id={id}
        style={{height: "95px", width: "95px"}} 
        src={require(`../images/RLimages/${url}`)} 
        alt="" 
        />

        {/*edit icon*/}
        <img className="editIcon" src={require(`../images/other/Edit-icon.png`)} alt="" />

        {/*color icon*/}
        <img className="colorIcon" src={require(`../images/rl-colors/purple.png`)} alt="" />
        
      </div>

      {dropdown}

    </div>		
	)
}

export default RLitem_icon;