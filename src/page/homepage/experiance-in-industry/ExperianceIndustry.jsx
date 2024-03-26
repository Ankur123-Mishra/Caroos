import React from 'react'
import '../homepage.css'
import CountUp from 'react-countup';
import carexp from '../../../asets/experience.png'
import listImg from '../../../asets/listImg.png'
import Growing from './Growing';
function ExperianceIndustry({scrollToChild, grow}) {
   const growarr = [
      {id:1, number:6, name:'YEAR OF EXPERIENCE', suffix:''},
      {id:2, number:70, name:'TOTAL CARS SERVICED', suffix:''},
      {id:3, number:1, name:'TRUSTED CLIENT', suffix:'K'}
   ]
  return (
    <>
     <div className="container-fluid py-5 " style={{backgroundColor:'#b8242a'}}>
        <div className="row">
            <div className="col-12 col-md-6 px-0 d-none d-md-block">
            <div className="img-container">
            <img src={carexp} className='img-fluid px-0' alt="" />
            </div>
               
            </div>
            <div className="col-12 col-md-4 d-md-flex flex-column justify-content-center">
                 <h2 className='heading text-white fw-bold text-center text-md-start'>6 Years of Experience in Industry</h2>
                 <p className='normal-text text-center text-md-start text-white' style={{fontWeight:'200'}}>Caross, your car's haven, providing the finest comprehensive services.</p>
                 <ul className='text-white' >
                    <li className='mb-2 industry-opt-text'><img src={listImg} className='me-2' width="23px" height="23px"  alt="" />Detailing</li>
                    <li className='mb-2 industry-opt-text'><img src={listImg} className='me-2' width="23px" height="23px" alt="" />Denting & Painting</li>
                    <li className='mb-2 industry-opt-text'><img src={listImg} className='me-2' width="23px" height="23px" alt="" />Accessories</li>
                    <li className='mb-2 industry-opt-text'><img src={listImg} className='me-2' width="23px" height="23px" alt="" />RSA and Parking</li>
                    <li className='mb-2 industry-opt-text'><img src={listImg} className='me-2' width="23px" height="23px" alt="" />Periodic Services</li>
                    <li className='industry-opt-text'><img src={listImg} className='me-2' width="23px" height="23px" alt="" />Pre-Delivery Inspection</li>
                 </ul>
            </div>
              <div className="col-12 d-block d-md-none">
              <div className="img-container d-none d-md-block">
            <img src={carexp} className=' img-car px-0' alt="" />
            </div>
              </div>
            <div className="col-2 d-none d-md-block"></div>
            <div className="col-12">
              <div className="row">
               <div className="col-12 col-md-2"></div>
               <div className="col-12 col-md-8">
                 {growarr?(<div className="row">
                
                  {/* {growarr.map((grow)=>(
                     
                     <div key={grow?.id} className="col-4 col-md-4 d-flex justify-content-center align-items-center">
                   
                    <ul className='d-flex p-md-0 industry-li justify-content-md-center align-items-center'>
                       <li className='industry-li1 text-white me-2'>
                           <CountUp end={grow.number} delay={3} suffix={`${grow?.suffix}`}>
                                 {({ countUpRef }) => (
                                    <div>
                                    <span ref={countUpRef} />
                                    </div>
                                 )}
                                </CountUp>
                       </li>
                       <li className='industry-li2 text-white'>{grow?.name}</li>
                    </ul>
                    
                 </div>
                  ))} */}
                     
                  <div key={grow?.id} className="col-4 col-md-4 d-flex justify-content-center align-items-center">
                   
                   <ul className='d-flex flex-column p-md-0 industry-li justify-content-md-center align-items-center'>
                      <li className='industry-li1 text-white '>
                          <CountUp end={6} suffix='+' />
                               
                           
                      </li>
                      <li className='industry-li2 text-white  mt-md-4 mt-2'>YEAR OF EXPERIENCE</li>
                   </ul>
                   
                </div>

                     <div className="col-4 col-md-5 p-0  ">
                     <ul className='d-flex flex-column p-0 industry-li justify-content-start align-items-center'>
                           <li  className='industry-li1 text-white'>
                           <CountUp end={70} suffix='+'/>
                                    
                          
                           </li> 
                           <li className='industry-li2 text-white  mt-md-4 mt-2'>Total Cars  Serviced</li>
                        </ul>
                     </div>
                     <div className="col-4 p-0 col-md-3 d-flex d-md-block justify-content-center">
                     <ul className='d-flex flex-column p-0 industry-li justify-contetn-center align-items-center'>
                           <li className='industry-li1 text-white text-center'>
                           <CountUp end={3000} suffix='+'/>
                           </li>
                           <li className='industry-li2 mt-md-4 mt-2 text-white'>Trusted Client</li>
                        </ul>
                     </div>
                  </div>):(<h3>not working</h3>)}
               </div>
               <div className="col-12 col-md-2"></div>
               </div>
            </div>
        </div>
            
     </div>
     {/* request a call back */}
     <div className="container-fluid my-5 px-md-5">
        <div className="card-section red-b rounded p-4 shadow">
        <div className="container">
             <div className="row">
                <div className="col-12 col-md-8">
                     <h3  className='text-white text-center callbck-heading text-md-start'>Do you need help with your vehicle?</h3>
                     <p className='text-white text-center text-md-start mt-2 normal-text'>Send us a message, or Call Us <a href='tel:8929227077' style={{fontWeight:'bold', color:'white'}}> +91 8929227077</a> between 09:00 AM - 06:00 PM,  Mon -Sun.</p>
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-center justify-md-content-end align-items-center">
                  <button onClick={scrollToChild} style={{paddingLeft:'px', paddingRight:'7px'}} className='white-btn calback-btn shadow rounded'>Request a Callback</button>
                </div>
             </div>
             </div>
        </div>
     </div>
     </>
  )
}

export default ExperianceIndustry