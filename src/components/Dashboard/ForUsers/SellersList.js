import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const SellersList = () => {
    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['seller'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/seller');
            const data = await res.json();
            return data;
        }
    });

    const handleUserDelete = (seller) => {
        fetch(`http://localhost:5000/users/${seller._id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('Access-Token')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                refetch();
                if (data.deletedCount) {
                    toast.success('Seller is deleted');
                }
            });
    };

    if (isLoading) {
        return <Loader></Loader>;
    }
    return (
        <div>
            <h2>Sellers List {sellers.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sellers.map((seller, index) => <tr key={seller._id}>
                                <th>{index + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>{seller.role}</td>
                                <td>
                                    <Link onClick={() => handleUserDelete(seller)}
                                        className='px-2 py-1 rounded-md text-white bg-rose-500'>Delete</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellersList;