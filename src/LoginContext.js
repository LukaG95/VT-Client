import React, {useState, useContext} from 'react'

const LoginContext = React.createContext()

function LoginContextProvider({children}) {
  const [openForm, setOpenForm] = useState("none")


  return (
      <UserContext.Provider value={{openForm, setOpenForm}}>
          {children}
      </UserContext.Provider>
  )
}

export {LoginContextProvider, LoginContext}
