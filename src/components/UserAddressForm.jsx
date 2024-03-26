import React, { useContext, useEffect, useState } from 'react'
import { UserAddressContext } from '../context/UserAddressProvider'
import { AuthContext } from '../AuthProvider'
import Button from 'react-bootstrap/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from 'react-bootstrap/Modal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { IconButton, Button as MButton } from '@mui/material'
import { useNavigate } from 'react-router-dom';
function UserAddressForm({oldAddress, isLoading, lat, long, liveaddress, formattedliveaddress, handleAddAddress, handleUpdateAddress,userallAddress, isAddress }) {
   // const {loading, handleAddAddress, handleUpdateAddress ,handleGetAllAddress} = useContext(UserAddressContext)
    const {userToken} = useContext(AuthContext)
    const [check, setCheck] = useState(false)
    const [error, setError] = useState("")
    const [userAddress, setUserAddress] = useState({
      landmark:oldAddress?.landmark?oldAddress.landmark:'',      
      locality:oldAddress?.locality?oldAddress.locality:'',  
      pin_code:oldAddress?.pin_code?oldAddress.pin_code:'',
      is_default:oldAddress?.is_default,
      house_no:oldAddress?.house_no?oldAddress?.house_no:'',
      lat:lat,
      lng:long
    })

useEffect(()=>{
  setUserAddress({...userAddress, landmark:formattedliveaddress?.landmark, locality:formattedliveaddress?.city,pin_code:formattedliveaddress?.postalCode, })
},[formattedliveaddress])


    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        if(check){
            setUserAddress({...userAddress,is_default:1 })
          }else{
            setUserAddress({...userAddress,is_default:0 })
          }
    },[check])






    const handleChange = (e) => {
      
      const { name, value } = e.target;
      
      setUserAddress({
        ...userAddress,
        [name]: value
      });

    };
   const onSaveAddress = (userAddress, userToken ,e, navigate)=>{
          if(!userAddress.house_no){
              return alert("Please Enter Your House No.")
          }else if(!userAddress.locality){
            return alert("Please Enter your Locality.")
          }else if(!userAddress.pin_code){
            return alert("Please Enter Your Pincode.")
          }else if(!userAddress.landmark){
            return alert("Please Enter Your Landmark.")
          }else{
            handleAddAddress(userAddress ,e, navigate)
             handleClose()
       
            
          }
   
   }
   










   const handleUpdateAddress1 = (oldaddressid, e, handleClose, navigate)=>{
              e.preventDefault();
              if(!userAddress.house_no){
                return alert("Please Enter your House No.")
            }else if(!userAddress.locality){
              return alert("Please Enter your Locality.")
            }else if(!userAddress.pin_code){
              return alert("Please Enter your Pincode.")
            }else if(!userAddress.landmark){
              return alert("Please Enter your Landmark.")
            }else{
              handleUpdateAddress(userAddress, oldaddressid, handleClose, navigate)
               handleClose()
            }


              
   }

   

    useEffect(()=>{
         if(isAddress){
          handleShow()
          
         }
    },[isAddress])
  
const handleEdit = ()=>{
  handleShow()
 
}

const handleCreate = ()=>{
  let updateaddress = {
    landmark:formattedliveaddress?.landmark?formattedliveaddress?.landmark:'',      
    locality:formattedliveaddress?.city?formattedliveaddress?.city:'',  
    pin_code:formattedliveaddress?.postalCode?formattedliveaddress?.postalCode:'',
  
    house_no:formattedliveaddress?.houseNo?formattedliveaddress?.houseNo:'',
   
  }
    if(updateaddress){
      setUserAddress({...userAddress,  landmark:oldAddress?.landmark})
      handleShow()
    }
}

