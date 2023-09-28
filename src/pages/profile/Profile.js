import { Col, Table, Row, Container, Spinner } from "react-bootstrap";

import FormShippingData from "../../components/generalComponents/FormShippingData";
import { useEffect, useState } from "react";
import { getOrders, getUserData } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import useApi from "../../hooks/useApi";
import { getCategories, getMessages } from "../../services/api";

const Profile = () => {
  const { userStatus } = useAuth();
  const [shoppingHistory, setShoppingHistory] = useState([]);
  const { data: messagesData, loading: loadingMessages, LoadingAnimation: loadingMessagesAnimation } = useApi(getMessages);

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-vh-100">
  {userStatus.user === null ? (
    <Spinner animation="border" size="lg" role="status" aria-label="Submitting... Please wait." />
  ) : (
    <>
      {!userStatus.isAuthenticated ? (
        <p>"Please create an account or login"</p>
      ) : (
        <Container className="d-flex flex-wrap" fluid>
          <Col xs={12} md={6} className="mb-4 px-2">
            <div className="">
              <FormShippingData userDetails={userStatus.user} />
            </div>
          </Col>
          <Col xs={12} md={6} className="mb-4 px-2 ">
            <div className="mt-4">
              <h2 className="text-center bg-secondary text-white p-1 mb-0 rounded-top">Shopping History</h2>
              {shoppingHistory ? (
                <div className="table-responsive">
                  <Table striped borderless variant="light mb-0">
                    <thead>
                      <tr>
                      {['Date', 'Order ID', 'Product', 'Quantity', 'Price', 'Total Price'].map((field) => (
                         <th key={field} className="bg-primary text-white text-center">{field}</th>
                      ))}                                             
                      </tr>
                    </thead>
                    <tbody>
                      {shoppingHistory.map((order) => (
                        <tr key={order.idOrder} className="text-center">
                          <td>{formatDate(order.dateAndTime)}</td>
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
        </Container>
      )}
    </>
  )}
</div>
  );
}
export default Profile;