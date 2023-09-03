import { useNavigate } from 'react-router-dom';

const IconButton = ({ icon: Icon, destination, className }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(destination);
    }
    return (
        <Icon role="button" onClick={handleClick} className={className} size={30} />
    )
}
export default IconButton;