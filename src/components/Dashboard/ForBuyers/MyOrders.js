import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { authContext } from '../../../context/AuthProvider';
import useTitle from '../../Hook/useTitle';


const MyOrders = () => {
    useTitle('My Orders');
    const { user } = useContext(authContext);
    // console.log(user);
    const [response, setResponse] = useState(null);

    const fetchQuotes = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('listit-classified')}`
                },
                params: {},
            });
            setResponse(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    console.log(response);

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        response?.map((book, index) => <tr>
                            <th>{index + 1}</th>
                            <td>
                                <img className='w-12' src={book.img} alt="" />
                            </td>
                            <td>{book.productname}</td>
                            <td>{book.yourname}</td>
                            <td>${book.productprice}</td>
                            <td>{book.mobile}</td>
                            <td>
                                {
                                    book.productprice && !book.paid &&
                                    <Link to={`/dashboard/payments/${book._id}`} className='px-2 py-1 rounded-md text-white bg-rose-500'
                                    >Pay</Link>
                                }
                                {
                                    book.productprice && book.paid &&
                                    <p className='px-2 py-1 rounded-md text-white bg-rose-500 disabled'>Paid</p>
                                }

                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>

    );
};

export default MyOrders;