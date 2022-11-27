import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import useTitle from '../../Hook/useTitle';

const WishLists = () => {
    useTitle('Wish List');
    const myWisthList = useLoaderData();
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        myWisthList?.map((product, index) => <tr key={product._id}>
                            <th>{index + 1}</th>
                            <td>
                                <img className='w-auto h-16' src={product.img} alt='' />
                            </td>
                            <td>{product.productname}</td>
                            <td>${product.resaleprice}</td>

                            <td>
                                <Link to={`/dashboard/wishlist/${product._id}`} className='px-2 py-1 rounded-md text-white bg-rose-500'
                                >Pay</Link>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default WishLists;