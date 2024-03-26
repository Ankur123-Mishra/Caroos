import React from 'react'
import workArr from './worprocessArr'
import arrowup from '../../../asets/arrow-up.png';
import arrowdown from '../../../asets/arrow-down.png';
import { Link } from 'react-router-dom';
function WorkProcess({scrollToChild, workProcess}) {
  return (
    <div className="container-fluid py-5 mb-4" style={{backgroundColor:'#EDF5F9'}}>
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                   {/* <p className='red-t text-center normal-text'>HOW IT WORK</p> */}
                   <h3 className='red-t text-center heading'>How We Work</h3>
                   <p style={{color:'#62718D'}} className='pb-0 normal-text m-o text-center'>We transform your car with our<br />  expert detailing services. Book Now!</p>
                    
                </div>

            </div>
            <div className="row py-4 position-relative">
            {workProcess?.map((work, idx)=>(
                <div key={idx+1} className="col-12 col-md-4">
                   <div className="work-card p-2 d-flex justify-content-center flex-column gy-2 align-items-center">
                   <img src={work?.icon} className='rounded-circle mt-2' alt="" />
                   <p className='red-t work-heading text-center mt-2'>{work?.heading}</p>
                   <p style={{color:'#62718D'}} className='text-center work-text'>{work?.content}</p>
                   </div>                 
                </div>
            ))}
            <img src={arrowdown} alt=""  className='position-absolute d-none d-md-block arrow1' />
            <img src={arrowup} alt="" className='position-absolute d-none d-md-block arrow2' />
               <div className="col-12 text-center pb-3 pb-md-1">
                <Link to="/services/detailing" style={{cursor:'pointer'}} className='appointment-btn'>Book Now</Link>
               </div>
            </div>
        </div>
    </div>
  )
}

export default WorkProcess