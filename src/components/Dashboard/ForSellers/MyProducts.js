import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader';
import SingleProduct from './SingleProduct';

const MyProducts = () => {

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products');
            const data = await res.json();
            return data;
        }

    });

    const handleDeleteProduct = product => {
        console.log(product);

        fetch(`http://localhost:5000/allproducts/${product._id}`, {
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
                    toast.success('Product is deleted');
                }
            });
    };

    if (isLoading) {
        return <Loader></Loader>;
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Advertise</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products?.map((product, index) =>
                                <SingleProduct
                                    key={product._id}
                                    product={product}
                                    index={index}
                                    handleDeleteProduct={handleDeleteProduct}
                                >

                                </SingleProduct>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;