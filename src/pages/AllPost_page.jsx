import React,{useState,useEffect} from 'react'
import {Container,PostCard} from '../components/index'
import Services from '../appwrite/service/Service'
function AllPost_page() {

    const [posts,SetPosts] = useState([]);
    //
    useEffect(() =>{
        Services.getPosts([])
        .then((res) =>{
            //res: all posts with queries
            if(res){
                // console.log("posts in allpost_pages: posts.documents : ",res.documents);
                SetPosts(res.documents);
            }
        })
    },[]);
    //
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts ? posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard
                                {...post}
                        />
                    </div>
                    
                )) :<div> not posts are there ... </div>}
            </div>
        </Container>
    </div>
  )
}

export default AllPost_page