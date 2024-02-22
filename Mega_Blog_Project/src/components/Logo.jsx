import React from 'react'
import blogicon from '../assets/blog1.jpg'

function Logo({width = '100px'}) {
  return (
     <div>
      <img src={blogicon} alt="blog icon" style={{width:'100px'}} />
     </div>
  )
}

export default Logo