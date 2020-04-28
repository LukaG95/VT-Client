import React, {useState, useContext} from 'react'

function LoginForm() {
  const [open, setOpen] = useState(false)

  return (
    <div 
    style={open ? {display: "flex"} : {display: "none"}}
    className="shading" 
    onClick={()=> setOpen(false)}
    >

      <div className="loginWrapper">
          
      </div>

    </div>
  )
}

export default LoginForm
