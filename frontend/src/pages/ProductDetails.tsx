import { useEffect , useState } from "react";
import { useParams , useNavigate } from "react-router-dom";

interface Product {
    id: number;
    category: string;
    name: string;
    description: string;
    price: string;
    image: string | null;
    created_at: string;
}

function ProductDetails() {
    const apiUrl = import.meta.env.VITE_DJANGO_API_URL;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const {id} = useParams();
    const navigate = useNavigate();
    const [product , setProduct] = useState<Product | null>(null);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState<string | null>(null);


    useEffect(()=>{
        const fetchProduct = async () =>{
            try {
                const response =  await fetch(`${apiUrl}/products/${id}/`);
                if(!response.ok){
                    throw new Error(`status : ${response.status}`);
                }
                const data = await response.json();
                setProduct(data)
                setError(null)
            }
            catch(error){
                setError(error instanceof Error? error.message : "An Error Occured");
            }
            finally{
                setLoading(false);
            }
        };
        fetchProduct();
    }

    ,[id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Product not found.</div>;


    return(
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <div className="container mx-auto p-6 max-w-3xl">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-blue-600 hover:underline"
                >
                     Back to Products
                </button>

                {product.image ? (
                    <img
                        src={`${BASE_URL}${product.image}`}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-lg shadow-md mb-6"
                    />
                ) : (
                    <div className="w-full h-96 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                    </div>
                )}

                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-500 text-sm mb-4">Category: {product.category}</p>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <p className="text-2xl font-bold text-green-600">${product.price}</p>
            </div>
        </div>
    );
}

export default ProductDetails;  