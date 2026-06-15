import {useCart} from '../context/CartContext';
import { Link } from 'react-router-dom';


function Navbar(){
    const {cart} = useCart();

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);



    return(
        <nav className='bg-white shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50' >
            <div className='text-2xl font-bold text-gray-800'>
                <Link to="/">EcomApp</Link>
            </div>
            <div className='flex items-center space-x-4'>
                <Link to="/cart" className='relative text-gray-800 hover:text-gray-600'>Cart
                {cartCount > 0 && (
                    <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
                        {cartCount}
                    </span>
                )}  
                </Link>
            </div>
        </nav>
      )
}

export default Navbar;