console.log("formattedliveaddress", formattedliveaddress)

  return (
  <> 
  
  {
    oldAddress?(
      <>
      <MButton variant="contained" color="error" sx={{marginBottom:'4px', width:'110px'}} className='d-none d-md-flex' onClick={()=>handleEdit()} startIcon={<ModeEditIcon />}>
  Edit
  </MButton>
  <IconButton aria-label="delete" onClick={handleShow} className='d-md-none d-block'>
  <ModeEditIcon />
  </IconButton>
     
      </>
      ):(<>
        <MButton variant="contained" color="error" onClick={handleCreate} sx={{marginBottom:'4px', width:'130px'}} startIcon={<AddCircleOutlineIcon />}>
        Create
            </MButton>
      {/* <Button style={{padding:'7px'}} className='red-btn' variant="danger" onClick={handleShow}>
        Create Address
      </Button> */}
  </>)}


      <Modal show={show} onHide={handleClose}
       aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
          Your Address
          {liveaddress?.formatted_address && <div className='pe-4' style={{fontSize:'13px', fontWeight:'300'}}><i class="fa-solid fa-location-dot" style={{color:'red'}}></i>&nbsp;{liveaddress?.formatted_address.slice(0, 80)}...</div>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
                   <div className="mb-3 position-relative">
                    <span style={{color:'red'}} className='required-field'>*</span>
                    <input type="text" onChange={handleChange} name="house_no" value={userAddress?.house_no} className="form-control" placeholder="Enter Your House No." disabled={false} />
                   
                    </div>
                    <div className="mb-3 position-relative">
                    <span style={{color:'red'}} className='required-field'>*</span>
                    <input type="text" onChange={handleChange} className="form-control" name="locality" value={userAddress?.locality}  placeholder="Enter Your Locality" disabled={false} />
                    </div>
                    <div className="mb-3 position-relative">
                    <span style={{color:'red'}} className='required-field'>*</span>
                    <input type="text" onChange={handleChange} name="pin_code" className="form-control" value={userAddress?.pin_code} placeholder="Enter Your  Pin Code" disabled={false} />
                    </div>
                    
                    <div className="mb-3 position-relative">
                    <span style={{color:'red'}} className='required-field'>*</span>
                    <input type="text" onChange={handleChange} className="form-control" value={userAddress?.landmark} name="landmark"  placeholder="Enter Your Landmark" disabled={false} />
                    </div>
                    <div className="mb-3 position-relative text-start">
                    <input type="checkbox"  onChange={(e)=>setCheck(!userAddress.is_default)} checked ={userAddress.is_default}/>
                    <label className='ms-2'>Default Address</label>
                    </div>
                    
                </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          {
            oldAddress?(<>
              <MButton variant="contained" disabled={isLoading} color="error" onClick={(e)=>{handleUpdateAddress1( oldAddress?.id, e, handleClose, navigate)}} sx={{marginBottom:'4px'}} >
              {isLoading?(<><span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">Loading...</span></>):" Update"}
            </MButton>
              {/* <MButton variant="contained" disabled={isLoading} color="error" onClick={(e)=>{handleUpdateAddress(userAddress, oldAddress?.id, userToken, e, handleClose, navigate)}} sx={{marginBottom:'4px'}} >
              {isLoading?(<><span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">Loading...</span></>):" Update"}
            </MButton> */}
           
          </>):(<>
            <MButton variant="contained" disabled={isLoading} color="error" onClick={(e)=>{onSaveAddress(userAddress ,e, navigate)}} sx={{marginBottom:'4px'}}>
            {isLoading?(<><span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">Loading...</span></>):" Save"}
            </MButton>
          
          </>)}
          
        </Modal.Footer>
      </Modal>





{/* {
  oldAddress?(<button type="button" className="red-btn" data-bs-toggle="modal" data-bs-target={oldAddress?.id?(`#${oldAddress?.id}`):"#exampleModal"}>
  Edit Address
</button>):(<button type="button" className="red-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Add Address
</button>)
} */}




{/* modal */}
{/* <div className="modal fade" id={oldAddress?.id?(`${oldAddress?.id}`):"exampleModal"} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Enter Your Address</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body"> */}
             {/* form */}
             {/* <div>
             <form>
                    <div className="mb-3">
                    <input type="text" onChange={handleChange} className="form-control" value={userAddress?.landmark} name="landmark"  placeholder="Enter Your Landmark" disabled={false} />
                    </div>
                    <div className="mb-3">
                    <input type="text" onChange={handleChange} className="form-control" name="locality" value={userAddress?.locality}  placeholder="Enter Your Locality" disabled={false} />
                    </div>
                    <div className="mb-3">
                    <input type="text" onChange={handleChange} name="pin_code" className="form-control" value={userAddress?.pin_code} placeholder="Enter Your  Pin Code" disabled={false} />
                    </div>
                    <div className="mb-3 text-start">
                    <input type="checkbox"  onChange={(e)=>setCheck(!userAddress.is_default)} checked ={userAddress.is_default}/>
                    <label className='ms-2'>default Address</label>
                    </div>
                    <div className="mb-3">
                    <input type="text" onChange={handleChange} name="house_no" value={userAddress?.house_no} className="form-control" placeholder="Enter Your House No." disabled={false} />
                    </div>
                </form>
             </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        {oldAddress?(<><button type="button" onClick={(e)=>handleUpdateAddress(userAddress, oldAddress?.id, userToken, e)} className="red-btn">Update Address</button></>):(<>
            <button type="button" onClick={(e)=>handleAddAddress(userAddress, userToken ,e)} className="red-btn">Add Address</button>
        </>)}
        
      </div>
    </div>
  </div>
</div> */}
       
</>           
  )
}



export default UserAddressForm