import React, { useEffect, useState } from 'react'
import styles from './Campaigns.module.scss'
import axios from 'axios'

export default function Campaigns() {
  const [partners, setPartners] = useState([])

  const [newPartnerName, setNewPartnerName] = useState("")
  const [deletePartnerName, setDeletePartnerName] = useState("")

  useEffect(()=> {
    axios
      .get("/api/ref")
      .then((res) => {
        console.log(res.data)
        if (res.data.info === "success") 
          setPartners(res.data.partners)
      })
      .catch((err) => {});
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <input 
          placeholder="new partner" 
          onChange={e=> setNewPartnerName(e.target.value)}
          value={newPartnerName}
        /> 
        <button onClick={()=> createPartner()}>Add</button>

        <input 
          placeholder="delete partner" 
          onChange={e=> setDeletePartnerName(e.target.value)}
          value={deletePartnerName}
        /> 
        <button onClick={()=> deletePartner()}>Delete</button>
      </div>

      <div className={styles.partners}>
        {
          partners.map(partner => 
            <>
              <p>{partner.partner}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{partner.tracking}</p>
              <hr />
            </>
          )
        }
      </div>
    </div>
  )

  function createPartner(){
    if (newPartnerName && newPartnerName !== ""){
      axios
        .post("/api/ref", {name: newPartnerName})
        .then((res) => {
          if (res.data.info === "success"){
            window.location.reload()
          }
         
        })
        .catch((err) => {});
    }
  }

  function deletePartner(){
    if (deletePartnerName && deletePartnerName !== ""){
      axios
        .delete("/api/ref", { data: {name: deletePartnerName} })
        .then((res) => { 
          if (res.data.info === "success"){
            window.location.reload()
          }
         
        })
        .catch((err) => {});
    }
  }
}
