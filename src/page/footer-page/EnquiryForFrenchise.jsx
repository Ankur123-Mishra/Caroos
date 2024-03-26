import React, { useContext, useEffect, useState } from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
import Toast from '../../Tost'
import Axios from '../../Axios'
import { AuthContext } from '../../AuthProvider'
import Loader from '../../Loader'
import CaroselBanner from '../../components/CaroselBanner'
function EnquiryForFrenchise() {
  const [franchiseData, setFranchiseData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [franchiseBanner, setFranchiseBanner] = useState([])
 const [contactData, setContactData] = useState({
  name:"",
  mobile:"",
 })

  const {userToken} = useContext(AuthContext)
  const handleContactUs = async (e) =>{
      e.preventDefault()
    setIsLoading(true)
    try {
        const response = await Axios.post('/franchise', contactData,{
         headers: {
             Authorization: `Bearer ${userToken}`
           }
        }); 
        if(response.status===200){
         const data = response?.data;           
         Toast(data?.message,response.status)  
           setContactData({...contactData, name:"", mobile:"", message:""})         
        }               
       } catch (err) {
         const error = err?.response?.data
         Toast(error.message)
       }finally{
         setIsLoading(false)
       }
  }


  const getFrnachise= async () =>{
  setIsLoading(true)
  try {
      const response = await Axios.get('/get_franchises'); 
      if(response.status===200){
       const data = response?.data;           
       
         setFranchiseData(data?.franchises)         
      }               
     } catch (err) {
       const error = err?.response?.data
       Toast(error.message)
     }finally{
       setIsLoading(false)
     }
}



const getFranchiseBanner= async () =>{
  try {
    const response = await Axios.get('/get_franchise_banner'); 
       if(response.status===200){
        const data = response?.data;
                setFranchiseBanner(data?.banners)
       }
   
} catch (err) {
    const error = err?.response?.data
     Toast(error.message)
}finally{
    setIsLoading(false)
}
 }
 useEffect(()=>{
  getFrnachise()
  getFranchiseBanner()
},[])

  //console.log("franchise",franchiseData);
  return (
    <>
     {isLoading && <Loader/>}
    <div className="container-fluid  nav-margin p-0">
    <div className='w-100 overflow-hidden position-relative' style={{maxHeight:'400PX'}}>            
             <div className='banner-overlay'></div>
              <CaroselBanner banners={franchiseBanner}/>
               <div className='position-absolute banner-caption'>
               <h3 style={{color:'white'}} className=' text-start heading'>Earn Big On Your <br /> Investment</h3>
                <div className='mt-md-4 my-4 '>
                <Link to="/services/16"  className='white-btn'>Our Services</Link>
                </div>
               </div>
           </div>    
       
  
        <div className="container my-3">
              <div className="row">
                <div className="col-12 col-md-12 d-flex justify-content-center">
                  <div style={{backgroundColor:'#EDF5F9'}} className="card-shadow form-container d-flex flex-column justify-content-center aling-items-center">
                          <h3 className='form-heading text-center'> Fill Your Details</h3>
                        <form>
                          <div className="mb-3">
                            <input type="text" name="name" value={contactData.name} onChange={(e)=>setContactData({...contactData, name:e.target.value})} placeholder='Enter Name' className="form-control"  required/>
                          </div>
                          <div className="mb-3">
                            <input type="number" name="mobile" value={contactData.mobile} onChange={(e)=>setContactData({...contactData, mobile:e.target.value})} placeholder='Phone Number' className="form-control" required />
                          </div>
                          <div className="mb-3 text-center">
                            <button disabled={!(contactData.name && contactData.mobile) || isLoading} onClick={handleContactUs} className="red-btn red-custom-btn">
                            {isLoading? (<><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</>):"Submit"}
                            </button>
                          </div>
                        </form>
    
                  </div>
                </div>
              </div>
        </div>
    </div>
   <div className="container-fluid my-5">
    <div className="container">
        
     
          
          <div className="row g-3 g-md-5 ">
          {/* {franchiseData.map((val, idx)=>(
            <div key={idx+1} className="col-12 col-md-4 d-flex justify-content-center align-items-center">
        <div className='frenchise-card d-flex justify-content-center align-items-center'> 
        <div className='d-flex frenchise-card-innerbox  flex-column justify-content-center align-items-center'>
                <h4 style={{color:'white'}}>{val?.heading}</h4>
                <p style={{color:'white'}} className='text-center'>{val?.content}</p>
               
         </div> 
        </div>
        </div>
          ))} */}
         
        
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
                  <li style={{fontSize:'22px'}} className='red-t text-end'><a href="tel:8929227077" className='red-t'>+91 8929227077</a></li>
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
                <a href="mailto:info@caross.in" className='d-flex justify-content-center align-items-center ' style={{width:'40px', height:'40px', borderRadius:'7px', backgroundColor:'#D7412B'}}>     
                <i class="fa-solid fa-envelope fa-xl" style={{color: '#ffffff'}}></i>
                </a>
              </li>
              <li className=''>
                <ul className='text-start d-flex flex-column justify-content-start'>
                  <li style={{fontSize:'16px', padding:'0'}} className=' text-start'>Mail To Find Us</li>
                  <li style={{fontSize:'22px'}} className='red-t text-start'><a href="mailto:info@caross.in" className='red-t'>info@caross.in</a></li>
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

export default EnquiryForFrenchise