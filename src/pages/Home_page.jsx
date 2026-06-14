import React,{useEffect,useState} from 'react'
import Services from '../appwrite/service/Service'
import {Container,PostCard} from '../components/index'

function Home_page() {
    const [posts,setPosts] = useState([]);
    //
    useEffect(() =>{
        Services.getPosts()
        .then((res) =>{
            // console.log("postCard: res: posts: ",res, " res documents: ",res.documents)
            if(res){
                setPosts(res.documents);
            }
            else{
                console.log("home_page: posts not found")
            }
        })
        .catch((error) =>{
            console.log("home_page: error:",error);
        })
    },[]);
    //
  if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard
                            $id={post.$id}
                            title={post.title}
                            featuredimageDb = {post.featuredimageDb}
                        />
                            {/* {post.$id}
                            <br />
                            {post.featuredimageDb} */}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home_page