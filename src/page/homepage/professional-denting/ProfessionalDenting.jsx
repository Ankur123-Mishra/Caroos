import React from 'react'
import professionalImg from '../../../asets/professional1.png' ;
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
function ProfessionalDenting({dentPent}) {
  return (
     <>
     {/* prefessional denting */}
      <div className="container-fluid py-5">
        <div className="container">
           <div className="row">
            <div className="col-12 col-md-5">
            <p className='red-t medium-text'>WHO WE ARE</p>
            {/* <h3 className='heading red-t'>Professional Denting, Penting And Detailing</h3> */}
            <div className='col-12 d-block d-md-none'>
               <div>
               <img src={professionalImg} className='img-fluid' alt="professionalImg" />
               </div>
            </div>  
            <p className='normal-text' dangerouslySetInnerHTML={{ __html: dentPent?.content }}/>
 <Link to="/about-us" className='red-btn'>More About Us</Link>
            </div>
            <div className="col-12 col-md-7 d-none d-md-block">
            <div className='ms-md-4'>
            <Carousel fade controls={false}>
      <Carousel.Item>
      <img src={dentPent?.image} className='img-fluid' alt="professionalImg" />
        
      </Carousel.Item>
      
    </Carousel>

            
            </div>    
            </div>
           </div>
        </div>
      </div>
      {/* quality service */}
      <div className="container-fluid mb-md-4 position-relative" style={{backgroundColor:'#EDF5F9'}}>
        <div className="container py-4">
            <div className="row">
              <p className="tringle position-absolute">
                <p className='newtext'>New</p>
              </p>
                <div className="col-12 col-md-7">
                    <h3 className='heading red-t text-center text-md-start ' >Buying a new car ? Don’t risk it. <br />
                     Get a free pre delivery inspection now</h3>
                </div>
                <div className=" col-12 text-center col-md-5 d-md-flex justify-content-end align-items-center text-md-end">
                    <Link to="/pre-delivery-inspection" className='red-btn'>Explore</Link>
                </div>
            </div>
        </div>
      </div>
      </>
  )
}

export default ProfessionalDenting