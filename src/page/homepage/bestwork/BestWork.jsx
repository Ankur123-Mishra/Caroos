import React from 'react'
import Slider from "react-slick";
import '../homepage.css'
function BestWork({socialMediaData}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 2800,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 3,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="container-fluid bestwork-container red-b py-5">
        <div className="container position-relative">
        <h3 className='text-center py-2 text-white'>See our best works through our social media Handle</h3>
            <div className="scroll-content position-relative pb-4 pb-md-1">
            <Slider {...settings} className='socialmain-slider'>
            {socialMediaData.map((social, idx)=>(
              <div key={idx+1} className='social-slider d-flex justify-content-center align-items-center'>
                    <a href={social?.link} target='_blank' className='img-bestwork-carousel'  >
                    <img src={social.image}  className='img-fluid rounded ' alt="" />
                    </a>
                   
                    

                
             </div>
            ))}
         
        </Slider>
            </div>
        </div>
    </div>
  )
}

export default BestWork