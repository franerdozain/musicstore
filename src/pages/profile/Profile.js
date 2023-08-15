import { Col } from "react-bootstrap";
import FormShippingData from "../../components/generalComponents/FormShippingData";

const Profile = () => {
    const initialUser = {
        "user": [
          {
            "Email": "sample@gmail.com",
            "Address": "742 Evergreen Terrace",
            "Country": "Israel",
            "City": "Haifa",
            "State": "Haifa",
            "Zip": 33000,
            "Password": "happyTunes48"
          }
        ]
      };

    //   const filteredUserDetailsForProfile = initialUser.user.map(detail => ({
    //     "Email": detail.Email,
    //     "Password": detail.Password
    //   }));    

    return (
        <div className="min-vh-100">
            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={5}>
                <div className="mx-1 mx-md-4">
                    <FormShippingData details={initialUser.user} />
                </div>
                <div>
                    
                </div>
            </Col>
        </div>
    )
}
export default Profile;