import React, {useState, useEffect} from 'react'
import axios from 'axios'

const UserContext = React.createContext()

function UserContextProvider({children}) {
  const [user, setUser] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState()
  const [myID, setMyID] = useState()

  // testing
  const [displayWebsite, setDisplayWebsite] = useState()
  const [role, setRole] = useState()

  useEffect(() => {
    axios.get('/api/auth/getUser')
      .then (res => {
        if (res.data.status === "success"){
          setUser(res.data.user)
          setIsLoggedIn(true)
          setMyID(res.data.user._id)
          setUsername(res.data.user.username)
          setEmail(res.data.user.email)
        }
        else 
        setIsLoggedIn(false)
      
      })
      .catch(err => console.log(err))


      axios.get('/api/test/getUser')
      .then (res => { 
        console.log(res)
        if (res.data.status === "success"){
          setDisplayWebsite(true)
          setRole(res.data.user.role)
        }
        else
        setDisplayWebsite(false)

      })
      .catch(err => console.log(err))

  }, [])

  
  return (
      <UserContext.Provider value={{user, username, email, isLoggedIn, setIsLoggedIn, myID, role, displayWebsite}}>
          {children}
      </UserContext.Provider>
  )
}

export {UserContextProvider, UserContext}