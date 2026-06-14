import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import store from './store/store.js'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,Route,createRoutesFromElements, RouterProvider } from 'react-router'
import {Login,Signup,AddPost,AllPost,EditPost,Post,Home} from './pages/index.js'
import {AuthLayout} from './components/index.js'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element ={<App/>}>
      
      <Route path = '/' element={<Home/>}/>
      
      <Route path='/login' element={
        <AuthLayout authentication={false}>
          <Login/>
        </AuthLayout>
      }
      />

      <Route path='/signup' element={
        <AuthLayout authentication={false}>
          <Signup/>
        </AuthLayout>
      }
      />
      <Route path='/all-posts' element={
        <AuthLayout authentication>
          {" "}
          <AllPost/>
        </AuthLayout>
      }
      />
      <Route path='/add-post' element={
        <AuthLayout authentication>
          {" "}
          <AddPost/>
        </AuthLayout>
      }
      />
      <Route path='/edit-post/:slug' element={
        <AuthLayout authentication>
          {" "}
          <EditPost/>
        </AuthLayout>
      }
      />
      <Route path='/post/:slug' element={
        <AuthLayout authentication={false}>
          <Post/>
        </AuthLayout>
      }
      />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider >
)
