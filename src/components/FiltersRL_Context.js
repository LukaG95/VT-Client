import React, {useState} from 'react'

const FiltersRLContext = React.createContext()

function FiltersRLContextProvider({children}) {
  const [game, setGame] = useState("Rocket League")
  const [searchType, setSearchType] = useState("I want to buy")
  const [name, setName] = useState("All")
  const [paint, setPaint] = useState("All")
  const [cert, setCert] = useState("All")
  const [itemType, setItemType] = useState("All")
  const [platform, setPlatform] = useState("All")


  return (
      <FiltersRLContext.Provider value={{game, setGame, searchType, setSearchType, name, setName, paint, setPaint, cert, setCert, itemType, setItemType, platform, setPlatform}}>
          {children}
      </FiltersRLContext.Provider>
  )
}

export {FiltersRLContextProvider, FiltersRLContext}
