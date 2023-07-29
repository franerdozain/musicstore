import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Wishlist from './pages/wishlist/Wishlist';
import MmNavbar from './components/navbar/Navbar';
import ProductDetails from './pages/productDetails/ProductDetails';
import ProductList from './pages/productList/ProductList';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <Router>
      <MmNavbar />
        <Routes>
          <Route exact path="/" element={Home} />
          <Route path="/cart" element={Cart} />
          <Route path="/wishlist" element={Wishlist} />
          <Route path="/profile" element={Profile} />
          <Route path="/product/:id" element={ProductDetails} />
          <Route path="/categories/:category/subcategory" element={ProductList} />
        </Routes>
      </Router>
  );
}

export default App;