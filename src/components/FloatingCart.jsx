
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CartContext } from '../context/CartProvider'
import { Button, Fab } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
function FloatingCart() {
   const {pathname} = useLocation()
  const {cart } = useContext(CartContext)
const [showing, setShowing] = useState(false)
  useEffect(()=>{
    if(pathname==="/services/detailing" ||pathname==="/services/services/paint-protection" || pathname==="/services/denting-and-painting" || pathname==="/services/services"){
       setShowing(true)
    }else{
      setShowing(false)
    }
  },[pathname])
  return (
       <>
       {showing?(<>
        {cart.length?(<>
          <Link to="/cart" className="cart-icon">
    <div className="floating-cart">

            <i className="fas fa-shopping-cart" style={{color:'black'}}></i>
            <span className="badgecart">{cart?.length ? cart?.length :0}</span>
       
  
</div>
 </Link>
  </>):null} 
  </>
       ):null}
  
{/* {pathname==="/"?(<div className="floating-whatsapp" style={{zIndex:'999'}}>
<a href="https://api.whatsapp.com/send?phone=918929227077" target="_blank"  className='d-inline d-md-none' >
<Fab color="primary" size='small' sx={{backgroundColor:'#25d366', '&:hover':{backgroundColor:'#25d366'}}} aria-label="add">
<WhatsAppIcon />
</Fab>
</a> */}

{/* <a href="https://api.whatsapp.com/send?phone=918929227077" target="_blank"  className='d-none d-md-inline'>
<Fab color="primary" size='medium' sx={{backgroundColor:'#25d366', '&:hover':{backgroundColor:'#25d366'}}} aria-label="add">
<WhatsAppIcon fontSize='medium' />
</Fab>
</a> */}

  {/* <a href="https://api.whatsapp.com/send?phone=918929227077" target="_blank" >
    <i className="fab fa-whatsapp"></i>
  </a> */}
{/* </div>):null} */}

{pathname==="/"?(<div className="floating-call "  style={{zIndex:'999'}}>
<a href="tel:8929227077" target="_blank" className='d-inline d-md-none' >
<Fab color="primary" size='medium' sx={{backgroundColor:'black', '&:hover':{backgroundColor:'black'}}} aria-label="add">
<CallIcon />
</Fab>
</a>


  {/* <Button variant='contained' size='' sx={{width:'36px', height:'36px', borderRadius:'50%'}}>
   <CallIcon/>
  </Button> */}
  {/* <a href="tel:8929227077" target="_blank" >
  <i className="fa-solid fa-phone" style={{color: 'white'}}></i>
  </a> */}
</div>):null}
       </>
  )
}

export default FloatingCart