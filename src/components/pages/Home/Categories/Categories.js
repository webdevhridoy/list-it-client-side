import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Category from './Category';

const Categories = () => {
    const { data: categories = [] } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = await res.json();
            return data;
        }

    });
    return (
        <div className='my-12'>
            <h1 className="mb-5 text-5xl font-bold">Our Categories</h1>
            <div className='flex justify-center flex-col md:flex-row  items-center gap-10'>
                {
                    categories.map(category =>
                        <Category
                            key={category._id}
                            category={category}
                        >
                        </Category>
                    )
                }
            </div>
        </div>
    );
};

export default Categories;