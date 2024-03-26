import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'


function RemoveCardMobile({val, userToken, removeCart}) {
  return (
      <>
        <Card key={val?.cart_id} sx={{ display: 'flex', width:'100%', flexDirection: 'row', height:'140px' }} className='card-shadow'>
       
       <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="90"
        sx={{width:'140px', height:'140px'}}
        image={`${val?.product?.images}`}
      />
      <CardContent sx={{padding:'10px'}}>
        <Typography gutterBottom variant="h4" sx={{fontSize:'14px', fontWeight:'bold'}} color="text.secondary">
           {val?.product?.name}
        </Typography>
        <Typography variant="body2" sx={{fontSize:'11px', fontWeight:'bold'}} color="text.secondary">
        <p className='service-info' dangerouslySetInnerHTML={{ __html:val?.product?.description}} />
        </Typography>  

           
    <Button onClick={()=>removeCart(val?.product?.product_id, userToken)} className='' variant="contained" size="small" sx={{backgroundColor:'#DE3820', fontSize:'9px'}}>
           Remove
       </Button>
               
      
      

      </CardContent>
      </Box>
    </Card>
      </>
     
    )
}

export default RemoveCardMobile