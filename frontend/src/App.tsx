import ProductDetails from "./pages/ProductDetails";
import ProductsList from "./pages/ProductsList"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"


function App() {
  

  return (
    <Router>
    <Routes>

      <Route path="/" element={<ProductsList/>}/>
      <Route path="/products/:id" element = {<ProductDetails/>}  />
    
    
    </Routes>
    </Router>
  )
}

export default App;
