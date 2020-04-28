import React, {useState, useContext} from 'react'

import {UserContext} from '../UserContext'

function LoginForm() {
  const {openForm, setOpenForm} = useContext(UserContext)

  return (
      <div 
      style={openForm ? {display: "flex"} : {display: "none"}}
      className="shading" 
      onClick={()=> setOpenForm(false)}
      >

        <div className="loginWrapper">
            
        </div>

      </div>
  )
}

export default LoginForm
