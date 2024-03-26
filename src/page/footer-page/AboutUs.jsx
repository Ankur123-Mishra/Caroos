import React, { useEffect, useState } from 'react'
import Axios from '../../Axios'
import Toast from '../../Tost';
import Loader from '../../Loader';
import DownLoadApp from '../homepage/download-app/DownLoadApp';

function AboutUs() {
 const [IsLoading, setIsLoading] = useState(false)
 const [aboutData, setAboutData] = useState("")


   const getAboutUs = async () =>{

    try {
       setIsLoading(true)
      const response = await Axios.get('/about'); 
         if(response.status===200){
          const data = response?.data;
                  setAboutData(data?.about)
         }
     
  } catch (err) {
      const error = err?.response?.data
       Toast(error.message)
  }finally{
      setIsLoading(false)
  }
   }
useEffect(()=>{
  getAboutUs()
},[])

  return (
    <>
      {IsLoading && <Loader/>}
        <div className="container-fluid nav-margin" >
          <div className="container">
            <div className="row">
            <div className='my-3 py-3'>
              <h3 className='text-center red-t' dangerouslySetInnerHTML={{ __html: aboutData?.name }} />
            </div>
          <div>
          <p dangerouslySetInnerHTML={{ __html: aboutData?.content }} />
          </div>
              
                 
          
            </div>
          </div>
        </div>
        {/* <div className="">
          <DownLoadApp/>
        </div> */}

    </>
   
  )
}

export default AboutUs