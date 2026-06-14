import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Logo, Container,LogoutBtn } from '../index'
function Header() {
    const navigate = useNavigate();

    const  authStatus = useSelector((state) => state.auth.status_redux);;
    
    // console.log("status redux at header: ",authStatus , " ", typeof authStatus);
    const navItems = [
        {
            name: 'Home',
            path: '/',
            active: true,
            className:""
        },
        {
            name: 'All Posts',
            path: '/all-posts',
            active: authStatus, // only show if authenticated
            className:""
        },
        {
            name: 'Add Post',
            path: '/add-post',
            active: authStatus, // only show if authenticated
            className:""

        },

        {
            name: 'Login',
            path: '/login',
            active: !authStatus, // only show if not authenticated
            className:"inline-block px-4 py-2 bg-green-500 text-black rounded-2xl hover:bg-green-700 transition-colors duration-300 cursor-pointer"
        },
        {
            name: 'Register',
            path: '/signup',
            active: !authStatus, // only show if not authenticated
            className:"inline-block px-4 py-2 bg-green-500 text-black rounded-2xl hover:bg-green-700 transition-colors duration-300 cursor-pointer"
        },

    ];
    //
    const onLogoutClick = ()=>{
        navigate('/');

    }
    //
    return (
        <>
            <header className="bg-gray-400 border-b-2 border-b-black">
                <Container >
                  <div className='flex flex-row justify-between '>
                    <div className="flex flex-wrap items-center justify-between py-4 ">
                            <Logo width="120px" />
                    </div>
                    <div className="flex flex-wrap items-center justify-center space-x-4 gap-4">
                        <ul className="w-full flex flex-wrap gap-10 space-x-5 justify-end items-center text-xl">
                            {navItems.map((item) => (
                                item.active && (
                                    <li key={item.name}
                                    onClick={() => navigate(`/${item.path}`)} className={`${item.className}`}>{item.name} </li>
                                )
                            ))}
                           
                        </ul>
                    </div>
                    {authStatus && (<div className="flex flex-wrap items-center justify-center">
                                <LogoutBtn/>
                    </div> )}
                  </div>
                </Container>
            </header>
        </>
    )
}

export default Header