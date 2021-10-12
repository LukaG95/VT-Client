import React, { useState } from "react";
import styles from "./ClearItems.module.scss";
import { ReactComponent as TrashGrey } from "../../images/icons/trashGREY.svg";
import { ReactComponent as TrashRED } from "../../images/icons/trashRED.svg";

export default function ClearItems({...props}) {
  const [Icon, setIcon] = useState(TrashGrey)

  return (
    <div
      {...props}
      className={[styles.button, props.className || ""].join(" ")}
      onMouseEnter={()=> {setIcon(TrashRED)}}
      onMouseLeave={()=> {setIcon(TrashGrey)}}
    >
      <Icon className={[styles.icon, props.iconClassName || ""].join(" ")} />
    </div>
  );
}
