import React, { useContext, useEffect, useRef, useState } from 'react'
import Banner from './banner/Banner'
import ProfessionalDenting from './professional-denting/ProfessionalDenting'
import ExperianceIndustry from './experiance-in-industry/ExperianceIndustry'
import WorkProcess from './work-process/WorkProcess'
import BestWork from './bestwork/BestWork'
import Testimonial from './testimonial/Testimonial'
import Brands from './brands/Brands'
import DownLoadApp from './download-app/DownLoadApp'
import ContactUs from './contact-us/ContactUs'
import FrequentalyAskQuestions from './frequentaly-ask-questions/FrequentalyAskQuestions'
import Axios from '../../Axios'
//import { AuthContext } from '../../AuthProvider'
import Loader from '../../Loader'
import Toast from '../../Tost'
import { Helmet } from 'react-helmet'

function Homepage() {
  const [bannerData, setBannerData] = useState([])
  const [faqsData, setFaqsData] = useState([])
  const [iseLoading, setIsLoading] = useState(false)
  const [testimonialsData, setTestimonialsData] = useState([])
  const [grow, setGrow] = useState([])
  const [workProcess, setWorkProcess] = useState([])
  const [socialMediaData, setSocialMediaData] = useState([])
  const [brands, setBrands] = useState([])
  const [proDentPent, setProDentPent] = useState("")
  const [partners, setPartners] = useState([])
 // const {userToken} = useContext(AuthContext)
 const [allCategoriesData, setAllCategoriesData] = useState([])
 const childRef = useRef(null);

 

 const scrollToChild = () => {
   childRef.current.scrollIntoView({ behavior: 'smooth' });
 };




  const handleGetBanner = async () =>{
    try { 
      setIsLoading(true);     
        const response = await Axios.get('get_all_banners')
           if(response.status===200){
            const data = response?.data;             
            setBannerData(data?.banners)
         //  console.log("banner..",data?.banners);
             
           }
          
         } catch (err) {
            // const error = err.response.data
                   //  Toast(error.message)
         }finally{ 
                 setIsLoading(false)
         } 
  }

  const handleFAQS = async () =>{
    try { 
      setIsLoading(true);     
        const response = await Axios.get('/get_faqs')
           if(response.status===200){
            const data = response?.data;             
            setFaqsData(data?.faqs)
        //   console.log("faqs..",data);
             
           }
          
         } catch (err) {
            // const error = err.response.data
                   //  Toast(error.message)
         }finally{ 
                 setIsLoading(false)
         } 
  }
useEffect(()=>{
  handleGetBanner()
  handleFAQS()
},[])

const getAllCategories = async ()=>{
  setIsLoading(true)
   try {
    const response = await Axios('/get_all_categories')
    if(response.status===200){
      const data = response?.data;
    //   console.log("categories...", data);
      setAllCategoriesData(data?.categories.reverse())
     // Toast(data?.message,response?.status)
    }
   } catch (err) {
    const error = err.response.data
        Toast(error.message)
   }finally{
      setIsLoading(false)
   }
}

useEffect(()=>{
   getAllCategories()
},[])

// testimonials
const getTestimonials = async ()=>{
  setIsLoading(true)
   try {
    const response = await Axios('/get_testimonials')
    if(response.status===200){
      const data = response?.data;
  
      setTestimonialsData(data?.testimonials)
     // Toast(data?.message,response?.status)
    }
   } catch (err) {
    const error = err.response.data
        Toast(error.message)
   }finally{
      setIsLoading(false)
   }
}
 // console.log("test", testimonialsData);
// experience in industry
const getExperiencedData = async ()=>{
  setIsLoading(true)
   try {
    const response = await Axios('/get-stat')
    if(response.status===200){
      const data = response?.data;
  
      setGrow(data?.stats)
     // Toast(data?.message,response?.status)
    }
   } catch (err) {
    const error = err.response.data
        Toast(error.message)
   }finally{
      setIsLoading(false)
   }
}
//console.log("grow", grow);
// work Process
const getWorkProcessData = async ()=>{
  setIsLoading(true)
   try {
    const response = await Axios.get('/work-process')
    if(response.status===200){
      const data = response?.data;
  
      setWorkProcess(data?.workprocess)
     // Toast(data?.message,response?.status)
    }
   } catch (err) {
    const error = err.response.data
        Toast(error.message)
   }finally{
      setIsLoading(false)
   }
}
//  console.log("work process", workProcess);
// social media
const getSocialMediaData = async ()=>{
  setIsLoading(true)
   try {
    const response = await Axios('/gallery')
    if(response.status===200){
      const data = response?.data;
  
      setSocialMediaData(data?.gallery)
     // Toast(data?.message,response?.status)
    }
   } catch (err) {
    const error = err.response.data
        Toast(error.message)
   }finally{
      setIsLoading(false)
   }
}
 

const handleBrands = async () =>{
  try { 
    setIsLoading(true);     
      const response = await Axios.get('/partners')
         if(response.status===200){
          const data = response?.data;             
          setBrands(data?.partners)
       //  console.log("banner..",data?.banners);
           
         }
        
       } catch (err) {
          // const error = err.response.data
                 //  Toast(error.message)
       }finally{ 
               setIsLoading(false)
       } 
}

const handlePartners = async () =>{
  try { 
    setIsLoading(true);     
      const response = await Axios.get('/get-partners')
         if(response.status===200){
          const data = response?.data;             
          setPartners(data?.partners)
       //  console.log("banner..",data?.banners);
           
         }
        
       } catch (err) {
          // const error = err.response.data
                 //  Toast(error.message)
       }finally{ 
               setIsLoading(false)
       } 
}


const handleProfessionaldentPent = async () =>{
  try { 
    setIsLoading(true);     
      const response = await Axios.get('/who_we_are')
         if(response.status===200){
          const data = response?.data;             
          setProDentPent(data?.about)
       //  console.log("banner..",data?.banners);
           
         }
        
       } catch (err) {
          // const error = err.response.data
                 //  Toast(error.message)
       }finally{ 
               setIsLoading(false)
       } 
}


useEffect(()=>{
   getTestimonials()
   getSocialMediaData()
   getWorkProcessData()
   getExperiencedData()
   handleBrands()
   handlePartners()
   handleProfessionaldentPent()
},[])

  // console.log("testi ", testimonialsData);
  return (
    <>
             <Helmet>
             <title>Welcome to Caross - Detailing Studio</title>
          
                <meta name="description" content="Welcome to Caross.in – your premier destination for top-notch auto detailing services. Transform your vehicle with our expert care, enhancing its appearance and preserving its value. Discover the ultimate in automotive aesthetics with Caross.in."></meta>
              
            
            </Helmet>


       {iseLoading && <Loader/>}
        <Banner bannerData={bannerData} allCategoriesData={allCategoriesData}/>
        <ProfessionalDenting dentPent={proDentPent}/>
        <ExperianceIndustry scrollToChild={scrollToChild} grow={grow}/>
       
     <WorkProcess scrollToChild={scrollToChild} workProcess={workProcess}/>
   {partners.length &&  <Brands brand={partners} maintext="Product" text="We Used"/>} 
     <BestWork socialMediaData={socialMediaData}/>
     <Testimonial testimonials={testimonialsData}/>
     <DownLoadApp/>
     <Brands brand={brands} maintext="Brands" text=" We Work With"/>

<ContactUs childRef={childRef}/>
<FrequentalyAskQuestions faqs={faqsData}/>
       
    </>
  )
}

export default Homepage