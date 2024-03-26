import React, { useContext, useEffect } from 'react'
import changecar from '../../../asets/image 37.png'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from '@mui/material/Button';
import ChangeCarDetails from './changeCarDetails'
// import { AuthContext } from '../../../AuthProvider'
// import { addCarContext } from '../../../context/AddCarProvider'
// import Loader from '../../../Loader'

import { Link } from 'react-router-dom'
import ChangeCarMobile from './ChangeCarMobile';
import { ButtonBase, IconButton } from '@mui/material';

function ChangeCar({userCarDetails}) {
//   const {userToken} = useContext(AuthContext)
//  const {handleGetCars, loading, userCarDetails} = useContext(addCarContext)


//  useEffect(()=>{
//   handleGetCars(userToken)
//  },[])
//console.log("defaultcar..",userCarDetails)
  return (
    <>
        <div className='d-none position-sticky d-md-flex justify-content-center aling-items-center shadow rounded me-2' style={{width:'100%', float:'right', top:'40px'}}>
        <div className=" p-2" style={{width:'90%'}} >
          <div className='d-flex justify-content-center px-4 py-3' style={{}}>
          <img src={userCarDetails?.model?.image} className='img-fluid bg-lightblue' style={{width:'80%'}}  alt="" />
          </div>
          <div className='text-center d-flex justify-content-center align-items-center'>
                {/* <p className=' text-center fw-bold p-0 m-0' style={{fontSize:'10px'}}>{userCarDetails?.brand}</p> */}
                <p className=' text-heading text-center'>{userCarDetails?.brand} {userCarDetails?.model.value}</p>
                
                <Link to="/my-cars" className='margin-b' style={{marginBottom:'16px'}}>
                <IconButton aria-label="delete" color='error'>
                  <ModeEditIcon />
              </IconButton>
            </Link>
                {/* <Link to="/my-cars" className='red-btn-block'>Change Car </Link> */}
             </div>
        </div>
        </div>
        {/* <div className="container d-none d-md-block">
        
          <div key={userCarDetails?.id} className="row card-shadow bg-lightblue mb-3 p-3 rounded">
            <div className="col-12 col-md-8">
            <div className="row">
                <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-center">
                <div className=''>
                <img src={userCarDetails?.image} className='img-fluid bg-lightblue' alt="" />
             </div>
                </div>
                <div className="col-12 col-md-8 d-flex justify-content-center justify-content-md-start align-items-center">
                <div className='py-2 py-md-0'>
                <h5 className='text-heading  text-center text-md-start'><span>Brand:</span>&nbsp;{userCarDetails?.brand}</h5>
                <h5 className='text-heading  text-center text-md-start'><span>Model:</span>&nbsp;{userCarDetails?.model}</h5>
                <h5 className='text-center text-md-start'><span>Reg Year:</span>&nbsp;{userCarDetails?.reg_year}</h5>
             </div>
                    </div>
            </div>            
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-center">
              <ChangeCarDetails Cars={userCarDetails}/>comment me
              <Link to="/my-cars" className='red-btn'>Change Car </Link>
            </div>

          </div>
          
        </div> */}

         <div className="container d-block mt-4 d-md-none">
                     
                     <ChangeCarMobile userCarDetails={userCarDetails}/>



         </div>

        </>
  )
}

export default ChangeCar