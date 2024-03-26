import React, { useEffect, useState } from 'react'
import Axios from '../../Axios';
import Toast from '../../Tost';
import DownLoadApp from '../homepage/download-app/DownLoadApp';
import Loader from '../../Loader';

function PrivacyPolicy() {
const [IsLoading, setIsLoading] = useState(false)
const [privacyData, setPrivacyData] = useState([])

  const getAboutUs = async () =>{
    setIsLoading(true)
    try {
      const response = await Axios.get('/privacy_policy'); 
         if(response.status===200){
          const data = response?.data;
                  setPrivacyData(data?.about)
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
 // console.log("privacy", privacyData);

  return (
    <>
      {IsLoading && <Loader/>}
        <div className="container-fluid nav-margin" >
          <div className="container">
            <div className="row">
            <div className='my-3 py-3'>
              <h3 className='text-center red-t' dangerouslySetInnerHTML={{ __html: privacyData?.name }} />
            </div>
          <div>
          <p dangerouslySetInnerHTML={{ __html: privacyData?.content }} />
          </div>
              
                 
          
            </div>
          </div>
        </div>
        <div className="">
          <DownLoadApp/>
        </div>

    </>
  )
}

export default PrivacyPolicy