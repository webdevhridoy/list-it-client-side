import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Authentication/Login/Login';
import Signup from '../components/Authentication/Signup/Signup';
import MyOrders from '../components/Dashboard/ForBuyers/MyOrders';
import MyProfile from '../components/Dashboard/ForBuyers/MyProfile';
import WishLists from '../components/Dashboard/ForBuyers/WishLists';
import AddCategory from '../components/Dashboard/ForSellers/AddCategory';
import AddProducts from '../components/Dashboard/ForSellers/AddProducts';
import MyBuyers from '../components/Dashboard/ForSellers/MyBuyers';
import MyProducts from '../components/Dashboard/ForSellers/MyProducts';
import AdminList from '../components/Dashboard/ForUsers/AdminList';
import BuyerList from '../components/Dashboard/ForUsers/BuyerList';
import ReportedItems from '../components/Dashboard/ForUsers/ReportedItems';
import SellersList from '../components/Dashboard/ForUsers/SellersList';
import LeftSideBar from '../components/DashBoardLayout/LeftSideBar';
import CategoryGrid from '../components/pages/Home/Categories/CategoryGrid';
import Home from '../components/pages/Home/Home';
import Main from '../layout/Main';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/categories/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`),
                element: <CategoryGrid></CategoryGrid>
            },

            {
                path: '/dashboard',
                element: <LeftSideBar></LeftSideBar>,
                children: [
                    {
                        path: '/dashboard/listofadmin',
                        element: <AdminList></AdminList>
                    },
                    {
                        path: '/dashboard/listofbuyers',
                        element: <BuyerList></BuyerList>
                    },
                    {
                        path: '/dashboard/listofsellers',
                        element: <SellersList></SellersList>
                    },
                    {
                        path: '/dashboard/reporteditems',
                        element: <ReportedItems></ReportedItems>
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
                        element: <MyBuyers></MyBuyers>
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
                        element: <WishLists></WishLists>
                    }
                ]
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    }
]);
