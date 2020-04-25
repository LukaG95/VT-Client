import React, {useState, useEffect} from 'react'

const FilterContext = React.createContext()

function FilterContextProvider({children}) {
    const [rlFilters, setRlFilters] = useState([])

    const [isOpen, setRlFilters] = useState([])
    const [rlFilters, setRlFilters] = useState([])

    
    function toggleDropdown(){

    }

    



    return (
        <FilterContext.Provider value={{rlFilters, setRlFilters}}>
            {children}
        </FilterContext.Provider>
    )
}

export {UserContextProvider, UserContext}

/* 
This component will hold state for all filters meaning:
  a) either they are opened or closed
  b) list of all dropdown items

*/