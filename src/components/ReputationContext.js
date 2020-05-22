import React, {useState, useEffect} from 'react'

const ReputationContext = React.createContext()

function RepContextProvider({children}) {

  const [rep, setRep] = useState()
  const [platform, setPlatform] = useState()

  return (
    <ReputationContext.Provider value={{rep, setRep, platform, setPlatform}}>
      {children}
    </ReputationContext.Provider>
  )
}

export {RepContextProvider, ReputationContext}
