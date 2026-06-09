interface Product {
    id: number;
    category: string;
    name: string;
    description: string;
    price: string;
    image: string | null;
    created_at: string;
}

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) { 
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">

            {product.image ? (
                <img 
                    src={`${BASE_URL}${product.image}`} 
                    alt={product.name} 
                    className="w-full h-48 object-cover rounded-md mb-4" 
                />
            ) : (
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                </div>
            )}
            
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-bold text-green-600">${product.price}</p>
        </div>
    );
}

export default ProductCard;