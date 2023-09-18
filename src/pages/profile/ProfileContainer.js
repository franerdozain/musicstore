
import Profile from "./Profile";
import AdminProfile from "./AdminProfile";
import { useAuth } from "../../contexts/AuthContext";

const ProfileContainer = () => {
    const {userStatus} = useAuth();
    
    console.log("user stauts",userStatus)
    return (
        <>
    
        {userStatus.user?.role === "admin" ? <AdminProfile /> : <Profile /> }
        </>            
    );
}

export default ProfileContainer;