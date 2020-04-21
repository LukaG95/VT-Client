import React, {useState} from 'react'

function FiltersRL() {
  const [game, setGame] = useState("All")
  const [searchType, setSearchType] = useState("I want to buy")
  const [name, setName] = useState("All")
  const [paint, setPaint] = useState("All")
  const [cert, setCert] = useState("All")
  const [itemType, setItemType] = useState("All")
  const [platform, setPlatform] = useState("All")

  function filterGame(){
    setGame("Rocket League")
  }


  return (
    <div className="sbSection">

      <button onClick={() => filterGame()}>Game - {game}</button>
      <button>Search Type - {itemType}</button>
      <button>Name - {name}</button>
      <button>Paint - {paint}</button>
      <button>Certification - {cert}</button>
      <button>Item Type - {searchType}</button>  
      <button>Platform - {platform}</button>  

    </div>
  )
}

export default FiltersRL;


// Make this component save state of all filters, and on submittion rerender the trading page accordingly