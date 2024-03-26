import React, { useContext, useState } from 'react'
import '../services.css';
import Axios from '../../../Axios';
import Toast from '../../../Tost';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider';
//import { addCartContext } from '../../../context/AddCarProvider';


const carbrandArr = ["car1", "car2", "car3", "car4"]
function AddNewCar() {
    const [isLoading, setIsLoading] = useState(false)
   const {userToken} = useContext(AuthContext)
    const [addCars, setAddCars] = useState({
        brand:"",
        model:"",
        reg_year:""
    });
    const navigate = useNavigate()

    const handleAddCars = async () =>{
        setIsLoading(true)
          if(userToken){

        
      
              try {
               const response = await Axios.post('/create_car', addCars,{
                headers: {
                    Authorization: `Bearer ${userToken}`
                  }
               });
               if(response.status===200){
                const data = response?.data;
                   // console.log("data..",data)
                Toast(data?.message,response.status)
                setTimeout(()=>{
                    navigate('/services')
                },1000)              
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


  return (
    
    <div className="container-fluid fullHeight d-flex justify-content-center align-items-center">
        <div className="container">
            <div className="row">

                <div className="col-12 d-flex justify-content-center align-items-center">
                    <div className="add-car-form p-4 bg-lightblue card-shadow rounded">
                    <h3 className='red-t text-center py-3'>Add New Car</h3>
                        <form>
                        {/* <div className="mb-3">
                        <div class="input-group mb-3">
                            <input type="file" class="form-control" id="inputGroupFile02" />
                            <label class="input-group-text" for="inputGroupFile02">Upload Car Photo</label>
                        </div>
                        </div> */}
                        <div className="mb-3">
                        <select className="form-select" onChange={(e)=>setAddCars({...addCars, brand:e.target.value })} aria-label="Default select example">
                            <option selected>Select Car Brand</option>
                            {
                                carbrandArr.map((val, idx)=>(
                                    <option key={idx+1} value={`${val}`}>{val}</option>
                                ))
                            }
                           
                            
                        </select>
                         </div>
                          <div className="mb-3">
                            <input type="text" onChange={(e)=>setAddCars({...addCars, model:e.target.value })} className="form-control"  placeholder="Add model" />
                         </div>
                         <div className="mb-3">
                            <input type="text" onChange={(e)=>setAddCars({...addCars, reg_year:e.target.value })} className="form-control" placeholder="Add registration year" />
                         </div>
                       
                        {isLoading?<button disabled className='red-btn'>Add Car</button>:<button onClick={handleAddCars} className='red-btn'>Add Car</button>}
                       
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddNewCar