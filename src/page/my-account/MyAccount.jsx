import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../../Axios'
import Toast from '../../Tost'



function MyAccount() {
 

    const arrnew = [
        {
            name:"My Details",
            url:'/my-details'
        },
        {
            name:"My Cars",
            url:"/my-cars"
        },
        {
            name:"My Orders",
            url:"/my-orders"
        }
    ]
  return (
       <div className="container-fluid fullHeight nav-margin d-flex justify-content-center align-items-center">
        <div className="container">
            <div className="row card-shadow bg-lightblue py-2 position-relative ">
                <div className="col-12 py-3">
                <p className='text-center red-t mb-3 py-3'>Hi Ashsih Kumar Welcome to caross</p>
                </div>
                <div className="col-12 d-md-flex justify-content-center align-items-center">
                    <ul className='d-flex flex-column flex-md-row justify-content-center align-items-center'>
                    {arrnew.map((val, idx)=>(
                        <li key={idx+1} className='my-4 my-0'>
                        <Link to={`${val?.url}`} className='ms-md-3 my-3 red-b rounded text-white p-3 card-shadow'>
                         {val?.name}
                    </Link>
                        </li>
                        ))}
                    </ul>
                </div>
                {/* <button onClick={onLogout} className='btn-logout red-btn'>Logout</button> */}
            </div>
        </div>
       </div>
  )
}

export default MyAccount