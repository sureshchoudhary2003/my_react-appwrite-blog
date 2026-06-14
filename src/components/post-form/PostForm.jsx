import React, { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Services from '../../appwrite/service/Service'
import { Authservice } from '../../appwrite/auth/Auth'
import {Input,RTE,Select,Button} from '../index'
function PostForm({ post = null }) {
    // console.log(post);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.user);
    //watch:continues watching or monitoring input field
    const { handleSubmit, register
        , watch, setValue, getValues, control } = useForm({
            defaultValues: {
                title: post?.title || '',
                slug: post?.slug || '',
                content: post?.content || '',
                featuredimageDb: post?.featuredimageDb || '',
                status: post?.status || 'active',
            },
        });
    //
    const submit = async (data) => {
        console.log("data at postform: ",data);
        if (post) {
            const file = data.image[0] ? await Services.fileUpload(data.image[0]) : null;
            if (file) {
           
                await Services.fileDelete(post.featuredimageDb);
            }
            console.log("in postform: submit function: file not present");
            const dbpost = await Services.updatePost(post.$id, {
                ...data,
                featuredimageDb: file ? file.$id : undefined,
            })
            if (dbpost) {
                navigate(`/`)
            }
        }
        else {
            const file = await Services.fileUpload(data.image[0]);
            console.log("file :",file)
            if (file) {
                const fileId = file.$id;
                data.featuredimageDb = fileId;
                // console.log("fileId at postform: ",data.featuredimageDb)
                const dbpost = await Services.createPost({
                    title: data?.title || '',
                    slug: data?.slug || '',
                    content: data?.content || '',
                    featuredimageDb: data?.featuredimageDb || '',
                    status: data?.status || 'active',
                    userId: userData.$id,
                })

                if (dbpost) {
                    // TODO: navigate change
                    // navigate(`/post/${data.slug}`)
                    navigate('/')
                }
            }
        }
    }

    //
    const slugTransform = useCallback((value) => {

        if (value && typeof(value) === "string") {
            
            const slug = value
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .slice(0, 36);
            // console.log("slug in postform: ", slug);
            return slug;
        }
        return ""
    }, [])

    //
    useEffect(() => {
        
        const subscription = watch((value,{name})=>{
            if(name == 'title'){
              
                setValue(
                    "slug",
                    slugTransform(value.title),
                    { shouldValidate: true }
                )
            }
                
        })
        return () =>{
            subscription.unsubscribe();
        }
    }, [watch,slugTransform,setValue])

    //ui start
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug",{ required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.
                            currentTarget.value),
                            { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={Services.getfilePreview(post.featuredimageDb)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 border bg-gray-50"
                    defaultValue={getValues("status")}
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-yellow-400"} className="w-full cursor-pointer">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm