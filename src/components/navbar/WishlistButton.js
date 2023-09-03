import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa6';

const WishlistButton = () => {
    const navigate = useNavigate();
    const handleWishlistClick = () => {
        navigate("/wishlist");
    }
    return (
        <>
            <FaHeart role='button' onClick={handleWishlistClick} />
        </>
    )
}
export default WishlistButton;