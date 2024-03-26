import React, { useContext, useEffect, useState } from 'react'
import Toast from '../../Tost';
import Axios from '../../Axios';
import changecar from '../../asets/image 37.png'
import Loader from '../../Loader';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import EditCarDetails from '../services/add-car/EditCarDetails';
import AddNewCars from '../services/add-car/AddNewCars';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Button, IconButton } from '@mui/material';
import CreateCar from '../services/add-car/CreateCar';
import UpdateCarDetails from '../services/add-car/UpdateCarDetails';
import { CartContext } from '../../context/CartProvider';
function MyCars() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {setCart} = useContext(CartContext)
     const {userToken} = useContext(AuthContext)
    const [carDetails, setCarDetails] = useState([])
    const [editCarData, setEditCarData] = useState({})
  //  const [changeCount, setChangeCount]= useState(0)

    const getUserCarDetails = async ()=>{  
        if(userToken){
          try { 
          setIsLoading(true) 
                      
            const response = await Axios.get('get_cars',{
              headers: {
                Authorization: `Bearer ${userToken}`
              }
                })
                if(response.status===200){
                const data = response?.data;
                setCarDetails(data?.cars)
              // console.log("sgad..",data);
                Toast(data?.message,response.status)
                
                }
            
              
          } catch (err) {
          const error = err.response.data
                  Toast(error.message)
          }finally{ 
              setIsLoading(false)
          } 
      }else{
          navigate("/login")
      }
   } 

   const deleteCars = async (id) =>{
           try {
              setIsLoading(true)
              const response = await Axios.post(`/delete_car`,{car_id:id}, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                  },               
              })
              if(response.status===200){
                const data = response?.data;
                Toast(data?.message,response.status)     
                getUserCarDetails()
                handleGetAllCart()          
               }
           } catch (err) {
            const error = err.response.data
            Toast(error.message)
           }finally{
            setIsLoading(false)
           }
   }

  //  getcars
  const handleGetAllCart = async()=>{
    setIsLoading(true)
try {
    const response = await Axios.get('/cart-list', {
        headers: {
            Authorization: `Bearer ${userToken}`
          }
       }); 
       if(response.status===200){
        const data = response?.data;
          setCart(data?.cart_items)         
          localStorage.setItem("cart", JSON.stringify(data?.cart_items))     
       }
   
} catch (err) {
    const error = err?.response?.data
     setCart("")
     localStorage.removeItem("cart")    
    // Toast(error.message)
}finally{
    setIsLoading(false)
}
}

   const onSelectCar = async (id)=>{
    try {
      setIsLoading(true)
      const response = await Axios.post(`/edit-profile`,{car_id:id}, {
        headers: {
            Authorization: `Bearer ${userToken}`
          },               
      })
      if(response.status===200){
        const data = response?.data;
        handleGetAllCart()  
       // Toast(data?.message,response.status)               
       }
   } catch (err) {
    const error = err.response.data
    Toast(error.message)
   }finally{
    setIsLoading(false)
   }
   }
  
   useEffect(()=>{
         getUserCarDetails()  
   },[])

const onEdit = (idx) =>{
      const editCar = carDetails[idx]
      setEditCarData(editCar)
}

const onChooseCar = (id)=>{
  onSelectCar(id);
   getUserCarDetails()
}

  return (
    <>
      {isLoading && <Loader/>}
    <div className="container-fluid fullHeight">
       <div className="container nav-margin py-3">
       <h3 style={{fontWeight:600}} className='text-center red-t mt-4 py-3'>E-Smart Garage</h3>
    
      {carDetails?.map((val, idx) => (
        
        <div style={{ position:'relative'}} key={val?.id} className={` row card-shadow bg-lightblue mb-3 p-3 rounded ${val.is_default ? 'selected' : ''}`}>
       {val.is_default ? (<>
        <IconButton aria-label="select" className='checked-box' sx={{position:'absolute',fontSize:'22px', color:'#DE3820'}}>
  <CheckCircleIcon />
</IconButton>
        {/* <i class="fa-regular fa-circle-check fa-sm checked-box" style={{position:'absolute',fontSize:'22px', color:'#DE3820'}}></i> */}
       </>):(
        <>
        <IconButton aria-label="select" onClick={()=>{onChooseCar(val?.id)}} className='checked-box' sx={{position:'absolute',fontSize:'22px', color:'#DE3820'}}>
  <RadioButtonUncheckedIcon />
</IconButton>
        </>
       )} 
          <div className="col-12 col-md-8" >
            <div className="row">
              <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-center">
                <div className=''>
                 {val?.model?<img src={val?.model?.image} className='img-fluid' alt="" />:<img src={changecar} className='img-fluid' alt="" />} 
                </div>
              </div>
              <div className="col-12 col-md-8 d-flex justify-content-center justify-content-md-start align-items-center">
                <div>
                  <h5 className='text-heading text-center text-md-start'><span className='fw-light'>Brand:</span>&nbsp;{val?.brand}</h5>
                  <h5 className='text-heading text-center text-md-start'><span className='fw-light'>Model:</span>&nbsp;{val?.model?.value}</h5>
                {val?.fuel && <p className='text-heading text-center text-md-start'><span className='fw-light'>Fuel Type:</span>&nbsp;{val?.fuel?.name}</p>}
                  {/* <h5 style={{fontSize:'1.2rem'}} className='text-center text-md-start'><span className='fw-light'>Reg Year:</span>&nbsp;{val?.reg_year}</h5> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center">
            {val.is_default ?(
              <>
              <Link to="/services/detailing"><button className='red-btn mb-3'>Book Service</button></Link>
              <UpdateCarDetails onEdit={onEdit} idx={idx} editCarData={editCarData} getUserCarDetails={getUserCarDetails} handleGetAllCart={handleGetAllCart}/>
              {/* <EditCarDetails onEdit={onEdit} idx={idx} editCarData={editCarData} getUserCarDetails={getUserCarDetails}/> */}
              </>
             ) :
              (
                <>
              {/* <EditCarDetails onEdit={onEdit} idx={idx} editCarData={editCarData} getUserCarDetails={getUserCarDetails}/> */}
              <UpdateCarDetails onEdit={onEdit} idx={idx} editCarData={editCarData} getUserCarDetails={getUserCarDetails}/>
                {/* <button style={{padding:'8px'}} onClick={()=>{onSelectCar(val?.id); getUserCarDetails()}} className='mt-3 white-btn'>select this car</button> */}
                </>
              )

            }
            <button onClick={() =>deleteCars(val?.id)} className='white-btn mt-3'>Delete Car</button>
          </div>
        </div>
      ))}


          <div className="my-3 text-center">
          {isLoading?<Loader/>: <CreateCar getUserCarDetails={getUserCarDetails} carDetails={carDetails} Show="Show" handleGetAllCart={handleGetAllCart}/>}
            {/* <Link to="/add-new-car"><button className="red-btn">Add Car</button></Link> */}
          {/* {isLoading?<Loader/>: <AddNewCars getUserCarDetails={getUserCarDetails} carDetails={carDetails} Show="Show"/>}  */}
          </div>
        </div>
    </div>
    </>
  )
}

export default MyCars