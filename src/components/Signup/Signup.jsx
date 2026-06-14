import React,{useState} from 'react'
import AuthService from '../../appwrite/auth/Auth';
import {loginReducer as AuthLogin} from '../../store/authSlice';
import {useDispatch} from 'react-redux';
import {Input,Button,Logo} from '../index'
import {useForm} from 'react-hook-form'
import {useNavigate,Link} from 'react-router-dom'
function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error,setError] = useState("");
        //register for state handle authmetic like: email make state , 
        // //give value to input , onchange (e.target.value) that all avoid
    const {register,handleSubmit} = useForm();

    const signup_submitHandling = async(data) =>{

        setError("");

        console.log("Signup_component output: ",data);

        try {
            const session = await AuthService.createAcount(data);
            // console.log("session: ",session)
            if(session){
                const userData = await AuthService.getCurrentUser();
                if(userData){
                    dispatch(AuthLogin(userData));
                    navigate('/');
                }
            }
        } 
        catch (error) {
            setError(error.Message);
        }
    }
  return (
    <div
    className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
    >
        <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>
        <h2
        className="text-center text-2xl font-bold leading-tight"
        >
            create  your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Already having a acount?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
        </p>
        {error && <p
            className="text-red-600 mt-8 text-center"
        >{error}</p>}
        <form onSubmit={handleSubmit(signup_submitHandling)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                    label = "Name: "
                    type = "text"
                    placeholder= 'Enter Your Name'
                    {...register("name",{required:true})}
                />
                <Input
                    label = "Email: "
                    type = "email"
                    placeholder= 'Enter Email'
                    {...register("email",{
                        required: true,
                        validate:{
                            // regexp
                            matchPattern: (value)=> /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/
                            .test(value) ||
                            "Email address must be a valid address",
                        }
                    })}

                />
                <Input 
                    label = "password: "
                    type = "password"
                    placeholder="Enter your password"
                    {...register("password",{
                        required:true,
                        validate:{
                            matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
                            .test(value) ||
                            "password must contain 8 character, 1 uppercase,1 lowercase,1 number , can contain specail chacters",

                        }
                    })}
                />
                <Button type='submit' className='w-full cursor-pointer'>Sign In</Button>
            </div>
        </form>
    </div>
  )
}

export default Signup