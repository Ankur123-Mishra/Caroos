import React from 'react'
import loaderImg from './asets/loader.gif'

const Loader = () => {
  return (
    <div className="loader-budget">
        <img src="images/loader.png"  alt='loading...'  />
        <img src={loaderImg }  alt='loading...'  />
       
    </div>
  )
}

export default Loader