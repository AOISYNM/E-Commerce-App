import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function ProductsList() {
    interface Product {
        id: number;
        category: string;
        name: string;
        description: string;
        price: string;
        image: string | null;
        created_at: string;
    }

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const apiUrl = import.meta.env.VITE_DJANGO_API_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${apiUrl}/products/`);
                
                if (!response.ok) {
                    throw new Error(`status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching Message:', error);
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-3xl font-bold py-6 bg-white text-center shadow-md">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 container mx-auto">
                {products.length > 0 ? (
                    products.map(product => (
                <ProductCard key={product.id} product={product} />
            )) ) : (
                <div className="col-span-full text-center text-gray-500">No products available.</div>
            )}
            </div>
        </div>
    );
}

export default ProductsList;

