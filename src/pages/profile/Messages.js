import { Col, Table } from "react-bootstrap";
import { SiMinutemailer } from "react-icons/si";

import { useAuth } from "../../contexts/AuthContext";

const Messages = ({ loadingMessagesAnimation, loadingMessages, messages, handleAnswerClick, formatDate }) => {
    const { userStatus } = useAuth();

    const thFields = userStatus.user && userStatus.user.role === 'admin'
        ? ["Date & Time", "Message ID", "Subject", "Message", "User Id or Email", "Answer"]
        : ["Date & Time", "Message ID", "Subject", "Message", "Answer"]

    return (
        <Col xs={12} md={6} className="mb-5">
            <div className="mt-4 border rounded me-4 w-100">
                <h2 className="text-center bg-secondary text-white p-1 mb-0 rounded-top">User's Messages</h2>
                <div className="table-responsive">
                    <Table striped borderless variant="light mb-0">
                        <thead>
                            <tr>
                                {thFields.map(th => (
                                    <th key={th} rowSpan="3" className="bg-primary text-white">{th}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loadingMessages ? (
                                <tr>
                                    <td>{loadingMessagesAnimation}</td>
                                </tr>
                            ) : (
                                messages && messages.length > 0 ? (
                                    messages.map((msg) => (
                                        <tr key={msg.idMessages}>
                                            <td>{formatDate(msg.dateAndTime)}</td>
                                            <td>{msg.idMessages}</td>
                                            <td>{msg.subject}</td>
                                            <td>{msg.message}</td>
                                            {userStatus.user && userStatus.user.role === 'admin' ? <td>{msg.idSenderUser || msg.emailSender}</td> : null}
                                            <td className="text-center">
                                                <SiMinutemailer
                                                    size={30}
                                                    onClick={() => handleAnswerClick(msg.idMessages)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : null
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </Col>
    )
}
export default Messages;