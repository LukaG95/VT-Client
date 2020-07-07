import React, {useState, useEffect} from 'react'
import axios from 'axios'

const UserContext = React.createContext()

function UserContextProvider({children}) {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState()
  const [myID, setMyID] = useState()
  const [role, setRole] = useState()

  useEffect(() => {
    axios.get('/api/auth/getUser')
      .then (res => {
        if (res.data.status === "success"){
          setIsLoggedIn(true)
          setMyID(res.data.user._id)
          setUsername(res.data.user.username)
          setEmail(res.data.user.email)
        }
        else 
        setIsLoggedIn(false)

      })
      .catch(err => console.log(err))
  }, [])

  
  return (
      <UserContext.Provider value={{username, email, isLoggedIn, setIsLoggedIn, myID, role}}>
          {children}
      </UserContext.Provider>
  )
}

export {UserContextProvider, UserContext}