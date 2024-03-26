import React from 'react'
import Slider from "react-slick";
import testimonialArr from './testimonialArr';
import { SampleNextArrow, SamplePrevArrow } from './SampleNextArrow';
import { Helmet } from 'react-helmet';

function Testimonial({testimonials}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 2400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
      
        autoplaySpeed: 2000,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
      };
  return (
    <>
      <Helmet>
                
          
      <meta name="description" content="Read what our satisfied clients have to say about Caross.in. Explore testimonials highlighting the exceptional auto detailing experiences and transformations our customers have enjoyed. Choose Caross.in for premium automotive care and stunning results."></meta>
            </Helmet>
    <div className="container-fluid py-5 mt-20" style={{backgroundColor:'#FEF9F8'}}>
         <div className="container">
            <div className="row">
            <div className="col-12">
                {/* <p className='text-center mb-2 red-t small-text'>TESTIMONIAL</p> */}
                <h3 className='text-center red-t heading'>Customer Experiences</h3>

            </div>
                <div className="col-12 d-flex justify-content-center align-items-center ">
                    <div className="testimonial-contaner px-3 py-md-4">
                    <Slider {...settings}>
                    {
                        testimonials?.map((testimonials, idx)=>(
                            <div key={idx+1}>
                                <p style={{fontWeight:'300', color:'#DE3820'}} className='text-center normal-text'>{testimonials?.review}</p>
                                <div className='text-center'>
                                <span style={{fontWeight:'bold'}}>{testimonials?.name}</span>&nbsp;&nbsp;&nbsp;
                                <i class="fa-solid fa-star" style={{color: '#ede60c'}}></i>
                                <i class="fa-solid fa-star" style={{color: '#ede60c'}}></i>
                                <i class="fa-solid fa-star" style={{color: '#ede60c'}}></i>
                                <i class="fa-solid fa-star" style={{color: '#ede60c'}}></i>
                                <i class="fa-solid fa-star" style={{color: '#ede60c'}}></i>
                                </div>
                                
                             </div>
                        ))
                    }

          
          
        </Slider>
                    </div>
                </div>
            </div>
         </div>
    </div>
    </>
  )
}

export default Testimonial