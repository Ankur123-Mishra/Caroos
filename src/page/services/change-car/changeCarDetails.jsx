import React, { useContext, useState } from "react";
//import Axios from '../../../Axios'
import Loader from "../../../Loader";
//import Toast from '../../../Tost'
import { AuthContext } from "../../../AuthProvider";
import { addCarContext } from "../../../context/AddCarProvider";
const carbrandArr = ["car1", "car2", "car3", "car4"];
function ChangeCarDetails({ Cars }) {
  console.log("drefefeklw", Cars);
  // const [isLoading, setIsLoading] = useState(false)
  const { userToken } = useContext(AuthContext);
  const { handleUpdateCars, loading } = useContext(addCarContext);
  const [updateCars, setUpdatedCars] = useState({
    brand: "",
    model: "",
    reg_year: "",
    car_id: "",
  });

  // const handleUpdatedCars = async (id) =>{

  //     setIsLoading(true)
  //           try {
  //            const response = await Axios.post('/update_car', {...updateCars,car_id:id },{
  //             headers: {
  //                 Authorization: `Bearer ${userToken}`
  //               }
  //            });
  //            if(response.status===200){
  //             const data = response?.data;
  //                // console.log("data..",data)
  //             Toast(data?.message,response.status)
  //            }
  //           } catch (err) {
  //             const error = err?.response?.data
  //             Toast(error.message)
  //           }finally{
  //             setIsLoading(false)
  //           }
  // }

  return (
    <>
      {loading && <Loader />}
      <button
        className="red-btn"
        data-bs-toggle="modal"
        data-bs-target={`#${Cars.id}`}
      >
        Change Car
      </button>

      {/* modal */}
      <div
        className="modal fade"
        id={`${Cars.id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Chnage Car
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <select
                    className="form-select"
                    onChange={(e) =>
                      setUpdatedCars({ ...updateCars, brand: e.target.value })
                    }
                    aria-label="Default select example"
                  >
                    <option selected>Select Car Brand</option>
                    {carbrandArr.map((val, idx) => (
                      <option key={idx + 1} value={`${val}`}>
                        {val}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUpdatedCars({ ...updateCars, model: e.target.value })
                    }
                    className="form-control"
                    placeholder="Add model"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUpdatedCars({
                        ...updateCars,
                        reg_year: e.target.value,
                      })
                    }
                    className="form-control"
                    placeholder="Add registration year"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={(e) =>
                  handleUpdateCars(Cars, updateCars, userToken, e)
                }
                className="red-btn"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeCarDetails;
