import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MyProducts = () => {
    const [response, setResponse] = useState(null);

    const fetchQuotes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/products', {
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
                            <th>Title</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Advertise</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            response?.map((product, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{product.productname}</td>
                                <td>${product.resaleprice}</td>
                                <td>Available / Sold</td>
                                <td>
                                    <td>
                                        <label htmlFor="confirmationModal" className="px-2 py-1 rounded-md text-white bg-rose-500 cursor-pointer">Make Advertisement</label>
                                    </td>
                                </td>
                                <td>
                                    <label htmlFor="confirmationModal" className="px-2 py-1 rounded-md text-white bg-rose-500 cursor-pointer">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;