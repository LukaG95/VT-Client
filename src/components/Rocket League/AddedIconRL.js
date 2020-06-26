import React, {useState, useContext, useEffect} from 'react'
import {TradeContext} from './TradeContextRL'
import AddedIconRLdropdown from './AddedIconRLdropdown'
import rl_items_all from '../../info/virItemsFilteredAll.json' 

function RLitem_icon({id, url}) { 
  const {have, want, setIsDropdown} = useContext(TradeContext)
  let all = [...have, ...want]

  const [name, setName] = useState("")
  const [paint, setPaint] = useState("None")
  const [cert, setCert] = useState("None")
  const [amount, setAmount] = useState(1)


  // join all useEffects? test loops
  useEffect(()=> {
    for (let i=0; i<all.length; i++){
      if (all[i].id === id){
        // console.log("test color loop")
        setPaint(all[i].color)
      }
    }
  }, [all[id-1].color])

  useEffect(()=> {
    for (let i=0; i<all.length; i++){
      if (all[i].id === id){
        // console.log("test cert loop")
        setCert(all[i].cert)
      }
    }
  }, [all[id-1].cert])

  useEffect(()=> {
    for (let i=0; i<all.length; i++){
      if (all[i].id === id){
        // console.log("test amount loop")
        setAmount(all[i].amount)
      }
    }
  }, [all[id-1].amount])

  useEffect(()=> {
    rl_items_all.map(item => {
      if (item.url === url)
        setName(item.name)
    })
  }, [])

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

  function EditIcon(){
    return <img className="editIcon" src={require(`../../images/other/Edit-icon.png`)} alt="" />
  }


	return (
    <div className="RLicon noUserInteraction">
      
      <div onClick={() => setIsDropdown(id)} style={{height: "95px", width: "95px"}}>
        
        <img 
        name="enableDropdown"
        id={id}
        style={{height: "95px", width: "95px", cursor: "pointer"}} 
        src={require(`../../images/RLimages/${url}`)} 
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
}

export default RLitem_icon