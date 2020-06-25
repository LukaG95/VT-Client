import React, {useState, useContext, useEffect} from 'react'
import {TradeContext} from './TradeContextRL'
import {rl_dd_names} from '../../info/DropdownNames'

const {paintDD, certDD} = rl_dd_names

function RLitem_icon_dropdown({id}) { 
  const [paint, setPaint] = useState("None")
  const [certification, setCertification] = useState("None")
  const [amount, setAmount] = useState(1)

  const {setHave, setWant, have, want, deleteRLitem} = useContext(TradeContext)

  useEffect(()=> {
    [...have, ...want].map(item=> {
      if (item.id == id){
        setPaint(item.color)
        setCertification(item.cert)
        setAmount(item.amount)
      }
    })
  }, [])

	return (
    <div 
    name="enableDropdown"
    className="rl-icon-dropdown"
    >
      <FilterButton label="Paint"         value={paint}           setFunction={setPaint}         dd={paintDD}/>
      <FilterButton label="Certification" value={certification}   setFunction={setCertification} dd={certDD}/>
      <FilterButton label="Amount"        value={amount}          setFunction={setAmount}/>

      <button id="submit-rl-filters-button" onClick={()=> {
        let temp = []
        let all = [...have]
        all.map(item => {
          if (item.id === id){
            item.color = paint
            item.cert = certification
            item.amount = amount
            temp.push(item)
          }
          else temp.push(item)
        })
        setHave(temp)

        temp = []
        let all2 = [...want]
        all2.map(item => {
          if (item.id === id){
            item.color = paint
            item.cert = certification
            item.amount = amount
            temp.push(item)
          }
          else temp.push(item)
        })
        setWant(temp)

      }}>Done</button>

      <button
        id="delete-rl-filters-button" 
        onClick={()=> deleteRLitem(id)}
      >
      Delete </button>
      
    </div> 	
	)
}

function FilterButton({dd, label, value, setFunction}){
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
        <label className="enableDropdown"> {label} </label>
  
        <input
          name="enableDropdown"
          style={{justifyContent: "space-between"}}
          value={value}
          onChange={e => setFunction(e.target.value)}
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


export default RLitem_icon_dropdown;