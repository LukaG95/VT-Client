import React, {useState, useContext, useEffect} from 'react'

import {TradeContextRL} from './TradeContextRL'
import {rl_dd_names} from '../../info/DropdownNames'
import infoRL from '../../info/infoRL.json' 

const {colorDD, certDD} = rl_dd_names

function RLitem_icon_dropdown({id, itemID}) { 
  const [color, setColor] = useState("None")
  const [certification, setCertification] = useState("None")
  const [amount, setAmount] = useState(1)

  const {setHave, setWant, have, want, deleteRLitem} = useContext(TradeContextRL)

  useEffect(()=> {
    [...have, ...want].map(item=> {
      if (item.id == id){
        setColor(item.color)
        setCertification(item.cert)
        setAmount(item.amount)
      }
    })
  }, [])
  

	return (
    <div 
    name="enableDropdown"
    className="rl-icon-dropdown">

      <FilterButton label="Color"         value={color}           setFunction={setColor}         dd={colorDD}/>
      <FilterButton label="Certification" value={certification}   setFunction={setCertification} dd={certDD}/>
      <FilterButton label="Amount"        value={amount}          setFunction={setAmount}        itemID={itemID}/>

      <button id="submit-rl-filters-button" onClick={submitFilters}>Done</button>

      <button
        id="delete-rl-filters-button" 
        onClick={()=> deleteRLitem(id)}>
          
      Delete </button>
      
    </div> 	
  )


  function submitFilters(){
    let colorID = 0
    let temp = []

    infoRL.Colors.map(color => {
      if (color.Name === color)
        colorID = color.ID
    })

    have.map(item => {
      if (item.id === id){
        item.color = color
        item.colorID = colorID
        item.cert = certification
        item.amount = amount
        temp.push(item)
      }
      else temp.push(item)
    })
    setHave(temp)

    temp = []

    want.map(item => {
      if (item.id === id){
        item.color = color
        item.colorID = colorID
        item.cert = certification
        item.amount = amount
        temp.push(item)
      }
      else temp.push(item)
    })
    setWant(temp)
  }
  
}


 /*-----Functions                -------------*/

function FilterButton({dd, label, value, setFunction, itemID}){
  const [open, setOpen] = useState(false)

  if (label !== "Amount"){
    return(
      <div 
      className="rl-icon-dropdown-button-section"
      onMouseLeave={()=> setTimeout(()=> setOpen(false), 190)}
      >
        <label className="enableDropdown"> {label} </label>
  
        <button
          name="enableDropdown"
          onClick={()=> setOpen(!open)}
          style={{justifyContent: "space-between"}}>
  
          <p>{value}</p> 
          <i className="dd-arrow"></i>
  
        </button>
  
        {open && <DropdownMenu setFunction={setFunction} dd={dd} setOpen={setOpen}/>}
        
      </div>
    )
  }
  else
    return(
      <div 
      className="rl-icon-dropdown-button-section"
      >
        <label className="enableDropdown"> {label} - max {itemID === 4743 ? 100000 : 100}</label>
  
        <input
          name="enableDropdown"
          style={{justifyContent: "space-between"}}
          value={value}
          onChange={e => {
            if (isNaN(e.target.value) || e.target.value > (itemID === 4743 ? 100000 : 100) || e.target.value <= 0)
              return
            setFunction(e.target.value)
          }}
        />
  
      </div>
    )
}

function DropdownMenu({dd, setFunction, setOpen}){
  const [dropNames, setDropNames] = useState(()=> dd.map(item => <MenuItem>{item}</MenuItem>))
  

  function MenuItem({children}){
    return(
      <div className="rl-attribute-dd-item" onClick={()=> {
        setOpen(prev => !prev)
        setFunction(children)
      }}>
        {children}
      </div>
    )
  }

  return(
    <div className="rl-dd-dd" id="test">
       {dropNames}
    </div>
  )
}


export default RLitem_icon_dropdown