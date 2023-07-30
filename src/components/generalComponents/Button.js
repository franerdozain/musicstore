import { useNavigate } from 'react-router-dom'

const Button = ({ icon: Icon, destination, className }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(destination);
    }
    return (
        <Icon role="button" onClick={handleClick} className={className} size={30} />
    )
}
export default Button;