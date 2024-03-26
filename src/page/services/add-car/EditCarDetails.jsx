import React, { useContext, useEffect, useState } from 'react'
import '../services.css';
import Axios from '../../../Axios';
import Toast from '../../../Tost';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//import { addCartContext } from '../../../context/AddCarProvider';


//const carbrandArr = ["car1", "car2", "car3", "car4"]
function EditCarDetails({onEdit, idx, editCarData, getUserCarDetails}) {
    const [isLoading, setIsLoading] = useState(false)
   const {userToken} = useContext(AuthContext)
   const [carBrands, setCarBrands] = useState([])
   const [file, setFile] = useState(null)
   const [brand, setBrand] = useState("")
   const [model, setModel] = useState("")
   const [reg_year, setReg_Year] = useState("")
   const [show, setShow] = useState(false);
  const [modelData, setModelData] = useState([])
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
    // const [addCars, setAddCars] = useState({
    //     brand:"",
    //     model:"",
    //     reg_year:"",
    //     file:""
    // });
    const navigate = useNavigate()


   useEffect(()=>{
    //  setBrand(editCarData?.brand)
    //  setModel(editCarData?.model)
     setReg_Year(editCarData?.reg_year)
   },[editCarData])


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

    const handleAddCars = async () =>{
         
            const formData = new FormData()
            formData.append('brand_id', brand)
            formData.append('model', model)
            formData.append('reg_year',reg_year)
            formData.append('file', file);
            formData.append('car_id',editCarData.id)

        setIsLoading(true)

        
          if(userToken){  
            console.log("formData",formData);   
              try {
               const response = await Axios.post('/update_car', formData ,{
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
                setIsLoading(false)
              }
            }else{
                navigate('/login')
            }  
    }


    const onEditCars = ()=>{
        handleAddCars();
        setTimeout(()=>{
            getUserCarDetails()
        },1000)
      }
  // console.log("carbrands", carBrands);
  // console.log("addcars");

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

         setModelData(data?.models)

                   
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


  return (
<>

<Button variant="danger" className='red-btn' onClick={()=>{handleShow();onEdit(idx)}}>
        Edit Car
      </Button>

      <Modal show={show} onHide={handleClose}  
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit Your Car Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
                       {/* <div className="mb-3">
                       
                        <div class=" mb-3 position-relative">
                        <span style={{color:'red'}} className='required-field'>*</span>
                            <input type="file" class="form-control required" accept="image/*"  onChange={(e)=>setFile(e.target.files[0])} id="inputGroupFile02" />
                           
                        </div>
                        </div> */}
                        <div className="mb-3 position-relative ">
                        
                        <select className="form-select" onChange={(e)=>setBrand(e.target.value )} aria-label="Default select example">
                            <option selected>Select Car Brand</option>
                            {
                                carBrands?.map((val, idx)=>(
                                    <option key={idx+1} value={`${val?.id}`}>{val?.name}</option>
                                ))
                            }
                           
                            
                        </select>
                         </div>
                          <div className="mb-3 position-relative">
                          
                          <select className="form-select" onChange={(e)=>setModel(e.target.value )} aria-label="Default select example">
                            <option selected>Select Car Model</option>
                            {
                              modelData.length &&  modelData?.map((mod, idx)=>(
                                    <option key={idx+1} value={`${mod?.id}`}>{mod?.value}</option>
                                ))
                            }
                           
                            
                        </select>
                            {/* <input type="text" name="model" value={model} onChange={(e)=>setModel(e.target.value)} className="form-control"  placeholder="Add model" /> */}
                         </div>
                         <div className="mb-3 position-relative">
                         
                            <input type="text" name="reg_year" value={reg_year} onChange={(e)=>setReg_Year(e.target.value)} className="form-control" placeholder="Add registration year" />
                         </div>
                         {/* <div class=" mb-3 position-relative">
                       
                            <input type="file" class="form-control required" accept="image/*"  onChange={(e)=>setFile(e.target.files[0])} id="inputGroupFile02" />
                           
                        </div> */}
                        
                       
                        </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="danger" disabled={isLoading} className='red-btn' onClick={()=>{onEditCars(); handleClose()}}>
          {isLoading?(<><span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">Loading...</span></>):" Update"}
          </Button>
        </Modal.Footer>
      </Modal>










{/* <button onClick={()=>onEdit(idx)} type="button" class="red-btn" data-bs-toggle="modal" data-bs-target={editCarData?(`#${idx+1}`):`exampleModal`}>
  Edit Car
</button>


<div className="modal fade" id={editCarData?(`${idx+1}`):`exampleModal`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Car Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        

<form>
<div className="mb-3">
                        <div class="input-group mb-3">
                            <input type="file" class="form-control" accept="image/*"  onChange={(e)=>setFile(e.target.files[0])} id="inputGroupFile02" />
                            <label class="input-group-text" for="inputGroupFile02">Upload Car Photo</label>
                        </div>
                        </div>
                        <div className="mb-3">
                        <select className="form-select" onChange={(e)=>setBrand(e.target.value )} aria-label="Default select example">
                            <option selected>Select Car Brand</option>
                            {
                                carBrands?.map((val, idx)=>(
                                    <option key={idx+1} value={`${val?.name}`}>{val?.name}</option>
                                ))
                            }
                           
                            
                        </select>
                         </div>
                          <div className="mb-3">
                            <input type="text" name="model" value={model} onChange={(e)=>setModel(e.target.value)} className="form-control"  placeholder="Add model" />
                         </div>
                         <div className="mb-3">
                            <input type="text" name="reg_year" value={reg_year} onChange={(e)=>setReg_Year(e.target.value)} className="form-control" placeholder="Add registration year" />
                         </div>
                       
                        
                       
                        </form>





      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        {isLoading?<button disabled className='red-btn'>Update Car</button>:<button type="button" onClick={onEditCars} className='red-btn'>Update Car</button>}

      </div>
    </div>
  </div>
</div> */}


   
    </>
  )
}

export default EditCarDetails