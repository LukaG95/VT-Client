import React from 'react'

function imageExists(url){
  let x = null
  try{
    x = <img src={require(`../images/RLimages/${url}`)}/>
    return require(`../images/RLimages/${url}`)
  }
  catch{
    return require("../images/RLimages/question.png")
  }
}

export default imageExists