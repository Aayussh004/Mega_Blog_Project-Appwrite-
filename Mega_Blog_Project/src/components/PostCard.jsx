import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

// website me ek postcard bhi to hai to whi render krwana h

function PostCard({$id, title, featuredImage}) {//appwrite ka syntax h $id likhne ka
    
  return (
    <Link to={`/post/${$id}`}>
        {/* card clickable hona chahiye isiliye Link tag use kiya */}
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard