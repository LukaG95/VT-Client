import React, {useState} from 'react'

function RLitem_icon({url}) {
  const [open, setOpen] = useState(false)
	
	return (
    <div onClick={() => setOpen(!open)} style={{height: "95px", width: "95px"}}>
      
      <div style={{height: "95px", width: "95px"}}>

        <img 
        style={{height: "95px", width: "95px"}} 
        src={require(`../images/RLimages/${url}`)} 
        alt="" 
        />

        {/*edit icon*/}
        <img className="editIcon" src={require(`../images/other/Edit-icon.png`)} alt="" />

        {/*color icon*/}
        <img className="colorIcon" src={require(`../images/rl-colors/purple.png`)} alt="" />
        
      </div>

      {open && <div className="rl-attributes-dropdown"></div>}

    </div>		
	)
}

export default RLitem_icon;