import { useEffect, useState } from "react";
import { Modal, Spinner, Table } from "react-bootstrap";
import { getOrders } from "../../services/api";
import { formatDate } from "../../utils/formatDate";

const ShoppingHistoryModal = ({ setShowShopHistoryModal, showShopHistoryModal, idUserForShopHistory, username }) => {
    const [shoppingHistory, setShoppingHistory] = useState([]);
    const [noShopHistoryMsg, setNoShopHistoryMsg] = useState("");
    const [loadingShopHistory, setLoadingShopHistory] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders(idUserForShopHistory);
                if (response.orders) {
                    await new Promise(r => setTimeout(r, 2000));
                    setShoppingHistory(response.orders);
                } else if (response.emptyOrders) {
                    await new Promise(r => setTimeout(r, 2000));
                    setNoShopHistoryMsg(response.emptyOrders);
                }
            } catch (error) {
                console.log("Error: ", error)
            } finally {
                setLoadingShopHistory(false);
            }
        }
        fetchOrders();
    }, []);
    return (
        <Modal
            show={showShopHistoryModal}
            onHide={setShowShopHistoryModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <img
                    src='/mmLogoBL.png'
                    alt="Music Makers Logo"
                    className="logo-modal float-start me-2 img-fluid"
                />
                <h4>
                    {`${username}'s purchase history`}
                </h4>
            </Modal.Header>
            <Modal.Body>
                {loadingShopHistory ? (
                    <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-label="Submitting... Please wait."
                    />
                ) : (
                    shoppingHistory.length > 0 ? (
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
                    ) : (
                        <small>{noShopHistoryMsg}</small>
                    )                                           
                )
                }
            </Modal.Body>
        </Modal>
    )
}

export default ShoppingHistoryModal;