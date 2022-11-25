import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader';

const MyProducts = () => {

    const { data: response = [], refetch, isLoading } = useQuery({
        queryKey: ['response'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products');
            const data = await res.json();
            return data;
        }

    });

    // const [response, setResponse] = useState(null);

    // const fetchQuotes = async () => {
    //     try {
    //         const res = await axios.get('http://localhost:5000/products', {
    //             headers: {
    //             },
    //             params: {},
    //         });
    //         setResponse(res.data);

    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     fetchQuotes();
    // }, []);

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
                            <th>Title</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Advertise</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            response?.map((product, index) => <tr key={product._id}>
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
                                    <label onClick={() => handleDeleteProduct(product)}
                                        htmlFor="confirmationModal" className="px-2 py-1 rounded-md text-white bg-rose-500 cursor-pointer">Delete</label>
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