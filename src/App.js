import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import '../src/components/navbar/navbarStyle.css';
import '../src/components/footer/footerStyle.css';
import '../src/pages/home/homeStyle.css';
import '../src/pages/productList/productList.css';
import '../src/components/generalComponents/generalComponents.css';
import Home from './pages/home/Home.js';
import Cart from './pages/cart/Cart';
import Wishlist from './pages/wishlist/Wishlist';
import MmNavbar from './components/navbar/Navbar';
import ProductDetails from './pages/productDetails/ProductDetails';
import ProductList from './pages/productList/ProductList';
import Footer from './components/footer/Footer';
import ResetPassword from './pages/resetPassword/ResetPassword';
import ProfileContainer from './pages/profile/ProfileContainer';

function App() {
  return (
    <Router>
      <MmNavbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<ProfileContainer />} />
        <Route path="/product/:name/:id" element={<ProductDetails />} />
        <Route path="/categories/:category/:subcategory" element={<ProductList />} />
        <Route path='/reset/new-password' element={<ResetPassword />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;