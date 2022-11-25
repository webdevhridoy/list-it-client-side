
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryProductDetails from './CategoryProductDetails';

const CategoryGrid = () => {
    const allProducts = useLoaderData();
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {
                    allProducts.map(product =>
                        <CategoryProductDetails
                            key={product._id}
                            product={product}
                        >

                        </CategoryProductDetails>
                    )
                }
            </div>
        </div>
    );
};

export default CategoryGrid;