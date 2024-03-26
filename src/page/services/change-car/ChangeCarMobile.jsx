import { Box, Button, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ChangeCarMobile({userCarDetails}) {
  return (
     <>
      <Card sx={{ display: 'flex', flexDirection: 'row'}} className='card-shadow'>
       <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="90"
        sx={{width:'140px'}}
        image={`${userCarDetails?.model?.image}`}
      />
      <CardContent>
        <Typography gutterBottom variant="body2" sx={{fontSize:'11px', fontWeight:'bold'}} color="text.secondary">
        Brand : {userCarDetails?.brand}
        </Typography>
        <Typography variant="body2" sx={{fontSize:'11px', fontWeight:'bold'}} color="text.secondary">
        Model {userCarDetails?.model?.value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{fontSize:'11px', fontWeight:'bold'}}>
        Year {userCarDetails?.reg_year}
        </Typography>
      
      <CardActions>
       <Button variant="contained" size="small" sx={{backgroundColor:'#DE3820'}}>
       <Link to="/my-cars" className='' style={{fontSize:'8px', color:'white'}}>Change Car </Link>
       </Button>
      </CardActions>

      </CardContent>
      </Box>
    </Card>

     </>
  )
}

export default ChangeCarMobile