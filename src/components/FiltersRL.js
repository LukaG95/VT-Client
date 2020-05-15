import React, {useState, useContext} from 'react'
import {ReactComponent as ArrowIcon} from '../images/other/down-arrow.svg'
import {rl_dd_names} from '../info/DropdownNames'
import {FiltersRLContext} from './FiltersRL_Context'

const {gameDD, searchTypeDD, namesDD, paintDD, certDD, itemTypeDD, platformDD} = rl_dd_names

function FiltersRL() {
  const {game, setGame, searchType, setSearchType, name, setName, paint, setPaint, cert, setCert, itemType, setItemType, platform, setPlatform} = useContext(FiltersRLContext)

  return (
    <div className="sbSection filtersRL">

      <FilterButton text={`Game`} value={game} dd={gameDD} setFunction={setGame}/>
      <FilterButton text={`Search`} value={searchType} dd={searchTypeDD} setFunction={setSearchType}/>
      <FilterButton text={`Name`} value={name} dd={namesDD} setFunction={setName}/>
      <FilterButton text={`Paint`} value={paint} dd={paintDD} setFunction={setPaint}/>
      <FilterButton text={`Certification`} value={cert} dd={certDD} setFunction={setCert}/> 
      <FilterButton text={`Item Type`} value={itemType} dd={itemTypeDD} setFunction={setItemType}/>
      <FilterButton text={`Platform`} value={platform} dd={platformDD} setFunction={setPlatform}/>

    </div>
  )
}

function FilterButton({text, value, dd, setFunction}){

  const [open, setOpen] = useState(false)

  return(
      <div 
        className="filterButton" 
        onClick={event => {
          if(event.target.nodeName !== "INPUT")
          setOpen(!open)
          !open && setTimeout(async()=> await document.getElementById("dd").focus())
        }}
        onMouseLeave={()=> setTimeout(()=> setOpen(false), 190)}
      >
        <div className="filterButtonContent">{text}&nbsp;&nbsp; -<p id="fix">{value}</p></div>
        <ArrowIcon />
        {open && <DropdownMenu dd={dd} setFunction={setFunction}/>}
      </div> 
  )
}

function DropdownMenu({dd, setFunction}){

  const [dropNames, setDropNames] = useState(()=> dd.map(name => name.length < 25 && <DropdownItem>{name}</DropdownItem>))

  function DropdownItem({children}){
    return(
      <div className="menu-item" onClick={()=> setFunction(children)}>
        {children}
      </div>
    )
  }
  
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
}

export default FiltersRL;