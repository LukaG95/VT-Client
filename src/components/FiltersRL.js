import React, {useState, useContext, useEffect} from 'react'

import {ReactComponent as ArrowIcon} from '../images/other/down-arrow.svg'
import {UserContext} from '../UserContext'

import Items from '../info/items.json'


function FiltersRL() {
  const {userInfo, setUserInfo} = useContext(UserContext)

  const [game, setGame] = useState("Rocket League")
  const [searchType, setSearchType] = useState("I want to buy")
  const [name, setName] = useState("All")
  const [paint, setPaint] = useState("All")
  const [cert, setCert] = useState("All")
  const [itemType, setItemType] = useState("All")
  const [platform, setPlatform] = useState("All")

  

  return (
    <div className="sbSection filtersRL">

      <FilterButton text={`Game`} value={game}>
        <DropdownMenu setFunction={setGame}/>
      </FilterButton>

      <FilterButton text={`Search`} value={searchType}>
        <DropdownMenu setFunction={setSearchType}/>
      </FilterButton>

      <FilterButton text={`Name`} value={name}>
        <DropdownMenu setFunction={setName}/>
      </FilterButton>

      <FilterButton text={`Paint`} value={paint}>
        <DropdownMenu setFunction={setPaint}/>
      </FilterButton>

      <FilterButton text={`Certification`} value={cert}> 
        <DropdownMenu setFunction={setCert}/>
      </FilterButton>

      <FilterButton text={`Item Type`} value={itemType}>
        <DropdownMenu setFunction={setItemType}/>
      </FilterButton>

      <FilterButton text={`Platform`} value={platform}>
        <DropdownMenu setFunction={setPlatform}/>
      </FilterButton>

    </div>
  )


  function FilterButton({text, value, children}){

    const [open, setOpen] = useState(false)

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

  function DropdownMenu({setFunction}){

    let itemNames = Items.Slots.map(type => {
      return type.Items.map(item => 
        item.Name.length < 25 && <DropdownItem>{item.Name}</DropdownItem>
      )
     })

    function DropdownItem({children}){
      return(
        <div className="menu-item" onClick={()=> setFunction(children)}>
          {children}
        </div>
      )
    }

    return(
      <div className="dropdown">
        <input className="filterInput"></input>
        {itemNames}
      </div>
    )
  }

}

export default FiltersRL;



// this componenent / function (FiltersRL) will receive the userInfo from props (or imported) and store it in state 