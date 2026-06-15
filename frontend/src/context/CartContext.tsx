import {createContext, useContext, useEffect, useState ,type  ReactNode} from "react";

interface CartProviderProps {
    children: ReactNode;
}
interface Product {
    id: number;
    name: string;
    price: number;
}

interface CartItem {
    id: number;
    quantity: number;
    [key: string]: any;
}

interface CartContextType {
    cart: CartItem[];
    total: number;
    addToCart: (item: any) => void;
    removeFromCart: (itemId: number) => void;
    clearCart: () => void;
    UpdateQuantity: (itemId: number, quantity: number) => void;
}


const CartContext = createContext<CartContextType>({
    cart: [],
    total: 0 ,
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    UpdateQuantity: () => {},
});

export const CartProvider = ({children}:CartProviderProps) => {

    const [cart, setCart] = useState<CartItem[]>([]);
    const[total, setTotal] = useState(0);
    const apiUrl = import.meta.env.VITE_DJANGO_API_URL


    //Fetch from Backend 

    const fetchCart = async () => {
    try {
        const response = await fetch(`${apiUrl}/cart/`);

        if (!response.ok) {
            throw new Error("Failed to Fetch Cart");
        }

        const data = await response.json();

        console.log("CART API RESPONSE:", data);

        setCart(data.items || []); 
        setTotal(data.total || 0);

    } catch (error) {
        console.error("Error Fetching Cart:", error);
    }
};

    useEffect (() =>{
        fetchCart();
    },
[]);

    // Function to add an item to the cart

   const addToCart = async (product: Product) => {
    try {
        const res = await fetch(`${apiUrl}/cart/add/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ product_id: product }),
        });

        if (!res.ok) throw new Error("Add to cart failed");

        await fetchCart();
    } catch (error) {
        console.error("Error adding product", error);
    }
};
       // Function to remove an item from the cart
    const removeFromCart = async(itemId: number) => {
        try {
             const res = await fetch(`${apiUrl}/cart/remove/`,{
                method :"POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({item_id: itemId}),
                });
                if(!res.ok) throw new Error("Remove failed");
                await fetchCart();
            
        } catch (error) {
            console.error("Error removing product",error);
        }
    };

    // Function to clear the entire cart
    const clearCart = () => {
        setCart([]);
    };

    //Update
    const UpdateQuantity = async (itemId : number,quantity: number) => {
        if (quantity<1){
            await removeFromCart(itemId);
            return;
        }
        try {
            await fetch(`${apiUrl}/cart/update/`,{
                method :"POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({item_id: itemId , quantity}),

            });
            
        } catch (error) {
            console.error("Error updating product",error);
            
        }

       
    }
    return (
        <CartContext.Provider value={{cart,total, addToCart, removeFromCart, clearCart , UpdateQuantity}}>
            {children}
        </CartContext.Provider>   
    );
};

export const useCart = () => useContext(CartContext);


