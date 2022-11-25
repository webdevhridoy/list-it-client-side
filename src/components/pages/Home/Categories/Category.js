import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { categoryname, img, _id } = category;
    return (
        <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure><img src={img} alt="phones" /></figure>
            <div className="card-body">
                <h2 className='card-title justify-center'>{categoryname}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-center">
                    <Link to={`/categories/${_id}`}>
                        <button className="btn btn-sm btn-primary">View Products</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Category;