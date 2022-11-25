import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard/Dashboard';

const LeftSideBar = () => {
    return (
        <div className='flex flex-col lg:flex-row'  >
            <aside className='md:h-screen lg:sticky lg:top-0'>
                <Dashboard></Dashboard>
            </aside>
            <main className='mt-10 md:w-3/4 mx-auto'>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default LeftSideBar;