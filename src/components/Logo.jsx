import React from 'react'
import logoImage from "./image/8_1sasa11.jpg";

function Logo({width = "100px"}) {
  return (
    <div className='flex flex-wrap justify-baseline items-center'>
      <img
        src={logoImage}
        alt="logo image"
        className="w-30 h-15 object-cover rounded-lg"
      />
    </div>
    
  )
}

export default Logo