import React, {useState} from 'react'

const TbFiltersRLContext = React.createContext()

function TbFiltersRLContextProvider({children}) {
  const [game, setGame] = useState("Rocket League")
  const [searchType, setSearchType] = useState("I want to buy")
  const [name, setName] = useState("Any")
  const [color, setColor] = useState("Any")
  const [cert, setCert] = useState("Any")
  const [itemType, setItemType] = useState("Any")
  const [platform, setPlatform] = useState("Any")


  return (
      <TbFiltersRLContext.Provider value={{game, setGame, searchType, setSearchType, name, setName, color, setColor, cert, setCert, itemType, setItemType, platform, setPlatform, resetFilters}}>
          {children}
      </TbFiltersRLContext.Provider>
  )

  function resetFilters(){
    setGame("Rocket League")
    setSearchType("I want to buy")
    setName("Any")
    setColor("Any")
    setCert("Any")
    setItemType("Any")
    setPlatform("Any")
  }
}

export {TbFiltersRLContextProvider, TbFiltersRLContext}
