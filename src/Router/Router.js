import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Authentication/Login/Login';
import Signup from '../components/Authentication/Signup/Signup';
import HomeDashboard from '../components/Dashboard/Dashboard/HomeDashboard';
import MyOrders from '../components/Dashboard/ForBuyers/MyOrders';
import MyProfile from '../components/Dashboard/ForBuyers/MyProfile';
import WishLists from '../components/Dashboard/ForBuyers/WishLists';
import WishPayment from '../components/Dashboard/ForBuyers/WishPayment';
import AddCategory from '../components/Dashboard/ForSellers/AddCategory';
import AddProducts from '../components/Dashboard/ForSellers/AddProducts';
import MyBuyers from '../components/Dashboard/ForSellers/MyBuyers';
import MyProducts from '../components/Dashboard/ForSellers/MyProducts';
import AdminList from '../components/Dashboard/ForUsers/AdminList';
import BuyerList from '../components/Dashboard/ForUsers/BuyerList';
import SellersList from '../components/Dashboard/ForUsers/SellersList';
import LeftSideBar from '../components/DashBoardLayout/LeftSideBar';
import Blog from '../components/pages/Blog/Blog';
import CategoryGrid from '../components/pages/Home/Categories/CategoryGrid';
import Home from '../components/pages/Home/Home';
import Payment from '../components/pages/Payment/Payment';
import AdminRouter from '../components/PrivateRouter/AdminRouter';
import PrivateRouter from '../components/PrivateRouter/PrivateRouter';
import ErrorPage from '../components/shared/ErrorPage/ErrorPage';
import Main from '../layout/Main';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/categories/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`),
                element: <PrivateRouter><CategoryGrid></CategoryGrid></PrivateRouter>
            },

            {
                path: '/dashboard',
                element: <PrivateRouter><LeftSideBar></LeftSideBar></PrivateRouter>,
                children: [
                    {
                        path: '/dashboard/',
                        element: <HomeDashboard></HomeDashboard>
                    },
                    {
                        path: '/dashboard/listofadmin',
                        element: <AdminRouter><AdminList></AdminList></AdminRouter>
                    },
                    {
                        path: '/dashboard/listofbuyers',
                        element: <AdminRouter><BuyerList></BuyerList></AdminRouter>
                    },
                    {
                        path: '/dashboard/listofsellers',
                        element: <AdminRouter><SellersList></SellersList></AdminRouter>
                    },
                    {
                        path: '/dashboard/addcategory',
                        element: <AddCategory></AddCategory>
                    },
                    {
                        path: '/dashboard/addproduct',
                        loader: () => fetch('http://localhost:5000/categories'),
                        element: <AddProducts></AddProducts>
                    },
                    {
                        path: '/dashboard/myproducts',
                        element: <MyProducts></MyProducts>
                    },
                    {
                        path: '/dashboard/mybuyers',
                        element: <MyBuyers></MyBuyers>,
                    },
                    {
                        path: '/dashboard/myorders',
                        element: <MyOrders></MyOrders>
                    },
                    {
                        path: '/dashboard/myprofile',
                        element: <MyProfile></MyProfile>
                    },
                    {
                        path: '/dashboard/wishlist',
                        loader: () => fetch('http://localhost:5000/wishlist'),
                        element: <WishLists></WishLists>
                    },
                    {
                        path: '/dashboard/payments/:id',
                        loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`),
                        element: <Payment></Payment>
                    },
                    {
                        path: '/dashboard/payment/:id',
                        loader: ({ params }) => fetch(`http://localhost:5000/wishlist/${params.id}`),
                        element: <WishPayment></WishPayment>
                    },
                ]
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            }
        ]
    }
]);
