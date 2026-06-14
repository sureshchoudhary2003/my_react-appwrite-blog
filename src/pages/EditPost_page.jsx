import React,{useState,useEffect} from 'react'
import {Container,PostForm} from '../components/index'
import Services from '../appwrite/service/Service'
import { useParams ,useNavigate} from 'react-router-dom';

function EditPost_page() {
    const [post,setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    //
    useEffect(() =>{
        Services.getPost(slug)
        .then((res) =>{
            if(res){
                setPost(res);
            }
            else{
                console.log("EditPost_pages : post not found "); 
            }
          
        })
        .catch((error) =>{
            console.log("EditPost_pages : error: ",error);  
            throw error;
        })
    },[navigate,slug])
    //
    return (post)?(<>
            <div className='py-8'>
                <Container>
                    <PostForm post = {post}/>
                </Container>
            </div>
    </>):(<h3>post not found in Editing ...</h3>);
}

export default EditPost_page