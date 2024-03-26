import React, { useContext, useEffect, useState } from 'react';
import Axios from '../../Axios';
import Loader from '../../Loader';
import CaroselBanner from '../../components/CaroselBanner';
import Toast from '../../Tost';
import { CartContext } from '../../context/CartProvider';
import { AuthContext } from '../../AuthProvider';

function Maintenance() {
  const [isLoading, setIsLoading] = useState();
  const [maintenance, setMaintenance] = useState();
  const [maintenaceBanner, setMaintenaceBanner] = useState([]);
  const {userToken} = useContext(AuthContext)
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const {handleAddToCart, cart} = useContext(CartContext)
  const textCount = 100;

  const handleGetMaintenance = async () => {
    try {
      setIsLoading(true);
      const response = await Axios.get('/maintenance', {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      if (response.status === 200) {
        const data = response?.data;
        setMaintenance(data?.maintenances);
        // Initialize the expanded state for each description to false
        setExpandedDescriptions(new Array(data?.maintenances.length).fill(false));
      }
    } catch (err) {
      // const error = err.response.data
      // Toast(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  const getPdiBanner = async () => {
    try {
      setIsLoading(true)
      const response = await Axios.get('/get_pdi_banner');
      if (response.status === 200) {
        const data = response?.data;
        setMaintenaceBanner(data?.banners);
      }
    } catch (err) {
      const error = err?.response?.data;
      Toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetMaintenance();
    getPdiBanner();
  }, []);

  const toggleReadMore = (index) => {
    setExpandedDescriptions((prev) => {
      const updatedState = [...prev];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

  const addToCart = (id, token, type)=>{
    handleAddToCart(id, token, type)
    setTimeout(()=>{
      handleGetMaintenance()
    },1000)
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className="container nav-margin">
        <div className="row">
          <div className="col-12">
            <CaroselBanner banners={maintenaceBanner} />
          </div>
          <div className="col-12 py-4">
            <h3 style={{fontSize:'30px'}} className='red-t text-center'>Maintenance</h3>
          </div>
          {maintenance?.map((val, index) => (
            <div key={val.id} className="col-12 col-md-4 p-2 mb-2">
              <div className="maintenance-card border rounded p-3 ">
                <div className='pb-2'>
               
              <img src={val?.images?val?.images:'https://shopninja.in/anurag/caross/public/storage/brand-models/October2023/N3g4piOboqVr0TbQamuc.jpg'} className='img-fluid' alt="" />
                </div>
                <h4 className='fw-bold'>{val?.name}</h4>
                <p className=' p-0 mb-0' style={{textAlign:'justify', fontSize:'13px'}}  >
                    { expandedDescriptions[index] ? val.description : `${val.description.slice(0, textCount)}...`}
                    {val.description.length > textCount && (
                  <span onClick={() => toggleReadMore(index)} className="btn btn-link" style={{fontSize:'14px', cursor:'poiner'}}>
                    {expandedDescriptions[index] ? 'Show less' : 'Show more'}
                  </span>
                )}
                    </p>

                    <div className='d-flex flex-column flex-md-row justify-content-between'>
                    <div className='mb-1'><span style={{fontSize:'13px'}}>Duration :</span><span style={{fontSize:'13px'}}>&nbsp;{val?.month} Months</span></div>
                <div className='mb-2'><span className='' style={{fontSize:'13px'}}>Expiry Date</span>: <span  style={{fontSize:'13px'}}>{val.date}</span></div>
                    </div>
                
              
              
               {val?.in_cart?<button className='small-red-btn-disable'>Book Now</button>:<button className='small-red-btn' onClick={()=>addToCart(val?.product_id, userToken, 2)}>Book Now</button>}
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Maintenance;
