import React from 'react';
import toast from 'react-hot-toast';

const SingleProduct = ({ handleDeleteProduct, product, index }) => {
    console.log(product);
    const { categoryName, condition, description, img, location, originalprice, productname, resaleprice, sellername, utcDate, yearsofuse } = product;

    const handleAdvertise = () => {
        const advertisement = {
            categoryName,
            condition,
            description,
            img,
            location,
            originalprice,
            productname,
            resaleprice,
            sellername,
            utcDate,
            yearsofuse
        };

        fetch('http://localhost:5000/advertisement', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(advertisement)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Advertisement Successfully Added');
                }
            });
    };
    return (
        <tr>
            <th>{index + 1}</th>
            <th><img className='w-auto h-16' src={product.img} alt='' /></th>
            <td>{product.productname}</td>
            <td>${product.resaleprice}</td>
            <td>Available / Sold</td>
            <td>
                <td>
                    <label onClick={handleAdvertise}
                        htmlFor="confirmationModal" className="px-2 py-1 rounded-md text-white bg-rose-500 cursor-pointer">Make Advertisement</label>
                </td>
            </td>
            <td>
                <label onClick={() => handleDeleteProduct(product)}
                    htmlFor="confirmationModal" className="px-2 py-1 rounded-md text-white bg-rose-500 cursor-pointer">Delete</label>
            </td>
        </tr>
    );
};

export default SingleProduct;