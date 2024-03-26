import React, { useEffect, useState } from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
import Toast from '../../Tost'
import Axios from '../../Axios'
import Loader from '../../Loader'
import CaroselBanner from '../../components/CaroselBanner'

function Workshop() {

  const [isLoading, setIsLoading] = useState(false)
 const [workshopData, setWorkshopData] = useState()
 const [workshopBanner, setWorkshopBanner] = useState([])

 const getWorkshopBanner= async () =>{
  try {
    const response = await Axios.get('/get_workshop_banner'); 
       if(response.status===200){
        const data = response?.data;
                setWorkshopBanner(data?.banners)
       }
   
} catch (err) {
    const error = err?.response?.data
     Toast(error.message)
}finally{
    setIsLoading(false)
}
 }


 const getWorkshop= async () =>{
  setIsLoading(true)
  try {
      const response = await Axios.get('/workshops'); 
      if(response.status===200){
       const data = response?.data;           
       
         setWorkshopData(data?.stores)         
      }               
     } catch (err) {
       const error = err?.response?.data
       Toast(error.message)
     }finally{
       setIsLoading(false)
     }
}

useEffect(()=>{
  getWorkshop()
  getWorkshopBanner()
},[])
//console.log("workshop", workshopData);
  return (
    <>
    {isLoading && <Loader/>}
    <div className="container-fluid  nav-margin p-0">
    <div className='w-100 overflow-hidden position-relative' style={{maxHeight:'400PX'}}>             
    <div className='banner-overlay'></div>
              <CaroselBanner banners={workshopBanner}/>
               <div className='position-absolute banner-caption'>
               <h3 style={{color:'white'}} className=' text-start heading'>Earn Big On Your <br /> Investment</h3>
                {/* <div className='mt-md-4 my-4 '>
                <Link to="/services/16"  className='white-btn'>Our Services</Link>
                </div> */}
               </div>
           </div>    
        
    </div>
   <div className="container-fluid my-5">
    <div className="container">
        
        <h3 className='my-3 ' style={{}}>Workshop Locator</h3>
          
          <div className="row g-3 g-md-5">
           {workshopData?.map((val, idx)=>(
            <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
        <div className='frenchise-car card-shadow map rounded' style={{minWidth:'200px'}}> 
              <div dangerouslySetInnerHTML={{ __html: val?.map }} style={{width:'100%'}}/>

                 <p className='mt-1 text-center normal-text'>{val?.address}</p>
        </div>
        </div>
           ))}
        
        {/* <div className="col-12 col-md-4 d-md-flex justify-content-center align-items-center">
        <div style={{borderRadius:'0 0 0 0'}} className='frenchise-card d-flex justify-content-center align-items-center'> 
        <div className='d-flex frenchise-card-innerbox flex-column justify-content-center align-items-center'>
                <h4 style={{color:'white'}}>Caross</h4>
                <p style={{color:'white'}} className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in lacus vel quam pretium faucibus.</p>
               <button className='white-btn'>View</button>
         </div> 
        </div>
        </div> */}
        {/* <div className="col-12 col-md-4 d-md-flex justify-content-center align-items-center">
        <div style={{borderRadius:'0 20px 0 0'}} className='frenchise-card d-flex justify-content-center align-items-center'> 
        <div className='d-flex frenchise-card-innerbox flex-column justify-content-center align-items-center'>
                <h4 style={{color:'white'}}>Caross</h4>
                <p style={{color:'white'}} className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in lacus vel quam pretium faucibus.</p>
               <button className='white-btn'>View</button>
         </div> 
         
        </div>
        </div> */}
    
        {/* <div className="col-12 col-md-4 d-md-flex justify-content-center align-items-center">
        <div style={{borderRadius:'0 0 0 20px'}} className='frenchise-card d-flex justify-content-center align-items-center'> 
        <div className='d-flex frenchise-card-innerbox flex-column justify-content-center align-items-center'>
                <h4 style={{color:'white'}}>Caross</h4>
                <p style={{color:'white'}} className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in lacus vel quam pretium faucibus.</p>
               <button className='white-btn'>View</button>
         </div> 
        </div>
        </div> */}
        {/* <div className="col-12 col-md-4 d-md-flex justify-content-center align-items-center">
        <div style={{borderRadius:'0 0 0 0'}} className='frenchise-card d-flex justify-content-center align-items-center'> 
        <div className='d-flex frenchise-card-innerbox flex-column justify-content-center align-items-center'>
                <h4 style={{color:'white'}}>Caross</h4>
                <p style={{color:'white'}} className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in lacus vel quam pretium faucibus.</p>
               <button className='white-btn'>View</button>
         </div> 
        </div>
        </div> */}
        {/* <div className="col-12 col-md-4 d-md-flex justify-content-center align-items-center">
        <div style={{borderRadius:'0 0 20px 0'}} className='frenchise-card d-flex justify-content-center align-items-center'> 
        <div className='d-flex frenchise-card-innerbox flex-column justify-content-center align-items-center'>
                <h4 style={{color:'white'}}>Caross</h4>
                <p style={{color:'white'}} className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in lacus vel quam pretium faucibus.</p>
               <button className='white-btn'>View</button>
         </div> 
        </div>
        </div> */}
       
      </div>  
    </div>
   </div>
     <div className="container fluid my-3">
      <div className="container">
        <div style={{backgroundColor:'#EDF5F9'}} className="p-md-2 row card-shadow rounded justify-content-center">
          <div className="col d-flex justify-content-end">
            <ul className='d-flex mt-3'>
              <li className='me-4'>
                <ul>
                  <li style={{fontSize:'16px'}} className='text-end'>Call To Find Us</li>
                  <li style={{fontSize:'22px'}} className='red-t text-end'>+91 8929227077</li>
                </ul>
              </li>
              <li>
                <a href="tel:8929227077" className='d-flex justify-content-center align-items-center' style={{width:'40px', height:'40px', borderRadius:'7px', backgroundColor:'#D7412B'}}>     
                <i class="fa-solid fa-phone fa-lg" style={{color: '#ffffff'}}></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col d-flex justify-content-start">
            <ul className='d-flex mt-3 justify-content-start'>
              
              <li>
                <a href="mailto:info@caross.in" className='d-flex justify-content-center align-items-center' style={{width:'40px', height:'40px', borderRadius:'7px', backgroundColor:'#D7412B'}}>     
                <i class="fa-solid fa-envelope fa-xl" style={{color: '#ffffff'}}></i>
                </a>
              </li>
              <li className=''>
                <ul className='text-start d-flex flex-column justify-content-start'>
                  <li style={{fontSize:'16px', padding:'0'}} className=' text-start'>Mail To Find Us</li>
                  <li style={{fontSize:'22px'}} className='red-t text-start'>info@caross.in</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
     </div>

    </>
  )
}

export default Workshop

