import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../Loader'
import "./footer.css"
import img1 from '../../asets/2.png'
import pdiImg from '../../asets/pdi Img.jpg'
import Axios from '../../Axios'
import GetAppIcon from '@mui/icons-material/GetApp';
import Toast from '../../Tost'
import pdficon from '../../asets/pdf.png'
import CaroselBanner from '../../components/CaroselBanner'
import DownLoadApp from '../homepage/download-app/DownLoadApp'
import { Button } from '@mui/material'
 const arr = [1, 2, 3]
function PreDelivery() {
  const [isLoading, setIsLoading] = useState(false)
  const [preDelivery, setPreDelivery] = useState([])
  const [pdiBanner, setPdiBanner] = useState([])
  const [pdfFile, setPdfFile] = useState([])

  const getPdiDocument = async () =>{
           try {
             const res = await Axios.get("/pdi_document")
                if(res.status===200){
                       const data = res?.data?.pdi_document?.document
                    
                      setPdfFile(data) 
                }
           } catch (error) {
              console.log(error?.message)
           }
  }

  useEffect(()=>{
    getPdiDocument()
  },[])
  const HandleDownloadPdf = (downloadLink)=>{
    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = 'Car_Pre-Delivery_Inspection.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const getPreDelivery = async () =>{
    try {
      const response = await Axios.get('/inspections'); 
         if(response.status===200){
          const data = response?.data;
                  setPreDelivery(data?.inspections)
         }
     
  } catch (err) {
      const error = err?.response?.data
       Toast(error.message)
  }finally{
      setIsLoading(false)
  }
   }

   const getPdiBanner= async () =>{
    try {
      const response = await Axios.get('/get_pdi_banner'); 
         if(response.status===200){
          const data = response?.data;
                  setPdiBanner(data?.banners)
         }
     
  } catch (err) {
      const error = err?.response?.data
       Toast(error.message)
  }finally{
      setIsLoading(false)
  }
   }

   useEffect(()=>{
     getPreDelivery()
     getPdiBanner()
   },[])

   const handleDownloadClick = () => {
    // Replace "your_package_name" with your actual package name
    const googlePlayLink = 'https://play.google.com/store/apps/details?id=com.caross';

    // Redirect the user to the Google Play Store
    window.open(googlePlayLink, '_blank');

  };

  return (
    <>
       {isLoading && <Loader/>}
    <div className="container-fluid nav-margin p-0">
        
                 <div className='w-100 overflow-hidden position-relative' style={{maxHeight:'400PX'}}>
                 <div className='banner-overlay'></div>
                    <CaroselBanner banners={pdiBanner}/>
                     <div className='position-absolute banner-caption'>
                     <h3 style={{color:'white'}} className=' text-start heading'>Crafting Peace of Mind <br /> Through Meticulous  <br /> Inspections</h3>
                      <div className='mt-md-4 my-4 '>
                      <button onClick={ handleDownloadClick}  className='white-btn'>Book Now</button>
                      </div>
                     </div>
                 </div>
    </div>

    <div className="container-fluid mt-2 mb-2 mt-md-4 mb-md-3">
    <div className="container py-4">       
          <div className="row card-shadow g-3 g-md-5 py-1 rounded">
              <h3 className='subheading text-center'>Pre Delivery Inspection</h3>
          {preDelivery.map((val)=>(
            <div key={val.id} className="col-12 col-md-4 d-flex justify-content-center">
        <div className='pdi-card border p-0 mb-2 mb-md-1 rounded'> 
                <div className=' overflow-hidden p-0 rounded' style={{maxHeight:'148px'}}>
              <img src={val?.image} alt="" style={{width:'100%', height:'auto'}} className='img-fluid'/>
              </div>
               <p className='mt-1 p-2 normal-text text-black1'>{val?.content}</p> 
        </div>
      
        </div>
          ))}

<div className="col-12 col-md-4  d-flex justify-content-center align-items-center">

<div>
<div className='d-flex justify-content-center align-items-center mb-3'>

<button onClick={()=>HandleDownloadPdf(pdfFile[0]?.download_link)}  className='download-pdf mb-2 mb-md-0 d-flex  justify-content-center align-items-center' >
 <span className='pdf-icon  d-flex justify-content-center align-items-center'>
 <img src={pdficon} className='img-fluid'   alt="" />
  </span>
   <span> &nbsp; Download PDI Services </span>
</button>
</div>

           <div className='text-center'>
            <Button onClick={handleDownloadClick} variant='contained' sx={{backgroundColor:'#b8242a', padding:'18px', borderRadius:'8px', fontWeight:'700',  '&:hover':{backgroundColor:'#9d2c31'}}} endIcon={<GetAppIcon />}>Download App to Book Now</Button>
          </div>
</div>


</div>
          {/* <div className="col-12 d-flex flex-column align-items-center">
          <div className='pdi-box  p-2 rounded'>
               <div className='d-flex justify-content-between align-items-center px-2 mb-2 border rounded'>
               <div style={{maxWidth:'140px'}} className='p-2'>
             <img src={pdiImg} className='img-fluid' alt='' />
             </div> 
             <div>
             <p className='px-2'>PDI Services</p>
              <p className='fw-bold px-2'>Rs. 13000</p>
             </div>           
            
               </div>

          
          
           <div className='d-flex justify-content-between align-items-center rounded border'>
           <div style={{maxWidth:'140PX'}}>
           <img src={pdiImg} alt="" className='img-fluid' />
           </div>
           <div>
           <p className='px-2'>PDI Kit</p>
           <p className='fw-bold px-2'>Rs. 19000</p>
           </div>
            
           </div>
           
          </div>
        </div> */}
      </div>  

          <div className='text-center mt-3'>
            {/* <button className='red-btn'> Book Now</button> */}
          </div>
    </div>
   </div>
    <div className="container-fluid mb-3">

          {/* <div className='text-center'>
            <Button onClick={handleDownloadClick} variant='contained' sx={{backgroundColor:'#b8242a', padding:'18px', borderRadius:'8px', fontWeight:'700',  '&:hover':{backgroundColor:'#9d2c31'}}} endIcon={<GetAppIcon />}>Download the App to Book Now</Button>
          </div> */}
      {/* <DownLoadApp/> */}
    </div>
    </>
  )
}

export default PreDelivery