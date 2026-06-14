import React,{useState,useEffect} from 'react'
import Services from '../appwrite/service/Service'
import {Link} from 'react-router-dom'
function PostCard({
    $id,
    title,
    featuredimageDb,
}) {
  // console.log(featuredimageDb);
  const url = (Services.getfilePreview(featuredimageDb))
  // console.log(url);
  // console.log(typeof url);
    
  return (
    <Link to={`/post/${$id}`} className='block rounded-xl bg-transparent shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-300'>
    {/* <div className='rounded-xl bg-transparent shadow-md border border-gray-200 p-4'> */}
        <div className='mb-4'>
        <img
          src={url}
          // src="https://picsum.photos/400"
          alt={title}
          // loading="lazy"
          className="w-full h-64 object-cover rounded-lg"
          onError={() => console.log("Image failed to load")}
        />
        </div>
        <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
    {/* </div> */}
    </Link>
  )
}

export default PostCard