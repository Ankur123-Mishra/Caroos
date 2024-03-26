import React, { useContext, useEffect, useRef, useState } from 'react'
import '../services.css';
import Axios from '../../../Axios';
import Toast from '../../../Tost';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider';
import { Button, Modal } from 'react-bootstrap';
import Loader from '../../../Loader';

function UpdateCarDetails({onEdit, idx, editCarData, getUserCarDetails, handleGetAllCart}) {
    const [isLoading, setIsLoading] = useState(false)
    const {userToken} = useContext(AuthContext)
    const [Load, setLoad] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show1, setShow1] = useState(true)
    const [show3, setShow3] = useState(false)
    const [fuelsData, setFuelsData] = useState([])
    const [carBrands, setCarBrands] = useState([])
    const [modelsData, setModelsData] = useState([])
     const [addCars, setAddCars] = useState({
        brand_id:"",
         model:"",
         reg_year:2012,
         fuel_id:"",
         car_id:""
     }); 
     const [show, setShow] = useState(false);
     const navigate = useNavigate()
     const modalRef = useRef(null);

     useEffect(()=>{
      setAddCars({...addCars, car_id:editCarData?.id})
     },[editCarData])
    
     const handleClose = () => setShow(false);
    const handleShow = () =>{
        setShow(true);
        setShow1(true)
        setShow2(false)
        setShow3(false)
    } 
     
     const handleUpdateCar = async () =>{
        setIsLoading(true)
          if(userToken){

        
      
              try {
               const response = await Axios.post('/update_car', addCars,{
                headers: {
                    Authorization: `Bearer ${userToken}`
                  }
               });
               if(response.status===200){
                const data = response?.data;
                 
                Toast(data?.message,response.status)
                getUserCarDetails()
                handleGetAllCart()
                handleClose()
                navigate("/services/detailing")
               }      
              } catch (err) {
                const error = err.response.data
                // Toast(error.message)
              }finally{
                setIsLoading(false)
              }
            }else{
                navigate('/login')
            }  
    }

   

      const handleGetBrands = async () =>{
        setIsLoading(true)
    try {
        const response = await Axios.get('/get_brands' ,{
         headers: {
             Authorization: `Bearer ${userToken}`
           }
        });
        if(response.status===200){
         const data = response?.data;

         setCarBrands(data?.brands)
           
        }      
       } catch (err) {
         const error = err.response.data
         Toast(error.message)
       }finally{
         setIsLoading(false)
       }
   }

useEffect(()=>{
    handleGetBrands()
},[userToken])


      const onBrandSelect = async(id)=>{
       
        setIsLoading(true)
        try {
            const response = await Axios.get('/get-car-models' ,{
             headers: {
                 Authorization: `Bearer ${userToken}`
               },
               params:{
                brand_id:id
               }
            });
            if(response.status===200){
             const data = response?.data;
    
             setModelsData(data?.models)
              console.log("data", data);
                       
            }      
           } catch (err) {
             const error = err.response.data
             Toast(error.message)
           }finally{
             setIsLoading(false)
           }
       }
       
       useEffect(()=>{
          if(addCars.brand_id){
            onBrandSelect(addCars.brand_id)
          }
         
       },[addCars.brand_id])
 
    //  useEffect(()=>{   
    
    //     if(carDetails.length===0){
    //         setShow(true);
    //    }         
    //  },[carDetails])

     const onAddBrand = (id)=>{
         setAddCars({...addCars, brand_id:id});
         setShow1(false)
        setShow2(true)
        setShow3(false)
     }
     

   const onSelectModels = (id)=>{
    setAddCars({...addCars, model:id})
        const Fuels = modelsData.filter((val)=>val.id===id)
         if(Fuels){
            setShow1(false)
            setShow2(false)
            setShow3(true)
            setFuelsData(Fuels)
         }

   }

   const onAddFuels = (id)=>{
    setAddCars({...addCars, fuel_id:id})
     
       
   }

   useEffect(()=>{
    handleUpdateCar()
   },[addCars.fuel_id])

  return (
    <>
    <Button variant="danger" className='red-btn' onClick={()=>{handleShow();onEdit(idx)}}>
        Edit Car
      </Button>
    {/* <Button variant="danger" className='red-btn'  onClick={()=>{handleShow();onEdit(idx)}}>
        Add Car
      </Button> */}
      <Modal show={show} onHide={handleClose}  
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" style={{fontSize:'18px', fontWeight:'400'}}>Update Car Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className={show1?("d-flex flex-wrap"):("d-none")}>
            {carBrands.map((val)=>(
                 <div key={val?.id} className="col-3 d-flex justify-content-center align-items-center">
                 <div onClick={()=>onAddBrand(val?.id)} className=' mb-2 d-flex flex-column justify-content-center align-items-center' style={{maxWidth:'120px', cursor:'pointer'}}>
                    <div style={{maxWidth:'60px',  maxHeight:'60px', overflow:'hidden'}} className=' d-flex justify-content-center align-items-center'>
                       <img src={val?.image} className='' style={{width:'100%', height:'auto'}} alt="" />
                    </div>
                    <p>{val?.name}</p>
                 </div>
            </div>
            ))}
             
          </div>

          <div className={show2?"d-flex flex-wrap":"d-none"} >
         {isLoading?<div style={{minHeight:'300px'}} className='w-100 d-flex justify-content-center align-items-center'><h3>Loading...</h3></div>:(<>
           {modelsData.length?(<>
            {  modelsData?.map((mod)=>(
                 <div key={mod?.id} className="col-3 d-flex justify-content-center align-items-center">
                 <div onClick={()=>onSelectModels(mod?.id)} className=' mb-2 d-flex flex-column justify-content-center align-items-center' style={{maxWidth:'120px', cursor:'pointer'}}>
                    <div style={{maxWidth:'70px',  maxHeight:'70px', overflow:'hidden'}} className=' d-flex justify-content-center align-items-center'>
                       <img src={mod?.image} style={{width:'100%', height:'auto'}} alt="" />
                    </div>
                    <p>{mod?.value}</p>
                 </div>
            </div>
            ))}
           </>):<div style={{minHeight:'300px'}} className='w-100 d-flex justify-content-center align-items-center'><h3>No Models Found</h3></div>}
          
             </>)} 
          </div>

          <div className={show3?"d-flex flex-wrap":"d-none"} >
         {isLoading?<div style={{minHeight:'300px'}} className='w-100 d-flex justify-content-center align-items-center'><h3>Loading...</h3></div>:(<>
           {fuelsData.length?(<>
            {  fuelsData[0].fuels?.map((fue)=>(
                 <div key={fue?.id} className="col-4 d-flex justify-content-center align-items-center">
                 <div onClick={()=>onAddFuels(fue?.id)} className=' mb-2 d-flex flex-column justify-content-center align-items-center' style={{maxWidth:'120px', cursor:'pointer'}}>
                    <div style={{maxWidth:'110px',  maxHeight:'100px', overflow:'hidden'}} className=' d-flex justify-content-center align-items-center'>
                       <img src={fue?.image} style={{width:'100%'}} alt="" />
                    </div>
                    <p>{fue?.name}</p>
                 </div>
            </div>
            ))}
           </>):<div style={{minHeight:'300px'}} className='w-100 d-flex justify-content-center align-items-center'><h3>No Models Found</h3></div>}
          
             </>)} 
          </div>
     
        </Modal.Body>
        
      </Modal>
    </>
    
  )
}



export default UpdateCarDetails