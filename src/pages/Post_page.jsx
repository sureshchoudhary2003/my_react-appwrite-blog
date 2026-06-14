import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Services from '../appwrite/service/Service';
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.user);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    //
    console.log("slug in post :",slug);
    useEffect(() => {
        if (slug) {
            Services.getPost(slug)
            .then((post) => {
                console.log("post in post/slug: ",post)
                if (post) {
                    setPost(post);
                    console.log(" isAuthor: ",isAuthor); 
                }   
                else {
                    console.log("Post not found!");
                    navigate("/");
                }
                  
            });
        } 
        else {
            console.log("Slug missing!");
            navigate("/");
        }
            
    }, [slug,navigate]);
    //
    const deletePost = () => {
        Services.deletePost(post.$id)
        .then((status) => {
            if (status) {
                Services.fileDelete(post.featuredimageDb);
                navigate("/");
            }
            else{
                console.log("post-pages: post not deleted");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {post.featuredimageDb && (
                        <img
                            src={Services.getfilePreview(post.featuredimageDb)}
                            alt={post.title}
                            className="rounded-xl"
                        />
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {post?.content ? parse(post.content) : null}
                </div>
            </Container>
        </div>
    ) : null;
}