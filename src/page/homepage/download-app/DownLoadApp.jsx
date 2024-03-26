import React from 'react'
import downloadApp from '../../../asets/downlaod.png'
import gpay from '../../../asets/gpaybtn.png'
import Ios from '../../../asets/IOS.png'
function DownLoadApp() {

    const handleDownloadClick = () => {
        // Replace "your_package_name" with your actual package name
        const googlePlayLink = 'https://play.google.com/store/apps/details?id=com.caross';
    
        // Redirect the user to the Google Play Store
        window.open(googlePlayLink, '_blank');
    
        // If you are using react-router-dom, you can use the history.push method
        // history.push(googlePlayLink);
      };
  return (

    
    <>
    <section className="mt-3 container-fluid" style={{backgroundColor:'white'}}>
    <div className="container p-0">
        <div className="rounded-4 py-3 py-md-0 card-shadow"  style={{backgroundColor:'#EDF5F9'}}>        
            <div className="row justify-content-center">

                <div className="col-lg-4 col-sm-12" style={{alignSelf:'center'}} >
                    <div className=" ">                
                        <h3 className="text-center download-heading">Download the <b className='red-t'>Caross</b></h3>
                        <h3 className='text-center download-heading'>App Now</h3>
                        <h4 className='text-center download-heading pt-3'>Transform Your Car Now</h4>
                        <div className="d-block d-md-none col-lg-6 col-sm-12" >
                    {/* <img src={downloadApp} alt="" style={{width:'-webkit-fill-available'}} /> */}
                   
                    <img  src={downloadApp} alt="" className='download-img p-0 m-0' />
               

                </div>
                        <div className='mt-md-5 text-center'>
                        <img onClick={handleDownloadClick} src={gpay} className='cursor-pointer'  width='200px' alt="" />
                        <img src={Ios} className=' cursor-pointer' width='200px' alt="" />
                        </div>
                    </div>
                </div>
                <div className="d-none d-md-block p-0 m-0 col-lg-6 col-sm-12" >
                    {/* <img src={downloadApp} alt="" style={{width:'-webkit-fill-available'}} /> */}
                    <div className=''>
                    <img src={downloadApp} alt="" className='download-img' />
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>
    </>
  )
}

export default DownLoadApp