import { createBrowserRouter, Navigate } from "react-router";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import GuestLayout from "./components/GuestLayout/GuestLayout";
import Login from "./views/Login/Login";
import NotFound from "./views/NotFound/NotFound";
import Register from "./views/Register/Register";
import ProductList from "./views/Product/ProductList";
import Settings from "./views/Settings/Settings"
import Dashboard from "./views/Home/Dashboard";
import ProductDetail from "./views/Product/ProductDetail";
import AddProduct from "./views/Product/AddProduct";
import Modal from "./components/Modals/Modal";
import Test from "./views/Test/Test";


const router = createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
           
            {
                path:'products',
                element:<ProductList/>
            },
            {
                path:'home',
                element:<Dashboard/>
            },
            {
                path:'settings',
                element:<Settings/>
            },
            {
                path:"/product/:productId",
                element:<ProductDetail/>
            },
            {
                path:"/product/add",
                element:<AddProduct/>
            },
            {
                path:'/test',
                element:<Test/>
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