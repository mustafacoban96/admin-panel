import { createBrowserRouter, Navigate } from "react-router";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import GuestLayout from "./components/GuestLayout/GuestLayout";
import Login from "./views/Login/Login";
import NotFound from "./views/NotFound/NotFound";
import Register from "./views/Register/Register";
import Dashboard from "./views/DashBoard/Dashboard";
import Home from "./views/Home/Home";





const router = createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to='/home'/>
            },
            {
                path:'dashboard',
                element:<Dashboard/>
            },
            {
                path:'home',
                element:<Home/>
            }
        ]
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children:[
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'register',
                element:<Register/>
            }

        ]
    },
    {
        path:"*",
        element:<NotFound/>
    }
    
]);

export default router