import { Col, Table, Row, Container, Spinner } from "react-bootstrap";

import FormShippingData from "../../components/generalComponents/FormShippingData";
import { useEffect, useState } from "react";
import { getOrders, getUserData } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { userStatus } = useAuth();
  const [shoppingHistory, setShoppingHistory] = useState([]);

  useEffect(() => {
    if (userStatus.isAuthenticated) {
      const fetchOrders = async () => {
        try {
          const response = await getOrders(userStatus);
          if (response.orders) {
            setShoppingHistory(response.orders);
          }
        } catch (error) {
          console.log(`Error: ${error}`)
        }
      }
      fetchOrders();
    }
  }, [userStatus.isAuthenticated])

  return (
    <Container className="min-vh-100 d-flex flex-column justify-content-start align-items-center pt-3">
  {userStatus.user === null ? (
    <Spinner animation="border" size="lg" role="status" aria-label="Submitting... Please wait." />
  ) : (
    <>
      {!userStatus.isAuthenticated ? (
        <p>"Please create an account or login"</p>
      ) : (
        <Row className="w-100 mx-0">
          <Col xs={12} lg={6} className="mb-4 px-2">
            <div className="mx-1 mx-lg-4">
              <FormShippingData userDetails={userStatus.user} />
            </div>
          </Col>
          <Col xs={12} lg={6} className="mb-4 px-2 mt-4">
            <div className="border rounded">
              <h2 className="text-center bg-secondary text-white p-1 mb-0 rounded-top">Shopping History</h2>
              {shoppingHistory ? (
                <div className="table-responsive">
                  <Table striped borderless variant="light mb-0">
                    <thead>
                      <tr>
                        <th className="bg-primary text-white">Date</th>
                        <th className="bg-primary text-white">Order ID</th>
                        <th className="bg-primary text-white">Product</th>
                        <th className="bg-primary text-white">Quantity</th>
                        <th className="bg-primary text-white">Price</th>
                        <th className="bg-primary text-white">Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shoppingHistory.map((order) => (
                        <tr key={order.idOrder}>
                          <td>{order.dateAndTime}</td>
                          <td>{order.idOrder}</td>
                          <td>{order.productName}</td>
                          <td>{order.quantity}</td>
                          <td>${order.unitPrice.toFixed(2)}</td>
                          <td>${(order.unitPrice * order.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      )}
    </>
  )}
</Container>

  
  );
}
export default Profile;