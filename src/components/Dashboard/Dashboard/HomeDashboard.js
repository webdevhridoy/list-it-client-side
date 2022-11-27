import React from 'react';
import useTitle from '../../Hook/useTitle';

const HomeDashboard = () => {
    useTitle('Dashboard');
    return (
        <div>
            <h2 className='text-5xl'>Welcome to your dashboard</h2>
        </div>
    );
};

export default HomeDashboard;