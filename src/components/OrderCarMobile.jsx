import { Card,Button, CardActionArea, CardActions, CardContent, CardMedia, Typography, Box } from '@mui/material'
import React from 'react'
import carsImg from '../asets/image 37.png'
function OrderCarMobile({allOrders, handleCancleOrder}) {
  return (
        <>
            <div className="row">

            <Card sx={{ maxWidth: 345 }} className='lightblue'>
    <CardActionArea>
    {allOrders?.car?.model?(
 <CardMedia
 component="img"
 height="90"
 image={allOrders.car.model.image?(allOrders?.car?.model?.image):carsImg}
 alt="green iguana"
/>
    ):(
      <CardMedia
      component="img"
      height="140"
      image={carsImg}
      alt="green iguana"
    />
    )} 
       
        <CardContent className='pb-0 pt-0 mb-0' >
        <h5 style={{fontSize:'14px'}} className='mb-3 text-center pt-1 red-t'>Basic Service</h5>
        <Box sx={{display:'flex', justifyContent:'space-around'}}>
          <Typography gutterBottom variant="h5" component="div">
          <div>        
            <p className='fw-bold m-0 p-0'>Booking Date</p>
            <p className='mt-1'>{allOrders?.order_date}</p>
            </div>

         {!(allOrders.order_stage===8 || allOrders.order_stage===7) && <div className='p-0 m-0'>
            {/* <p className='fw-bold m-0'>pickup date</p>
            <p className='mt-1 mb-0 pb-0'>{allOrders?.order_pickup_date}</p> */}
            </div>}   
          </Typography>
       {!(allOrders.order_stage===8 || allOrders.order_stage===7) && <Typography variant="body" color="text.secondary">
          
          {/* <h5 className='mb-3'>Booking ID : 3939393939;</h5> */}
          <p className='m-0 fw-bold'>Estimated Completion</p>
          <p className='m-1'>{allOrders?.order_delivery_date}</p>
          {/* <p>18:00: 18:30</p> */}       
     
</Typography>}   
          </Box>
          <div className='d-flex justify-content-center pb-2'>
       {(allOrders.order_stage===0 || allOrders.order_stage===1)?(<Button onClick={()=>handleCancleOrder(allOrders?.id)} variant='contained' size="small" sx={{backgroundColor:'#DE3820', fontSize:'10px',}}>
           Cancel
        </Button>):(<>
         {(allOrders.order_stage===7)?<Button disabled variant='contained' size="small" sx={{backgroundColor:'#DE3820', fontSize:'10px',}}>
           Order Delivered
        </Button>:<Button disabled variant='contained' size="small" sx={{backgroundColor:'#DE3820', fontSize:'10px',}}>
           Order Cancelled
        </Button>}
        
       </>)}   
          </div>
        </CardContent>
      </CardActionArea>
      {/* <CardActions className='d-flex justify-content-center'>
         
         <Button onClick={()=>handleCancleOrder(allOrders?.id)} variant='contained' size="small" sx={{backgroundColor:'#DE3820', fontSize:'10px',}}>
           Cancel
        </Button>
      

      </CardActions> */}
    </Card>



            </div>
        </>
  )
}

export default OrderCarMobile