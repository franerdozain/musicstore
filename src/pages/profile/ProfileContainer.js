import { useSearchParams } from "react-router-dom";

import Profile from "./Profile";
import AdminProfile from "./AdminProfile";

const ProfileContainer = () => {
    const [queryParams] = useSearchParams();
    const queryUser = queryParams.get("user");
    const userType = queryUser === "user" || queryUser === "admin" ? queryUser : "";
    return (
        <>
            {userType === "user" ? (
                <Profile />
            ) :
                userType === "admin" ? (
                    <AdminProfile />
                ) : ""
                    // <NotFound />
            }
        </>
    );
}

export default ProfileContainer;