import './App.css';
import '../src/components/navbar/navbarStyle.css'
import '../src/components/footer/footerStyle.css'
import '../src/pages/home/homeStyle.css'
import '../src/pages/productList/productList.css'
import '../src/components/generalComponents/generalComponents.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.js';
import Cart from './pages/cart/Cart';
import Wishlist from './pages/wishlist/Wishlist';
import MmNavbar from './components/navbar/Navbar';
import ProductDetails from './pages/productDetails/ProductDetails';
import ProductList from './pages/productList/ProductList';
import Profile from './pages/profile/Profile';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Router>
      <MmNavbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/categories/:category/:subcategory" element={<ProductList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;