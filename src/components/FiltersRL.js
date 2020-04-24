import React, {useState, useContext, useEffect} from 'react'

import {ReactComponent as ArrowIcon} from '../images/other/down-arrow.svg'

import Items from '../info/items.json'


function FiltersRL() {
  const [game, setGame] = useState("Rocket League")
  const [searchType, setSearchType] = useState("I want to buy")
  const [name, setName] = useState("All")
  const [paint, setPaint] = useState("All")
  const [cert, setCert] = useState("All")
  const [itemType, setItemType] = useState("All")
  const [platform, setPlatform] = useState("All")

  const gameDD = ["Rocket League", "CSGO"]
  const searchTypeDD = ["I want to buy", "I want to sell"]
  const paintDD = ["None", "Crimson", "Lime", "Black", "Sky Blue", "Cobalt", "Burnt Sienna", "Forest Green", "Purple", "Pink", "Orange", "Grey", "Titanium White", "Saffron"]
  const certDD = ["None", "Playmaker", "Acrobat", "Aviator", "Goalkeeper", "Guardian", "Juggler", "Paragon", "Scorer", "Show-Off", "Sniper", "Striker", "Sweeper", "Tactician", "Turtle", "Victor"]
  const itemTypeDD = ["Items", "Blueprints"]
  const platformDD = ["PC", "PS4", "XBOX", "SWITCH"]

  return (
    <div className="sbSection filtersRL">

      <FilterButton text={`Game`} value={game}>
        <DropdownMenu id="1" items={gameDD} setFunction={setGame}/>
      </FilterButton>

      <FilterButton text={`Search`} value={searchType}>
        <DropdownMenu id="2" items={searchTypeDD} setFunction={setSearchType}/>
      </FilterButton>

      <FilterButton text={`Name`} value={name}>
        <DropdownMenu id="3" items={Items} setFunction={setName}/>
      </FilterButton>

      <FilterButton text={`Paint`} value={paint}>
        <DropdownMenu id="4" items={paintDD} setFunction={setPaint}/>
      </FilterButton>

      <FilterButton text={`Certification`} value={cert}> 
        <DropdownMenu id="5" items={certDD} setFunction={setCert}/>
      </FilterButton>

      <FilterButton text={`Item Type`} value={itemType}>
        <DropdownMenu id="6" items={itemTypeDD} setFunction={setItemType}/>
      </FilterButton>

      <FilterButton text={`Platform`} value={platform}>
        <DropdownMenu id="7" items={platformDD} setFunction={setPlatform}/>
      </FilterButton>

    </div>
  )

  function FilterButton({text, value, children}){

    const [open, setOpen] = useState(false)

    console.log(open)
    return(
      <div className="filterButton" 
        onClick={() => setOpen(!open)} 
        onMouseLeave={() => setOpen(false)}
      >

        <div className="filterButtonContent">{text}&nbsp;&nbsp; -<p id="fix">{value}</p></div>
        <ArrowIcon />
        {open && children}  

      </div>
    )
  }


  function DropdownMenu({items, id, setFunction}){

    if (id == 3){
    var itemNames = items.Slots.map(type => {
      return type.Items.map(item => 
        item.Name.length < 25 && <DropdownItem>{item.Name}</DropdownItem>
        )
      })
    }else{
      var itemNames = items.map(name => 
        name.length < 25 && <DropdownItem>{name}</DropdownItem>
      )
    }
  

    function DropdownItem({children}){
      return(
        <div className="menu-item" onClick={()=> setFunction(children)}>
          {children}
        </div>
      )
    }


    return(
      <div className="dropdown">
        <input placeholder="Search" className="filterInput"></input>
        <div className="test">{itemNames}</div>
      </div>
    )
  }

}

export default FiltersRL;



// this componenent / function (FiltersRL) will receive the userInfo from props (or imported) and store it in state 