
import React from 'react'
import { Carousel } from 'react-bootstrap'

function CaroselBanner({banners}) {
  return (
    <>
        <Carousel indicators={false} fade controls={false}>
         {banners.map((val)=>(
            <Carousel.Item key={val?.id}>
        <img src={val?.image} style={{maxHeight:'400px', width:'100%', objectFit:'cover'}} className='' alt="" />     
      </Carousel.Item>  
         ))}
    </Carousel>
    </>
  )
}

export default CaroselBanner