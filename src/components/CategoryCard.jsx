import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Slider from "react-slick";

function CategoryCard({logo, SetChanges, isVisible}) {
  const {pathname} = useLocation()
  
  return (
    <>
           
      <div key={logo?.id} className=" d-md-flex d-none justify-content-center align-items-center col-sm-3 col-md-2">
        <Link to={`/services/${logo?.slug}`} style={{backgroundColor:pathname===`/services/${logo?.slug}`?'red':'#FAFAFA'}} onClick={()=>SetChanges(false)} className='card-shadow pointer logos bg-lightblue  mt-2 mt-md-0 p-0 p-md-2 bg-white d-flex flex-column justify-content-around align-items-center'>   
          <img src={pathname===`/services/${logo?.slug}`?logo?.icon_white:logo?.icon} height="36.06px" width="36.06px" style={{color:'white'}} className='' alt="" />
          <p style={pathname===`/services/${logo?.slug}`?{fontSize:'16px', lineHeight:'20px', fontWeight:'500', color:'#DE3820'}:{fontSize:'16px', lineHeight:'20px', fontWeight:'500', color:'#474747'}} className='text-center mt-1'>{logo?.name}</p>
        </Link>
      </div>

     


     
           <div key={logo?.id} className="col pb-3 pb-md-1 col-lg-3 col-6  d-flex d-md-none justify-content-center align-items-center">
        <Link to={`/services/${logo?.slug}`} style={{width:'110px', height:'40px'}} onClick={()=>SetChanges(false)} className='card-shadow pointer bg-lightblue rounded  mt-2 mt-md-0 p-2 bg-white d-flex flex-row justify-content-around align-items-center'>   
          <img src={logo?.icon} width="30px" height="30px" className='' alt="" />
          <p style={pathname===`/services/${logo?.slug}`?{fontSize:'8px', color:'#DE3820'}:{fontSize:'8px', color:'#474747'}} className='categories-text text-center d-block mt-3'>{logo?.name}</p>
        </Link>
      </div>
    </>
  )
}

export default CategoryCard