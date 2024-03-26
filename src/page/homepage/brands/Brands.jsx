import React from 'react'
import Slider from "react-slick";
//import brandsImg from '../../../asets/brands.png'
function Brands({brand, text, maintext}) {

  var settings = {

    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    arrows:false,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          autoplay: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
          autoplay: true,
          arrows:false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          arrows:false,
        }
      }
    ]
  };
  return (
    <div className="container-fluid py-4">
        <div className="container">
           <h3 style={{fontWeight:'800'}} className='red-t text-center heading'><span className='brand-text'>{maintext}</span> <b style={{color:'#121212', fontWeight:'500',fontSize:'27px'}}>{text}</b></h3>
           <div className="row mt-3 gap-md-2 justify-content-center align-items-center">
              <div className="col-1 d-none d-md-block"></div>

              <Slider {...settings}>
          
          {
            brand.map((val, idx)=>(   
                  <div className='d-flex justify-content-center align-items-center' key={idx+1} >
                  <div style={{maxWidth:'200px', height:'100px'}}  className="col-3 p-2 col-md-2 d-flex justify-content-center align-items-center">
                    <img src={val?.image} className='img-brnads' alt="" />
                  </div>     
                  </div>                    
                ))
               }  
          
         </Slider> 

              
              <div className="col-1 d-none d-md-block"></div>
            
           </div>
        </div>
    </div>
  )
}

export default Brands