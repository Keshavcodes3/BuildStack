import {createBrowserRouter} from 'react-router-dom'
import Register from '../Features/Auth/Pages/Register'
import Login from '../Features/Auth/Pages/Login'

export const router=createBrowserRouter([
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:'/login',
        element:<Login/>
    }
])