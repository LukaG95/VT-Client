import React, {useState} from 'react'

const FiltersRLContext = React.createContext()

function FiltersRLContextProvider({children}) {
  const [game, setGame] = useState("Rocket League")
  const [searchType, setSearchType] = useState("I want to buy")
  const [name, setName] = useState("Any")
  const [paint, setPaint] = useState("Any")
  const [cert, setCert] = useState("Any")
  const [itemType, setItemType] = useState("Any")
  const [platform, setPlatform] = useState("Any")


  return (
      <FiltersRLContext.Provider value={{game, setGame, searchType, setSearchType, name, setName, paint, setPaint, cert, setCert, itemType, setItemType, platform, setPlatform}}>
          {children}
      </FiltersRLContext.Provider>
  )
}

export {FiltersRLContextProvider, FiltersRLContext}
