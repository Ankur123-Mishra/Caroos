import React, { useContext, useEffect, useState } from 'react'
import brandlogo from '../asets/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Axios from '../Axios';
import Toast from '../Tost';
import { AuthContext } from '../AuthProvider';
import { CartContext } from '../context/CartProvider';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';
//import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from 'react-bootstrap/Navbar';
import Login from '../page/auth-pages/Login';
import { addCarContext } from '../context/AddCarProvider';
import { IconButton } from '@mui/material';


function Navbar1() {
 const {cart ,setCart} = useContext(CartContext)
 const {userToken, setUserToken, } = useContext(AuthContext)
 const [isLoading, setIsLoading] = useState(false)
 const [show, setShow] = useState(false)
 const [brandLogo, setBrandLogo] = useState("")
 const {setUserCarDetails} = useContext(addCarContext)
 const navigate = useNavigate();
 const location = useLocation()
 const [path, setPath] = useState(false)
 const [ isAboveMessageShow, setIsAboveMessageShow] = useState(false)
// const [allCategoriesData, setAllCategoriesData] = useState([])
   const onScrollingTop = () =>{
    window.scrollTo(0, 0);
   }

  

   const getBrandLogo = async ()=>{
    setIsLoading(true)
    try{
         const response = await Axios.get('/get-logo')
         if(response.status===200){
            const data = response?.data;
             setBrandLogo(data?.logo)
             console.log("logo",data);
           }
    } catch (err) {
        const error = err.response.data
     
        
    }finally{
        setIsLoading(false)
    }
}

useEffect(()=>{
  getBrandLogo()
},[])

   const onLogout = async ()=>{
       setIsLoading(true)
       try{
            const response = await Axios.get('/logout', {
               headers:{
                   Authorization: `Bearer ${userToken}`
               }
            })
            if(response.status===200){
               const data = response?.data;
                if(data){
                  Cookies.remove('userToken');
                  setUserToken(null);
                   //localStorage.removeItem('userToken');
                   setUserToken("")
                   setCart(0)
                   setUserCarDetails([])
                   localStorage.removeItem("cart")
                } 
               Toast(data?.message,response.status)
               navigate("/") 
              }
       } catch (err) {
           const error = err.response.data
           Toast(error.message)
           
       }finally{
           setIsLoading(false)
       }
   }
   

 




      useEffect(()=>{
        if(location.pathname==="/services" || location.pathname==="/services/detailing" || location.pathname === "/services/paint-protection" || location.pathname=== "/services/denting-and-painting" || location.pathname==="/services/services" || location.pathname==="/services/accessories" || location.pathname==="/services/18" || location.pathname==="/services/19" || location.pathname==="/services/20" || location.pathname==="/services/21"  ){
          setPath(true)
   }else{
    setPath(false)
   }
  
     if(location.pathname=="/"){
          setIsAboveMessageShow(true)
     }else{
      setIsAboveMessageShow(false)
     }

 
        
      },[location.pathname])
       
      console.log("path", location.pathname)

      const onCartClick = ()=>{
           if(userToken){
               if(cart.length){
                   navigate("/cart")
               }else{
                Toast("Please add items in your cart", 200)
               }
           }else{
            Toast("Kindly Login", 200)
           }
      }
      const onToggle = ()=>{
         setShow(true)
      }



  return (
       <>
    <div className={isAboveMessageShow?'nav-shadow  ':null}>
      
    {isAboveMessageShow? <div  className='row   mb-0 p-0 border-bottom position-relative' style={{cursor:'pointer', background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 47%, rgba(252,176,69,1) 100%)', height:'40px'}}>
     <div onClick={()=>navigate("/pre-delivery-inspection")} className='col-12 d-flex  justify-content-end align-items-center position-relative'>
     <marquee className='text-center ' style={{fontSize:'1rem', color:'white', fontWeight:'400', }} behavior="scroll" direction="left" scrollamount="10">
     Safety First, Always: Our Pre-Delivery Inspection Ensures It. Dive into the Details
</marquee>

     {/* <p className='text-center pt-3' style={{fontSize:'13px', color:'white', fontWeight:'600'}}>Buying a new car ? Don’t risk it.
      Get a free pre delivery inspection now  &nbsp; 
       <Link to="/pre-delivery-inspection" style={{fontSize:'13px', color:'#b8242a'}}>Explore...</Link>
       </p>  */}
     </div>
     {/* <Link to="/pre-delivery-inspection" className='position-absolute' style={{fontSize:'13px', color:'#b8242a', width:'40px', height:'40px', right:'82px', top:'27%%', }}>Explore...</Link> */}
     <div className=" d-flex justify-content-center align-items-center position-absolute" style={{width:'40px', height:'40px', right:'8px', zIndex:'99'}}>
     <IconButton onClick={()=>setIsAboveMessageShow(false)} aria-label="delete" size="medium">
  <CloseIcon sx={{color:'white'}} fontSize="inherit" />
</IconButton>
     
     </div>
     
   </div>:null} 


   <Navbar expand="lg"  collapseOnSelect  className={path? "px-1 mt-0 bg-white navbar navbar-expand-lg nav-shadow nav-container":isAboveMessageShow?" px-1 bg-white navbar navbar-expand-lg nav-conainer": "nav-shadow px-1 bg-white navbar fixed-top navbar-expand-lg nav-conainer"}>    
{/* <Container> */}
<NavLink className="navbar-brand ms-md-3" onClick={onScrollingTop} to="/">
<img src={brandLogo?brandLogo:brandlogo} alt="Bootstrap" style={{maxWidth:'200px'}} className='img-fluid' />
</NavLink>
  <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
  {/* <NavbarMobile/> */}
  <Navbar.Collapse id="responsive-navbar-nav" className="basic-navbar-nav bg-white " style={{zIndex:'10'}}>
  {/* <Collapse isOpen={menuOpen} > */}
    <Nav className="ms-auto pe-2 pe-md-0">
      <Nav.Link  className='text-end '><NavLink onClick={onScrollingTop}  className="nav-link nav-text" to="/" >Home</NavLink></Nav.Link>
      <Nav.Link className='text-end '><NavLink onClick={onScrollingTop} className="nav-link nav-text" to="/services/detailing">Services</NavLink></Nav.Link>
      <Nav.Link href='https://caross.in/blog/'><a href='https://caross.in/blog/'  className="nav-link nav-text" target='_blank'>Blog</a></Nav.Link>
    </Nav>

    <Nav className="ms-auto me-md-3 g-md-4 pe-2 ps-md-0">
     {userToken && <Nav.Link className='mt-md-1 text-end' >
      <a className=" nav-text position-relative" onClick={onCartClick}>
      <div class="cart-icon">
      <i class="fas fa-shopping-cart"></i>
      <span class="badge">{cart.length ? cart.length :0}</span>
      </div>           
    </a>
    </Nav.Link>}
    {
      userToken?(
        <>
        <NavDropdown title="Profile" className='nav-text mt-0 mt-md-2 mx-0 mx-md-4 text-end' id="basic-nav-dropdown">
        {/* <NavDropdown.Item ><NavLink className="" style={{color:'black'}} to="/my-account">My Acount</NavLink></NavDropdown.Item> */}
        <NavDropdown.Item ><NavLink className="nav-text d-flex justify-content-between align-items-center"  to="/my-cars"><span>My Cars</span> <i class="fa-solid fa-caret-right"></i></NavLink></NavDropdown.Item>
        <NavDropdown.Item ><NavLink className="nav-text d-flex justify-content-between align-items-center"  to="/my-orders"><span>Order Status</span> <i class="fa-solid fa-caret-right"></i></NavLink></NavDropdown.Item>
        <NavDropdown.Item ><NavLink className="nav-text d-flex justify-content-between align-items-center"  to="/my-coupons"><span>My Coupons</span> <i class="fa-solid fa-caret-right"></i></NavLink></NavDropdown.Item>
        <NavDropdown.Item ><NavLink className="nav-text d-flex justify-content-between align-items-center"  to="/maintenance"><span>Maintenance</span> <i class="fa-solid fa-caret-right"></i></NavLink></NavDropdown.Item>
        <NavDropdown.Item ><NavLink className="nav-text d-flex justify-content-between align-items-center"  to="/my-details"><span>My Details</span> <i class="fa-solid fa-caret-right"></i></NavLink></NavDropdown.Item>

        <NavDropdown.Item ><NavLink className="nav-text d-flex justify-content-between align-items-center"  to="/my-orders"><span>My Orders</span> <i class="fa-solid fa-caret-right"></i></NavLink></NavDropdown.Item>
        
        <NavDropdown.Item onClick={onLogout} >
       Logout
        </NavDropdown.Item>
      </NavDropdown>
        </>
      ):(
        <>
        <Nav.Link className='' >
        {/* <NavLink className="btn border white-btn px-0 px-md-3 py-1 "  to="/login" style={{color:'white', width:'120px'}}><i className="me-1 fa-solid fa-right-to-bracket fa-lg"></i><Login/></NavLink> */}
        <Login/>
        </Nav.Link>
        <Nav.Link className='' href="tel:8929227077" >
       
        <a className="nav-text px-0 px-md-1  py-1" href="tel:8929227077"  ><i class="fa-solid fa-phone-volume" style={{color:'#DE3820'}}></i> 8929227077</a>    
        </Nav.Link>
        
        
        </>
      )
    }
     
    </Nav>
  </Navbar.Collapse>
{/* </Container> */}
</Navbar> 
    </div>
 

 

    {/* <NavbarMobile cart={cart} userToken={userToken} onLogout={onLogout} path={path}/> */}

    
     
     











    {/* <Navbar expand="lg" className="px-1 bg-white navbar navbar-expand-lg fixed-top nav-shadow nav-conainer"> */}
{/* <nav className="px-1 bg-white navbar navbar-expand-lg fixed-top nav-shadow nav-conainer"> */}
  {/* <NavLink className="navbar-brand ms-md-3" to="/">
      <img src={brandlogo} alt="Bootstrap" className='img-fluid' />
    </NavLink>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"> */}
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
    {/* <div className="collapse navbar-collapse bg-white px-3 px-md-1" id="navbarNav">
      <ul className="navbar-nav ms-auto g-md-4">
        <li className="nav-item">
          <NavLink className="nav-link nav-text" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link nav-text" to="/services/16">Services</NavLink>
        </li>
        <li className="">
          <NavLink className="nav-link nav-text" to="/blogs">Blog</NavLink>
        </li> */}
        {/* <li className="">
          <NavLink className="nav-link nav-text" to="/about-us">About Us</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link nav-text" to="/contact-us">Contact Us</NavLink>
        </li> */}
      {/* </ul>
      <ul className="navbar-nav ms-auto me-md-3 g-md-4">
      <li className="nav-item px-5">
          <NavLink className="position-relative nav-text" to="/cart">
          Cart
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
             {cart.length}
        </span>
          </NavLink>
        </li>
        {
          userToken?(
            <>
            <li className="nav-item dropdown">
            <NavDropdown title="profile" id="basic-nav-dropdown"> */}
          {/* <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Profile
          </a> */}
          {/* <NavDropdown.Item href="#action/3.1"><NavLink style={{color:'black'}} className="" to="/my-account">My Acount</NavLink></NavDropdown.Item>
          <NavDropdown.Item href="#action/3.1" onClick={onLogout}>Logout</NavDropdown.Item> */}
          {/* <ul className="dropdown-menu ">
            <li> <NavLink className="" to="/my-account">My Acount</NavLink></li>
            <li><button onClick={onLogout} >Logout</button></li>
          </ul> */}
          {/* </NavDropdown>
        </li> */}
            {/* <li className="nav-item">
          <NavLink className="btn btn-danger red-b px-5 py-1 " to="/my-account">My Acount</NavLink>
        </li>
        <li className="nav-item ms-2">
          <button onClick={onLogout} className="btn btn-danger red-b px-4 py-1">Logout</button>
        </li> */}
        {/* </>
          ):(
            <li className="nav-item">
          <NavLink className="btn white-btn px-5 py-1 "  to="/login" style={{color:'white'}}><i className="fa-solid fa-right-to-bracket fa-lg"></i>Login</NavLink>
        </li>
          )
        } */}
      
       
      {/* </ul>
    </div>
  */}
{/* // </nav> */}
{/* // </Navbar.Collapse>
// </Navbar> */}
       </>
  )
}

export default Navbar1