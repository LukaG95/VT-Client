import React, {useState, useEffect} from 'react'

const UserContext = React.createContext()

function UserContextProvider({children}) {
  const [username, setUsername] = useState("none")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [trades, setTrades] = useState("none")
  const [reputation, setReputation] = useState("none")

  const [openForm, setOpenForm] = useState(false)

  useEffect(() => {
    
    /*-----Backend work              ----

      fetch(<url>)
          .then(res => res.json())
          .then(data => setUserInfo(data))
      
    */

  }, [])


  return (
      <UserContext.Provider value={{username, setUsername, isLoggedIn, setIsLoggedIn, trades, setTrades, reputation, setReputation, openForm, setOpenForm}}>
          {children}
      </UserContext.Provider>
  )
}

export {UserContextProvider, UserContext}
