import React, { useEffect, useState } from 'react'
import Navbar1 from './Navbar'
import NavbarMobile from './NavbarMobile'
import { useLocation } from 'react-router-dom'

function HandleNavbar() {
  const [isAboveMessageShow, setIsAboveMessageShow] = useState(false)
   const location = useLocation()

  useEffect(()=>{



 if(location.pathname==="/"){
      setIsAboveMessageShow(true)
 }

    
  },[location.pathname])




  return (
    <>
      <div className='d-none d-md-block'>
      {/* {isAboveMessageShow && <div className='' style={{position:'static'}}>
    <p >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos laborum sunt quas?</p>
   </div>} */}
           <Navbar1 static="static"/>
      </div>
      <div className='d-block d-md-none'>
          <NavbarMobile static="static"/>
      </div>
      </>
  )
}

export default HandleNavbar