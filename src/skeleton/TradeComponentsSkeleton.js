import React from 'react'
import ItemContainer from "../components/Rocket League/ItemContainer";
import useWindowDimensions from "../misc/windowHW";

import styles from "../components/Rocket League/Item.module.scss"

export default function PageNumbersSkeleton() {

  const { width } = useWindowDimensions();

  const items = Array(12).fill(item())

  return Array(12).fill(
    <div className="rltrade-container">

      {Header()}

      <div className="rltrade_cMidPlace">
        <div className="flex-col rl-has-container">
          <p className="haswant-text skeleton"></p>
          <ItemContainer className="smallerIcon">{items}</ItemContainer>
        </div>

        <div className="flex-col rl-wants-container">
          <p className="haswant-text skeleton"></p>
          <ItemContainer className="smallerIcon">{items}</ItemContainer>
        </div>

        <div className="flex-col rl_notes_buttons_container">
          <div className="notes-box skeleton">
          </div>

          <div className="buttons-box">
           <div className="skeleton"></div>
          </div>
        </div>
      </div>
    
    </div>
  )

  
function Header() {
  return (
    <div className="rltrade-cTopPlace">
      <div className="flex">
        <div className="trade-reputation">

          <div className="skeleton"></div>
          <div className="skeleton"></div>

        </div>

        <div className="trade-component-tagsAndTitle">
          <div className="trade-component-tags"></div>
          <p className={`trade-component-title ${width >= 957 && "skeleton"}`}></p>
        </div>
      </div>

      <div className="rl-trade-component-top-right">
        <div className="right-gamePlatform skeleton"></div>
        <div className="trade-post-time skeleton skeleton2"></div>
      </div>
    </div>
  );
}

function item(){
  return (
    <div className={`${styles.item} ${styles.skeleton}`}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <div className={`${styles.image}`}/>

        </div>
        <span className={styles.name} ></span>

      </div>
    </div>
  )
}
}

