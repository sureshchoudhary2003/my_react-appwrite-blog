import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
function Protected({
    children,
    authentication = true
}) {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status_redux);

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate('/login');
        }
        // else if(!authentication && authStatus !== authentication){
        //     navigate('/');
        // }
        setLoading(false);

    },[authStatus,authentication,navigate])
  
    
    return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected