import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthProvider';
import Axios from '../../../Axios';
import './mycoupon.css';
import Loader from '../../../Loader';

function MyCoupons() {
  const [isLoading, setIsLoading] = useState(false);
  const { userToken } = useContext(AuthContext);
  const [allCoupon, setAllCoupon] = useState([]);
  const [isCopied, setIsCopied] = useState({}); // Initialize isCopied as an empty object

  const handleCopyClick = (textToCopy, index) => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setIsCopied((prev) => ({ ...prev, [index]: true }));
      })
      .catch(error => {
        console.error('Copy failed: ', error);
      });
  };

  const CouponList = async () => {
    try {
      setIsLoading(true);
      if (userToken) {
        const response = await Axios.get('/get-my-coupons', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.status === 200) {
          const data = response?.data;
          setAllCoupon(data?.coupons);
        }
      }
    } catch (err) {
      const error = err.response.data;
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    CouponList();
  }, [userToken]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="container-fluid nav-margin">
        <div className="container coupon-container">
          <div className="row gy-2 gx-2 justify-content-center">
            <div className="col-12">
              <h3 className="text-center red-t heading my-3">My Coupons</h3>
            </div>
            <div className="col-12">
              <div className="row">
              
                {allCoupon.length ? (
                  allCoupon.map((val, index) => (
                    <>
                    <div key={val.id} className="col-12 col-md-3"></div>
                   
                    <div key={val?.id} className="col-md-6 col-12">
                      <div className='d-flex justify-content-between border mb-3 rounded px-2 py-2 align-items-center w-100'>
                        <p className='m-0 p-0 d-flex flex-column'>
                          <span>Code</span>
                          <b className='red-t' style={{ fontSize: '14px' }}>{val?.coupon_code}</b>
                        </p>
                        {val.is_expired === false ? (
                          <>
                            <p className='m-0 p-0 d-flex flex-column'>
                              <span>Expired At: &nbsp;</span>
                              <b className='red-t' style={{ fontSize: '14px' }}>{val?.expire_at ? val?.expire_at : 'Unlimited'}</b>
                            </p>
                          </>
                        ) : (
                          <>
                            <p className='m-0 p-0 '>coupon expired</p>
                          </>
                        )}
                        <p className='m-0 p-0 d-flex flex-column'>
                          <span>Discount:&nbsp;</span>
                          <b className='red-t' style={{ fontSize: '14px' }}>  {val?.discount} {val?.type === 1 ? "Rs" : "%"} &nbsp; Off</b>
                        </p>
                        {isCopied[index] ? (
                          <button className='copied-button red-t'>copied</button>
                        ) : (
                          <button className='copy-button red-b' onClick={() => { handleCopyClick(val?.coupon_code, index) }}>copy</button>
                        )}
                      </div>
                    </div>
                    <div key={val.id} className="col-12 col-md-3"></div>
                    </>
                  ))
                ) : (
                  <div className="col-12 red-t d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                    <h3 className='red-t'>Coupon is not available</h3>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCoupons;
