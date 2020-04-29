import React, {useState, useEffect} from 'react'
import axios from 'axios'

const UserContext = React.createContext()

function UserContextProvider({children}) {
  const [username, setUsername] = useState("none")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [trades, setTrades] = useState("none")
  const [reputation, setReputation] = useState("none")

  const [openForm, setOpenForm] = useState(false)

  useEffect(() => {
    
    axios.get('https://justlearningfront.website/auth/getUser')
      .then(res => console.log(res))
      .catch(err => console.log(err))
      
  }, [])


  return (
      <UserContext.Provider value={{username, setUsername, isLoggedIn, setIsLoggedIn, trades, setTrades, reputation, setReputation, openForm, setOpenForm}}>
          {children}
      </UserContext.Provider>
  )
}

export {UserContextProvider, UserContext}
