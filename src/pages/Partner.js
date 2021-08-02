import React, { useEffect, useState } from 'react'
import { useParams, Redirect } from "react-router-dom";
import styles from './Partner.module.scss'
import axios from 'axios'

export default function Partner() {
  const [partner, setPartner] = useState()

  const { tracking } = useParams()

  useEffect(()=> {
    axios
      .get(`/api/ref/tracking/${tracking}`)
      .then((res) => { console.log(res.data)
        if (res.data.info === "success")
          setPartner(res.data)
      })
      .catch((err) => { setPartner(false) });
  }, [])

  if (partner)
    return (
      <div className={styles.wrapper}>
        
        <div className={styles.textBlock}>
          <p>Partner</p>
          <p>{partner.name}</p>
        </div>

        <div className={styles.textBlock}>
          <p>Total clicks</p>
          <p>{partner.clicks.length}</p>
        </div>
        
      </div>
    )
  else if (partner === false) return <Redirect to="/" />
  else return null
}
