import React, {useContext} from 'react'

import imageExists from '../../../misc/func'
import {TradeContextRL} from '../../../context/TradeContextRL'

function RLicon({item, selectedItems, setSelectedItems}) {
  
  const {pushItem, have, want} = useContext(TradeContextRL)

  return (
    <>
      <img 
        style={{height: "auto", width: "100%", maxWidth: "140px", cursor: "pointer", borderRadius: "5px 5px 0px 0px"}} 
        src={imageExists(`${item.ItemID}.0.webp`)}
        onClick={() => {pushItem(item); setSelectedItems([...selectedItems, item.ItemID])}} 
        alt=""
      />
      
      {confirmIcon()}
    </>
  ) 

  function confirmIcon(){
    let have_item = []
    let want_item = []

    have.map(space=> { 
      if (space.itemID == item.ItemID) have_item.push("a")
    })

    let result = have.filter(obj => {
      return obj.itemID === item.ItemID
    })

    if (result.length === 0)
      have_item = []

    want.map(space=> { 
      if (space.itemID == item.ItemID) want_item.push("a")
    })

    result = want.filter(obj => {
      return obj.itemID === item.ItemID
    })

    if (result.length === 0)
      want_item = []
  
    if(have_item.length > 0 && want_item.length > 0)
      return(
        <>
          <img src={require('../../../images/other/check.png')} className="success-added-have-items" />
          <img src={require('../../../images/other/check-red.png')} className="success-added-want-items" />
        </>
      )

    else if (have_item.length > 0)
      return <img src={require('../../../images/other/check.png')} className="success-added-have-items" />

    else if (want_item.length > 0)
      return <img src={require('../../../images/other/check-red.png')} className="success-added-want-items" />

    else return null
  }
}

export default RLicon