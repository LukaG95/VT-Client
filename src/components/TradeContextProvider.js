import React, {useState, useEffect} from 'react'

const TradeContext = React.createContext()

function TradeContextProvider({children}) {
  const [have, setHave] = useState([
    {id: 1, url: "", isFocused: true, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 2, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 3, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 4, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 5, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 6, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 7, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 8, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 9, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 10, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 11, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1},  
    {id: 12, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}
  ])

  const [want, setWant] = useState([
    {id: 13, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 14, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 15, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 16, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 17, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 18, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 19, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 20, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 21, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 22, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}, 
    {id: 23, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1},  
    {id: 24, url: "", isFocused: false, isDropdown: false, color: "none", cert: "none", amount: 1}
  ])

  const [notes, setNotes] = useState("")
  const [platform, setPlatform] = useState("Steam")
  
  
  useEffect(()=>{
    window.addEventListener("click", click)
    return () => {window.removeEventListener("click", click)}
  },[])
 

  function click(e){
    if(e.target.name !== "enableDropdown"){
      let temp=[] 
      have.map(item => {
        item.isDropdown = false
        temp.push(item)
      })
     setHave(temp)
    }
  }


  // deletes all the focuses and focuses on the clicked field
  function manageFocus(e){
    if(e.target.id !== "focusedButton"){
      let temp = []
      have.map(item => {
        if (item.isFocused === true){
          item.isFocused = false
          temp.push(item)
        }
        else if (e.target.name == item.id){
          item.isFocused = true
          temp.push(item)
        }
        else temp.push(item)
        
      })
      setHave(temp)

      temp = []

      want.map(item => {
        if (item.isFocused === true){
          item.isFocused = false
          temp.push(item)
        }
        else if (e.target.name == item.id){
          item.isFocused = true
          temp.push(item)
        }
        else temp.push(item)
        
      })
      setWant(temp)
    }

  }

  // pushes the clicked item on the focused field and focuses the next field
  function pushItem(e){
    let current = undefined
        let temp = []
        have.map(item => {
          if (item.isFocused === true){
            item.isFocused = false
            item.url = e.target.name
            current = item.id
          } 
          if (item.id === current + 1){
            item.isFocused = true
          }
         temp.push(item)
        })
        setHave(temp)

        temp = []

        want.map(item => {
          if (item.isFocused === true){
            item.isFocused = false
            item.url = e.target.name
            current = item.id
          } 
          if (item.id === current + 1){
            item.isFocused = true
          }
         temp.push(item)
        })
        setWant(temp)
  }

  // this should also set color and cert to "none" 
  function clearHaveItems(){
      let temp = []
      have.map(item => {
        item.url = ""
        temp.push(item)
      })
      setHave(temp)
  }

  // this should also set color and cert to "none" 
  function clearWantItems(){
    let temp = []
      want.map(item => {
        item.url = ""
        temp.push(item)
      })
      setWant(temp)
  }

  return (
    <TradeContext.Provider value={{have, setHave, want, setWant, manageFocus, pushItem, clearHaveItems, clearWantItems}}>
      {children}
    </TradeContext.Provider>
  )
}

export {TradeContextProvider, TradeContext};
