import logo from './logo.svg';
import './App.css';
import Checkout from './pages/cardcheckout';


import Pricing from './pages/Pricing'
import { Link } from "react-router-dom";
import { BrowserRouter, Route , Routes} from "react-router-dom";
import AddressForm from './pages/checkout/AddressForm'

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="checkout" element={<Checkout />} />
      <Route path="/" element={ <Pricing />} />
      </Routes>
  </BrowserRouter>
    
      
    
    
  );
}

export default App;
