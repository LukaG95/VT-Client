import React, {useContext} from 'react'

import {viewSidebar} from '../../misc/manageSidebar'
import {TbFiltersRLContext} from '../../context/TbFiltersRLContext'

function SidebarHamburger(){

  const {setIsOpen_LeftSidebar} = useContext(TbFiltersRLContext)

  return(
    <div onClick={()=> {viewSidebar(); setIsOpen_LeftSidebar(true)}} className="hamburger_wrapper">
      <div className="hamburger">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )

}

export default SidebarHamburger