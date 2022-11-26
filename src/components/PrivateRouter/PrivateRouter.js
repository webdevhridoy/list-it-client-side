import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../../context/AuthProvider';
import Loader from '../Loader/Loader';

const PrivateRouter = ({ children }) => {

    const { user, loading } = useContext(authContext);
    const location = useLocation();
    // console.log(user, loading);

    if (loading) {
        return <Loader></Loader>;
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
    } else {
        return children;
    }
};

export default PrivateRouter;