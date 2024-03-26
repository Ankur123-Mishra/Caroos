import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function CategoryCardService({logo, SetChanges}) {
  console.log("logo", logo)
    const {pathname} = useLocation()
  return (
    <div key={logo?.id} className="col pb-3 pb-md-1 col-lg-3 col-6  d-flex justify-content-center align-items-center">
    <Link to={`/services/${logo?.slug}`} style={pathname===`/services/${logo?.slug}`?{fontSize:'7px',width:'133px', height:'59px', backgroundColor:'', borderBottom:'2px solid red'}:{ backgroundColor:'#474747', width:'133px', height:'54px'}} onClick={()=>SetChanges(false)} className='pointer  mt-2 mt-md-0 p-2 bg-white d-flex flex-row justify-content-around align-items-center'>   
      <img src={logo?.icon} width="30px" height="30px" className='' alt="" />
      <p style={pathname===`/services/${logo?.slug}`?{fontSize:'7px', color:'#DE3820', lineHeight:'13px'}:{fontSize:'7px', color:'#474747', lineHeight:'13px'}} className='categories-text text-center d-block mt-3 ms-1'>{logo?.name}</p>
    </Link>
  </div>
  )
}


export default CategoryCardService