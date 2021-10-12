import React from 'react'
import styles from './GiveawayBanner.module.scss'

export default function GiveawayBanner() {
  return (
    <div onClick={()=> window.open("https://discord.gg/KugK5mWsV2")} className={styles.wrapper}>
      
      <p>500+ CREDITS</p>
      <img src="/images/RocketLeague/items/4743.0.png" />
      <p>DAILY GIVEAWAYS</p>
      
    </div>
  )
}
