import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddProducts = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = res.json();
            return data;
        }
    });

    if (isLoading) {
        return <div className='flex h-screen justify-center items-center' role="status">
            <svg className="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>;
    }






    const current = new Date();
    const utcDate = new Date(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate(), current.getUTCHours(), current.getUTCMinutes(), current.getUTCSeconds(), current.getUTCMilliseconds());

    const handleSignIn = (data) => {
        console.log(data);
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = 'https://api.imgbb.com/1/upload?key=a6f9b9970dcebe796e264ecdc5083f85';
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {
                    console.log(imgData.data.url);


                    const products = {
                        sellername: data.sellername,
                        productname: data.productname,
                        categoryId: data.category,
                        condition: data.condition,
                        description: data.description,
                        location: data.location,
                        mobile: data.mobile,
                        originalprice: data.originalprice,
                        resaleprice: data.resaleprice,
                        yearsofuse: data.yearsofuse,
                        img: imgData.data.url,
                        utcDate,
                        categoryName: categories.find(cat => cat._id === data.category)['categoryname']
                    };

                    console.log(products);

                    // save information to the database;

                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(products)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            navigate('/dashboard/myproducts');
                            Swal.fire({
                                text: 'Product added succssfully'
                            });
                        });

                }
            });


    };
    return (
        <div >
            <form onSubmit={handleSubmit(handleSignIn)} novalidate="" action="" className="flex flex-col w-full  p-12 rounded shadow-lg ng-untouched ng-pristine ng-valid  bg-black text-white">

                <label for="password" className="self-start mt-3 text-xs font-semibold">Seller Name</label>
                <input {...register('sellername', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />


                <label for="username" className="self-start text-xs font-semibold"> Product Name</label>
                <input {...register('productname', { required: 'Field is required' })} className="flex items-center text-black h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2" />

                <label for="password" className="self-start mt-3 text-xs font-semibold">Mobile Number</label>
                <input {...register('mobile', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />

                <label for="password" className="self-start mt-3 text-xs font-semibold">Location</label>
                <input {...register('location', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />

                <label for="password" className="self-start mt-3 text-xs font-semibold">Resale Price</label>
                <input {...register('resaleprice', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />

                <label for="password" className="self-start mt-3 text-xs font-semibold">Original Price</label>
                <input {...register('originalprice', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />

                <label for="password" className="self-start mt-3 text-xs font-semibold">Years of Use</label>
                <input {...register('yearsofuse', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />

                <label for="password" className="self-start mt-3 text-xsfont-semibold">Category</label>
                <select className='mt-5 py-2 text-black' {...register('category', { required: 'Field is required' })}>

                    {
                        categories.map(categories =>

                            <option className='text-black'

                                key={categories._id}
                                value={categories._id}
                            > {categories.categoryname}</option>
                        )
                    }


                </select>

                <label for="password" className="self-start mt-3 text-xsfont-semibold">Condition</label>
                <select className='mt-5 py-2 text-black' {...register('condition', { required: 'Field is required' })}>
                    <option className='text-black' > Excellent</option>
                    <option className='text-black' > Good</option>
                    <option className='text-black' > Fair</option>
                </select>

                <label className="label"> <span className="label-text text-white">Photo</span></label>
                <input type="file" {...register("img", {
                    required: 'Photo is required'
                })} className="input input-bordered w-full max-w-xs text-black" />

                <label for="password" className="self-start mt-3 text-xs font-semibold">Description</label>
                <input {...register('description', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />


                <button type="submit" className="flex items-center justify-center bg-white text-black mt-5 h-12 ">Add Now</button>


            </form>

        </div>
    );
};

export default AddProducts;