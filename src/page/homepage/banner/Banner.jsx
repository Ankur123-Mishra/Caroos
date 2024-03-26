import React, { useContext, useEffect, useState } from 'react'
import logoArr from './bannerlogo'
import '../homepage.css'
import { Link } from 'react-router-dom'
import Axios from '../../../Axios'
import CategoryCard from '../../../components/CategoryCard'
import { AuthContext } from '../../../AuthProvider'
import Carousel from 'react-bootstrap/Carousel';
import Slider from 'react-slick'

function Banner({bannerData, allCategoriesData}) {
  // const [allCategoriesData, setAllCategoriesData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
const [changes, SetChanges] = useState(true)
 const [defaultCar, setDefaultCar] = useState({})
 const {userToken} = useContext(AuthContext)
//   const getAllCategories = async ()=>{
//     setIsLoading(true)
//      try {
//       const response = await Axios('/get_all_categories')
//       if(response.status===200){
//         const data = response?.data;
//       //   console.log("categories...", data);
//         setAllCategoriesData(data?.categories.reverse())
//        // Toast(data?.message,response?.status)
//       }
//      } catch (err) {
//       const error = err.response.data
//           Toast(error.message)
//      }finally{
//         setIsLoading(false)
//      }
// }
// useEffect(()=>{
//   getAllCategories()
 
// },[])
// if default car Already selected then redirect user to service page
const getDefaultCar = async () =>{
  if(userToken){
  try { 
    setIsLoading(true);
       

     
      const response = await Axios.get('get_user_car',{
        headers: {
          Authorization: `Bearer ${userToken}`
        }
         })
         if(response.status===200){
          const data = response?.data;
         // console.log('defalutcar', data.car);
          setDefaultCar(data?.car)
        // console.log("default..",data);
         // Toast(data?.message,response.status)          
         }
        
       } catch (err) {
           const error = err.response.data
                 //  Toast(error.message)
       }finally{ 
               setIsLoading(false)
       } 
      } 
}

useEffect(()=>{
   getDefaultCar()
},[])

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplaySpeed: 3000,
    cssEase: "linear"
};



  return (
    <>
    {/* banner */}
       {/* <div className=" d-flex align-items-center"> */}
       <div className="container-fluid banner position-relative p-0">
         {/* banner react */}
          <div className="d-none d-md-block">
       <Carousel indicators={false} fade controls={false}>
       {bannerData.map((val)=>(
        <Carousel.Item>
        <img src={val?.image} className=' img-fluid2' alt="" />
      </Carousel.Item> 
       ))}
         
    </Carousel>

</div>

{/* banner mobile */}
         {/* banner react */}
       <div className="d-block p-0 m-0 d-md-none">
       <Carousel indicators={false} fade controls={false}>
       {bannerData.map((val)=>(
        <Carousel.Item>
        <img src={val?.image} className='img-fluid img-fluid2' alt="" />
      </Carousel.Item> 
       ))}
         
    </Carousel>

</div>
    {/* banner react end */}
      
       <div className="container banner-container">
        <div className="row">
        
            <div className="col-12">
            <div className="banner-content d-none d-md-block">
            <h1 className='text-white banner-text'>Simplifying</h1>
            <h1 className='text-white banner-text'> Car Care</h1>
            <h3 style={{fontSize:'28px'}} className='mb-4'>Book Your Service Today.</h3>
             <div className='' style={{marginTop:'2.8rem'}}>
             <Link to={defaultCar?("/services/detailing"):("/my-cars")} className="red-btn red-b " id='book-btn'>Book Now</Link>

             </div>
         </div>
         
            </div>
        </div>
       </div>
       <div className="overlay"></div>
    </div>
    
    {/* banner logo container */}
    <div className="container-fluid d-md-flex justify-content-center red-b banner-logo-container">
          <div className="container container-logo-box ">
               <div className="row justify-content-center">
               <div className="col-12 d-md-none">
                <p style={{fontSize:'20px', fontWeight:'700'}} className='text-center d-none d-md-block mt-4 text-white'>Reviving Radiance, Every Vehicle, Every Time</p>
                <p style={{fontSize:"12px"}} className=' text-center mt-4 d-block d-md-none text-white fw-bold'>Reviving Radiance, Every Vehicle, Every Time</p>
               </div>

               {allCategoriesData.length>5?(<>
                
                 <Slider {...settings} className=''>    
                    {
                      allCategoriesData?.map((logo, idx)=>(
                  <CategoryCard key={idx+1} logo={logo} SetChanges={SetChanges}  allCategoriesData={ allCategoriesData}/>
                   
                ))  
        }         
          </Slider>
                 
            </>):(<>
              <div className='d-flex flex-wrap justify-content-center'>
              {
                 
                      allCategoriesData?.map((logo, idx)=>(
                  <CategoryCard key={idx+1} logo={logo} SetChanges={SetChanges}  allCategoriesData={ allCategoriesData}/>
                   
                ))  
        }  
        </div>
        {/* <div className=" d-md-flex d-none justify-content-center align-items-center col-sm-3 col-md-2">
        <Link to={`/services/${}`} style={{backgroundColor:pathname===`/services/${logo?.id}`?'red':'#FAFAFA'}} onClick={()=>SetChanges(false)} className='card-shadow pointer logos bg-lightblue  mt-2 mt-md-0 p-0 p-md-2 bg-white d-flex flex-column justify-content-around align-items-center'>   
          <img src={pathname===`/services/${logo?.id}`?logo?.icon_white:logo?.icon} height="36.06px" width="36.06px" style={{color:'white'}} className='' alt="" />
          <p style={pathname===`/services/${logo?.id}`?{fontSize:'16px', lineHeight:'20px', fontWeight:'500', color:'#DE3820'}:{fontSize:'16px', lineHeight:'20px', fontWeight:'500', color:'#474747'}} className='text-center mt-1'>{logo?.name}</p>
        </Link>
      </div>           */}
            </>)}
                 

               {/* {
                allCategoriesData?.map((logo, idx)=>(
                  <CategoryCard key={idx+1} logo={logo} SetChanges={SetChanges}  allCategoriesData={ allCategoriesData}/>
                   
                ))
               } */}
               <div className="col-12 d-none d-md-block">
                <p className='text-center mt-4 text-white fw-bold'>Reviving Radiance, Every Vehicle, Every Time</p>
               </div>
               </div>
          </div>
    </div>

    {/* mobile */}
    {/* <div className="container-fluid d-flex d-md-none justify-content-center banner-logo-container">
          <div className="container container-logo-box ">
               <div className="row justify-content-center">
               <div className="col-12 d-block d-md-none">
                <p className='text-center mt-4 text-white fw-bold'>Offering quick and efficient service to keep your car clean</p>
               </div>
               <div className='d-blcok d-md-none'>
              { allCategoriesData.length>0 && <CategoryCard allCategoriesData={allCategoriesData} SetChanges={SetChanges}/>}
               </div>
               <div className="col-12 d-none d-md-block">
                <p className='text-center mt-4 text-white fw-bold'>Offering quick and efficient service to keep your car clean</p>
               </div>
               </div>
          </div>
    </div> */}
    
    </>
  )
}

export default Banner