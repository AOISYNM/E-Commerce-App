import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import ProductsList from "./pages/ProductsList"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import CartPage from "./pages/CartPage";


function App() {
  

  return (
    <Router>
       <Navbar />
       <div className="pt-16"></div>
    <Routes>
      <Route path="/" element={<ProductsList/>}/>
      <Route path="/products/:id" element = {<ProductDetails/>}  />
      <Route path="/cart" element = {<CartPage/>}  />
    
    
    </Routes>
    </Router>
  )
}

export default App;
