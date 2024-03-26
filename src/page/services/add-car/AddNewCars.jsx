import React, { useContext, useEffect, useRef, useState } from 'react'
import '../services.css';
import Axios from '../../../Axios';
import Toast from '../../../Tost';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider';
import { Button, Modal } from 'react-bootstrap';
//import { addCartContext } from '../../../context/AddCarProvider';


//const carbrandArr = ["car1", "car2", "car3", "car4"]
function AddNewCars({getUserCarDetails, carDetails, Show}) {
  
    const [isLoading, setIsLoading] = useState(false)
    const [carBrands, setCarBrands] = useState([])
   const [file, setFile] = useState(null)
   const [brand, setBrand] = useState("")
   const [model, setModel] = useState("")
   const [Load, setLoad] = useState(false)
   const [reg_year, setReg_Year] = useState("")
   const [modelsData, setModelsData] = useState([])
   
   const {userToken} = useContext(AuthContext)
   const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const modalRef = useRef(null);
   
    const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
    

  
    
    
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
            // console.log("data..",data)
       //  Toast(data?.message,response.status)
                   
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


//console.log("models", modelsData);

    const handleAddCars = async () =>{
        const formData = new FormData()
        formData.append('brand_id', brand)
        formData.append('model', model)
        formData.append('reg_year',reg_year)
        formData.append('file', file);
        
        setLoad(true)
          if(userToken){     
              try {
               const response = await Axios.post('/create_car', formData,{
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type":"multipart/from-data"
                  }
               });
               if(response.status===200){
                const data = response?.data;
                   // console.log("data..",data)
                Toast(data?.message,response.status)
                             
               }      
              } catch (err) {
                const error = err.response.data
                Toast(error.message)
              }finally{
                setLoad(false)
              }
            }else{
                navigate('/login')
            }  
    }
      const onAddCars = ()=>{
        handleAddCars();
        setTimeout(()=>{
            getUserCarDetails()
            handleClose()
        },2000)
      }

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
          if(brand){
            onBrandSelect(brand)
          }
         
       },[brand])
 
     useEffect(()=>{   
    
        if(carDetails.length===0){
             handleShow()
       }         
     },[carDetails])
     //console.log("details2",carDetails);
  return (
<>

<Button variant="danger" className='red-btn' onClick={()=>{handleShow()}}>
        Add Car
      </Button>
      <Modal show={show} onHide={handleClose}  
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Your Car Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>

                       
                  
<div className="position-relative mb-3">
{/* <span style={{color:'red'}} className='required-field'>*</span> */}
<select className="form-select" onChange={(e)=>setBrand(e.target.value)} aria-label="Default select example">
    <option selected>Select Car Brand</option>
    {
        carBrands?.map((val, idx)=>(
           
            <option key={idx+1} value={`${val?.id}`} style={{display:'flex', justifyContent:'space-between'}}>
             <div>
             <span>{val?.name}</span>
             </div>
             
             
             </option>
            
        ))
    }
   
    
</select>
 </div>
  <div className="position-relative mb-3">
  {/* <span style={{color:'red'}} className='required-field'>*</span> */}
  <select className="form-select" onChange={(e)=>setModel(e.target.value)} aria-label="Default select example">
    <option selected>Select Car Model</option>
    {
      modelsData.length &&  modelsData?.map((mod, idx)=>(
           
            <option key={idx+1} value={`${mod?.id}`}>
           
            {mod?.value}</option>
            
        ))
    }
   
    
</select>

  
    {/* <input type="text" onChange={(e)=>setModel(e.target.value)} className="form-control"  placeholder="Add model" /> */}
 </div>
 <div className="position-relative mb-3">
 {/* <span style={{color:'red'}} className='required-field'>*</span> */}
    <input type="text" onChange={(e)=>setReg_Year(e.target.value)} className="form-control" placeholder="Add registration year" />
 </div>
 {/* <div class="position-relative mb-3 ">
 
    <input type="file" class="form-control" accept="image/*"  onChange={(e)=>setFile(e.target.files[0])} id="inputGroupFile02" />
      
</div> */}


</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" disabled={Load} onClick={onAddCars} className='red-btn'>       
        {Load?(<><span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">Loading...</span></>):" Add Car"}
        </Button>
        </Modal.Footer>
      </Modal>











{/* <button type="button" class="red-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Add Car
</button> */}


{/* <div ref={modalRef} className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Your Car Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body"> */}
        
{/* form */}
{/* <form>

                       
                  
                        <div className="position-relative mb-3">
                        <span style={{color:'red'}} className='required-field'>*</span>
                        <select className="form-select" onChange={(e)=>setBrand(e.target.value)} aria-label="Default select example">
                            <option selected>Select Car Brand</option>
                            {
                                carBrands?.map((val, idx)=>(
                                   
                                    <option key={idx+1} value={`${val?.id}`}>
                                   
                                     {val?.name}</option>
                                    
                                ))
                            }
                           
                            
                        </select>
                         </div>
                          <div className="position-relative mb-3">
                          <span style={{color:'red'}} className='required-field'>*</span>
                          <select className="form-select" onChange={(e)=>setModel(e.target.value)} aria-label="Default select example">
                            <option selected>Select Car Model</option>
                            {
                              modelsData.length &&  modelsData?.map((mod, idx)=>(
                                   
                                    <option key={idx+1} value={`${mod?.value}`}>
                                   
                                    {mod?.value}</option>
                                    
                                ))
                            }
                           
                            
                        </select> */}

                          
                            {/* <input type="text" onChange={(e)=>setModel(e.target.value)} className="form-control"  placeholder="Add model" /> */}
                         {/* </div>
                         <div className="position-relative mb-3">
                         <span style={{color:'red'}} className='required-field'>*</span>
                            <input type="text" onChange={(e)=>setReg_Year(e.target.value)} className="form-control" placeholder="Add registration year" />
                         </div>
                         <div class="position-relative mb-3 ">
                          <span style={{color:'red'}} className='required-field'>*</span>
                            <input type="file" class="form-control" accept="image/*"  onChange={(e)=>setFile(e.target.files[0])} id="inputGroupFile02" />
                              
                        </div>
                        
                       
                        </form> */}

{/* from end */}



      {/* </div>
      <div className="modal-footer justify-content-start">
       
       
        <button disabled={isLoading} onClick={onAddCars} className='red-btn'>       
        {isLoading?(<><span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">Loading...</span></>):" Add Car"}
        </button>
         */}
        
        {/* <button  className="btn btn-primary">Save changes</button> */}
      {/* </div>
    </div> */}
  {/* </div>
</div> */}
    </>
  )
}

export default AddNewCars