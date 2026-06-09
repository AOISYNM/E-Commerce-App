import {useState , useEffect} from 'react'


export default function Start (){

    interface Product{
        id: number;
        category: string;
        name: string;
        description: string;
        price: string; 
        image: string | null;
        created_at: string;
    }

    const [products , setProducts] = useState<Product[]>([]);
    const[loading , setLoading] = useState(true);

    useEffect(() =>{
        const fetchProducts = async ()=>{
            try {
                const resposne = await
                fetch('http://127.0.0.1:8000/api/products/');

                if(!resposne.ok){
                    throw new Error(`status:${resposne.status}`)
                }
                const data = await resposne.json();
                setProducts(data);

            }
            catch(error){
                console.error('Error fetching Message :' , error)
            }
            finally{
                setLoading(false);
            }

        };
        fetchProducts();
    },
[]);



    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-3xl font-bold underline">Product List</h1>
            <div className="container mx-auto px-4 py-8">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <p className="text-gray-800 font-bold">{product.price}</p>
                        <small>{new Date(product.created_at).toLocaleDateString()}</small>
                    </div>
                ))}
            </div>
        </div>
    )
}

