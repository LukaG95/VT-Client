import React, {useState, useEffect} from 'react'

const UserContext = React.createContext()

function UserContextProvider({children}) {
    const [userInfo, setUserInfo] = useState([])


    useEffect(() => {
      
      /*-----Backend work              ----

        fetch(<url>)
            .then(res => res.json())
            .then(data => setUserInfo(data))
        
      */

      // Testing example
      setUserInfo({
        theme: "dark",
        myTrades: {
          RL: { /* ... */ },
          CSGO: { /* ... */ },
          TEMTEM: { /* ... */ }
        },
        profileSettings: {
          name: { /* ... */ },
          description: { /* ... */ },
          other: { /* ... */ }
        }
      })
      

    }, [])
    

    
    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext}