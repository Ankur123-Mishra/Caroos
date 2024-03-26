import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import PopOverCardMobile from '../page/services/select-services/PopOverCardMobile';
import Login from '../page/auth-pages/Login';
function ServiceCardMobile({val, userCarDetails, userToken, addtoCart}) {
     console.log("val",val)
  return (
<>
{val?.map((product, idx)=>(
       
       
      <Card key={idx+1} sx={{ display: 'flex', width:'100%', flexDirection: 'row', marginBottom:'10px', position:'relative', zIndex:'0' }} className='card-shadow'>
       
       <Box sx={{ display: 'flex', flexDirection: 'row'}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="auto"
        sx={{width:'140px', height:'100px', margin:'auto auto'}}
        image={`${product?.images}`}
      />
      <CardContent sx={{padding:'10px'}}>
        <Typography gutterBottom variant="h4" sx={{fontSize:'14px', fontWeight:'bold'}} color="text.secondary">
           {product?.name}
        </Typography>
        <Typography variant="body2" sx={{fontSize:'11px', fontWeight:'bold'}} color="text.secondary">
        <PopOverCardMobile text={product?.description}/>
        </Typography>  
          
        {
            userCarDetails.length>0?(
                <>
               {product?.price && <h3 className=' text-black' style={{fontSize:'14px'}}><i class="fa-solid fa-indian-rupee-sign fa-md" style={{color:'#62718d'}}></i> {product?.price}</h3>}
               
              {product?.price && <div className=' position-absolute d-inline' style={{bottom:'0', right:'-7px'}}>
                    {product.in_cart?(
                      
                      <IconButton color="primary" disabled={true} sx={{color:'black'}} aria-label="add to shopping cart"><AddShoppingCartRoundedIcon/></IconButton>
                      ):(
                      <>
                      <IconButton color="primary" sx={{color:'#DE3820'}} aria-label="add to shopping cart" onClick={() =>addtoCart(product.product_id, userToken, 1)}><AddShoppingCartRoundedIcon/></IconButton>
                      </>
                      
            )}     
            
                </div>} 
                </>
            ):(
                <>
             {product.price && <h3 className=' text-black mt-2' style={{fontSize:'14px'}}><i class="fa-solid fa-indian-rupee-sign fa-md" style={{color:'#62718d'}}></i> {product?.price}</h3>}
                {userToken?(
                  <Link to="/my-cars">
                 <Button size="small" variant="outlined" startIcon={<ElectricCarIcon />} sx={{color:'#DE3820'}}>
                  Add
                  </Button>
                  </Link>
                ):(
                  <Login mobileLogin="Add"/>
                )}
                
                </>
            )
          }
         
      

      </CardContent>
      </Box>
    </Card>
))}
      </>
  )
  
}

export default ServiceCardMobile