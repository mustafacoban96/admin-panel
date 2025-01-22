import { createBrowserRouter, Navigate } from "react-router";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import GuestLayout from "./components/GuestLayout/GuestLayout";
import Login from "./views/Login/Login";
import NotFound from "./views/NotFound/NotFound";
import Register from "./views/Register/Register";
import Product from "./views/Product/Product";
import Home from "./views/Home/Home";
import HomeTest from "./views/Home/HomeTest";
import Settings from "./views/Settings/Settings"





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
                path:'product',
                element:<Product/>
            },
            {
                path:'home',
                element:<HomeTest/>
            },
            {
                path:'settings',
                element:<Settings/>
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