import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import './App.css';
import '../src/components/navbar/navbarStyle.css';
import '../src/components/footer/footerStyle.css';
import '../src/pages/home/homeStyle.css';
import '../src/pages/productList/productList.css';
import '../src/components/generalComponents/generalComponents.css';
import '../src/pages/productDetails/productDetails.css'
import Home from './pages/home/Home.js';
import Cart from './pages/cart/Cart';
import Wishlist from './pages/wishlist/Wishlist';
import MmNavbar from './components/navbar/Navbar';
import ProductDetails from './pages/productDetails/ProductDetails';
import ProductList from './pages/productList/ProductList';
import Footer from './components/footer/Footer';
import NewPassword from './pages/newPassword/NewPassword';
import ProfileContainer from './pages/profile/ProfileContainer';
import { checkUserStatus } from './services/api';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { userStatus, setUserStatus } = useAuth();

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await checkUserStatus();        
        setUserStatus({
          isAuthenticated: response.isAuthenticated,
          user: response.user
        });
      } catch (error) {
        console.log(error)
      }
    }
    fetchStatus()
  }, [])

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
        <Route path="/categories/:category/:subcategory/:id" element={<ProductList />} />
        <Route path='/reset/new-password' element={<NewPassword />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;