import React, { useEffect, useState } from 'react';
import axios from 'axios';


const MyOrders = () => {
    const [response, setResponse] = useState(null);

    const fetchQuotes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/bookings', {
                headers: {
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
        <div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Product Name</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            response?.map((book, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{book.productname}</td>
                                <td>{book.yourname}</td>
                                <td>${book.productprice}</td>
                                <td>{book.mobile}</td>
                                <td>{book.location}</td>
                                <td>
                                    <label htmlFor="confirmationModal" className="px-2 py-1 rounded-md text-white bg-rose-500 cursor-pointer">Pay</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;