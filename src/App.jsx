import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import {Outlet} from 'react-router-dom'
import './App.css'
import AuthService from './appwrite/auth/Auth';
import {loginReducer,logoutReducer} from './store/authSlice';
import store from './store/store';
import {Header,Footer} from './components';
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    AuthService.getCurrentUser()
    .then((user) => {
      if(user) {
        dispatch(loginReducer(user));
      } else {
        dispatch(logoutReducer());
      }
    })
    .catch((error) => {
      console.error('Error fetching user At APP.jsx:', error);
      dispatch(logoutReducer());
    })
    .finally(() => {
      setLoading(false); 
    });  
    
  }, [dispatch]);
  
  //conditional rendering based on loading state
  if(loading) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    );
  }
  else{ // render the main app content when not loading

    return (
      <div className="min-h-screen flex flex-wrap   bg-gray-400 text-black">
        <div className="w-full">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    );
  }
  
}

export default App
