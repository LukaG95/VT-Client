import React, {useState, useContext, useEffect} from 'react'

import {ReactComponent as ArrowIcon} from '../images/other/down-arrow.svg'
import {UserContext} from '../UserContext'

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

      <FilterButton text={`Game`}          value={game} />
      <FilterButton text={`Search`}        value={searchType}/>
      <FilterButton text={`Name`}          value={name} />
      <FilterButton text={`Paint`}         value={paint} />
      <FilterButton text={`Certification`} value={cert} />
      <FilterButton text={`Item Type`}     value={itemType} />
      <FilterButton text={`Platform`}      value={platform} />

    </div>
  )


  function handleChange(){
    console.log("heh")
  }


  function FilterButton({text, value}){
    return(
      <div className="filterButton">
        <div>{text}&nbsp;&nbsp; -<p id="fix">{value}</p></div>
        <ArrowIcon />
      </div>
    )
  }


}

export default FiltersRL;



// this componenent / function (FiltersRL) will receive the userInfo from props (or imported) and store it in state 