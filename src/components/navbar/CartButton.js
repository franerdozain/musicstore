import { useNavigate } from 'react-router-dom'
import { GiShoppingCart } from "react-icons/gi";

const CartButton = () => {
    const navigate = useNavigate();
    const handleCartClick = () => {
        navigate("/cart");
    }
    return (
        <>
            <GiShoppingCart role='button' onClick={handleCartClick} />
        </>
    )
}
export default CartButton;