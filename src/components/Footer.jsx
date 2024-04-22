import React, { useEffect, useState } from 'react'
import brandlogo from '../asets/white-caross.png'
import logo1 from '../asets/IOS.png'
import logo2 from '../asets/gpaybtn.png'
import { Link } from 'react-router-dom'
import Axios from '../Axios'
import Toast from '../Tost'
function Footer() {
 const [loading, setIsLoading] = useState(false)
 const [allCategoriesData ,setAllCategoriesData] = useState([])
    const getAllCategories = async ()=>{
        setIsLoading(true)
         try {
          const response = await Axios.get('/get_all_categories')
          if(response.status===200){
            const data = response?.data;
          //   console.log("categories...", data);
            setAllCategoriesData(data?.categories.reverse())
            Toast(data?.message,response?.status)
          }
         } catch (err) {
          const error = err?.response?.data
              Toast(error?.message)
         }finally{
            setIsLoading(false)
         }
    }
   const scrollToTop = () => {
        window.scrollTo(0, 0);
      };
    useEffect(()=>{
        getAllCategories()
    },[])
  return (
    <div className="container-fluid py-5 red-b">
  
        <div className="container">
            <div className="row">
                <div className="col-12">
                      <div className='d-flex d-md-block justify-content-center'>
                      <Link to="/" onClick={scrollToTop}>
                        <img src={brandlogo} width="200px"  className='brand-Img-footer' alt="" />
                        </Link>
                      </div>
                      <hr style={{color:'white'}} />
                </div>
                <div className="col-12 col-md-12">
                    <div className="row">
                        <div className="col-6 col-md-3">
                            <ul className='footer-item d-flex flex-column align-items-cemter justify-content-center'>
                               <li style={{fontSize:'21px', color:'white'}} className='footer-text fw-bold'>About Us</li>
                                <li><Link footer-text1 to="/about-us" onClick={scrollToTop}>About</Link></li>
                                <li><Link footer-text1 to="/contact-us" onClick={scrollToTop}>Contact Us</Link></li>
                               
                                <li><a href='https://caross.in/blog/' target='_blank' rel="noreferrer">Blog</a></li>
                                {/* <li><Link footer-text1 to='/' onClick={scrollToTop}>Faq's</Link></li> */}
                                <li><Link footer-text1 to='/workshop-locator' onClick={scrollToTop}>Workshop Locator</Link></li>
                                <li><Link footer-text1 to="/privacy-policy" onClick={scrollToTop}>Privacy Policy</Link></li>
                                <li><Link footer-text1 to='/term-and-conditions' onClick={scrollToTop}>Term And Conditions</Link></li>
                                <li><Link footer-text1 to='/cancellation-and-refund-policy' onClick={scrollToTop}>Cancellation And Refund Policy</Link></li>
                                <li><Link footer-text1 to='/shipping-and-delivery-policy' onClick={scrollToTop}>Shipping And Delivery Policy</Link></li>
                            
                            </ul>
                            
                        </div>
                        <div className="col-6 col-md-3">
                            <ul className='footer-item d-flex flex-column align-items-cemter justify-content-center'>
                                <li style={{fontSize:'21px', color:'white'}} className='footer-text fw-bold'>Services</li>
                               {allCategoriesData.map((val)=>(
                                <li><Link to={`/services/${val?.slug}`} footer-text1>{val?.name}</Link></li>
                               ))}
                               
                                {/* <li><Link to="/services/13" footer-text1>Denting & Penting</Link></li>
                                <li><Link to="/services/15" footer-text1>Accessories</Link></li> */}
                                <li><Link to="/pre-delivery-inspection" footer-text1>Pre Delivery Inspection</Link></li>
                                {/* <li><Link to="/rsa" footer-text1>RSA</Link></li>
                                <li><Link to="/parking" footer-text1>Parking</Link></li>

                                <li><Link to="/inspection" footer-text1>Inspection</Link></li> */}
                            </ul>
                        </div>
                        <div className="col-6 col-md-3">
                            <ul className='footer-item d-flex flex-column align-items-cemter justify-content-center'>
                                <li style={{fontSize:'21px'}} className='footer-text fw-bold'>For Franchise</li>
                                <li><Link to="/enquiry-for-franchise" className='footer-text1'>Enquiry For Franchise</Link></li>
                                {/* <li style={{fontSize:'21px'}} className='footer-text fw-bold mt-3'>For Partners</li>
                                <li><Link to="/partners" className='footer-text1'>Partners</Link></li> */}
                            </ul>
                        </div>
                        <div className="col-6 col-md-3">
                            <ul>
                                <li>
                                <li style={{fontSize:'21px', color:'white'}} className='footer-text fw-bold'>Social Links</li>
                                </li>
                            </ul>
                            <ul className='d-flex flex-row align-items-center justify-content-start'>
                           
                                <li><a href="https://www.instagram.com/carossofficial/" target='_blank' rel='noreferrer' className='social-links-footer me-2'><i class="fa-brands fa-instagram fa-2xl" style={{color: '#fcfcfc'}}></i></a></li>
                                <li><a href="https://www.facebook.com/caross01" target='_blank' rel='noreferrer' className='social-links-footer me-2'><i class="fa-brands fa-facebook fa-2xl" style={{color: '#fcfcfc'}}></i></a></li>
                                <li><a href="https://www.youtube.com/@Carossofficial" target='_blank' rel='noreferrer' className='social-links-footer me-2'><i class="fa-brands fa-youtube fa-2xl" style={{color: '#fcfcfc'}}></i></a></li>
                            </ul>
                            {/* <ul>
                                <li className='mb-2'><a href="google.com" ><img src={logo1} className='footer-img-logo' alt="img" /></a></li>
                                <li><a href="google.com" ><img src={logo2} alt="img" className='footer-img-logo' /></a></li>
                            </ul> */}
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    
                </div>
            </div>
        </div>
       
    </div>
  )
}

export default Footer