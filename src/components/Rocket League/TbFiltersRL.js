import React, {useState, useContext, useEffect} from 'react'

import {rl_dd_names} from '../../info/DropdownNames'
import {TbFiltersRLContext} from '../../context/TbFiltersRLContext'

const {gameDD, searchTypeDD, namesDD, colorDD, certDD, itemTypeDD, platformDD} = rl_dd_names

function FiltersRL() {
  const {game, setGame, searchType, setSearchType, name, setName, color, setColor, cert, setCert, itemType, setItemType, platform, setPlatform, resetFilters} = useContext(TbFiltersRLContext)

  return (
    <div className="filters-field hide">

      <FilterButton text={`Game`} value={game} dd={gameDD} setFunction={setGame}/>
      <FilterButton text={`Search`} value={searchType} dd={searchTypeDD} setFunction={setSearchType}/>
      <FilterButton text={`Name`} value={name} dd={namesDD} setFunction={setName}/>
      <FilterButton text={`Color`} value={color} dd={colorDD} setFunction={setColor}/>
      <FilterButton text={`Certification`} value={cert} dd={certDD} setFunction={setCert}/> 
      <FilterButton text={`Item Type`} value={itemType} dd={itemTypeDD} setFunction={setItemType}/>
      <FilterButton text={`Platform`} value={platform} dd={platformDD} setFunction={setPlatform}/>
      
      <div onClick={resetFilters} className="rl-resetFilters-button noUserInteraction">
        <img src={require(`../../images/other/trash.png`)} style={{height: "14px", width: "14px"}}/>
      </div>

    </div>
  )
}

/*-----Functions                -------------*/

function FilterButton({text, value, dd, setFunction}){

  const [open, setOpen] = useState(false)

  useEffect(()=> {
    window.addEventListener("click", click)
    return () => {window.removeEventListener("click", click)}
  },[])

  return(
    <div className="filterButtonWrapper">

      <label className="filter-label">{text}</label>
      <div 
        id={`${text}`}
        onClick={() => setOpen(!open)}
        className={`noUserInteraction filterButton ${open ? "blackBorder" : null}`}
      >
        <div className="filterButtonContent"><p id="fix">{value}</p></div>
        
        <div className={`${open ? "openArrow" : "dropdownArrow"}`} ></div>
        
      </div> 
      {open && <DropdownMenu dd={dd} setFunction={setFunction}/>}
      
    </div>
  )

  function click(e){
    if (e.target.parentNode === null) return

    if (e.target.id!==text && e.target.nodeName !== "INPUT") {
      if ((e.target.id!=="fix" && e.target.className!=="filterButtonContent" && e.target.parentNode.className !== "noUserInteraction filterButton" && e.target.parentNode.nodeName !== "g")
      || e.target.parentNode.id !== text && e.target.parentNode.parentNode.id !== text && e.target.parentNode.parentNode.parentNode.id !== text && 
      e.target.parentNode.parentNode.parentNode.parentNode.id !== text && e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id !== text
      && e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id !== text
      && e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id !== text
      && e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id !== text
      && e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id !== text){
        setOpen(false)
      }
    }
    
    !open && setTimeout(async()=> document.getElementById("dd") ? document.getElementById("dd").focus() : null)
  }

  
}

function DropdownMenu({dd, setFunction}){
  const [dropNames, setDropNames] = useState(()=> dd.map(name => name.length < 25 && <DropdownItem>{name}</DropdownItem>))

  return(
    <div className="dropdown">
      <input 
        id = "dd"
        onChange={event => {
          const searchName = dd.map(name =>{
            if (name.toLowerCase().includes(event.target.value.toLowerCase())){
              return <DropdownItem>{name}</DropdownItem>
            }
          }) 
          setDropNames(searchName)
        }}
        placeholder="Search" 
        className="filterInput">
      </input>
      <div className="itemNames">{dropNames}</div>
    </div>
  )

  function DropdownItem({children}){
    return(
      <div className="menu-item" onClick={()=> setFunction(children)}>
        {children}
      </div>
    )
  }
}

export default FiltersRL