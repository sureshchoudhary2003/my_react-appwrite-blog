import React from 'react'
import AuthService from '../../appwrite/auth/Auth';
import { useDispatch } from 'react-redux';
import { logoutReducer } from '../../store/authSlice';
import {useNavigate} from 'react-router-dom'
function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onhandleLogout = () => {
        AuthService.logout()
        .then(() => {
            dispatch(logoutReducer());
            navigate('/');
        })
        .catch((error) => {
            console.error('Error during logout in LogoutBtn:', error);
        });
    }  
  return (
    <button 
        className='inline-block px-4 py-2 mr-2 bg-red-500 text-white rounded-2xl hover:bg-red-700 hover:text-white transition-colors duration-300 cursor-pointer'
        onClick={onhandleLogout}
    >logout</button>
  )
}

export default LogoutBtn