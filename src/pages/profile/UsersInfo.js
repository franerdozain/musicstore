import { Table } from "react-bootstrap";
import { TbShoppingCartSearch } from "react-icons/tb";

const UsersInfo = ({ usersInfo, loadingUsersInfo, loadingUsersInfoAnimation }) => {

    const thFields = [
        'User Id',
        'Username',
        'Email',
        'Country',
        'State',
        'City',
        'Shipping Address',
        'Zip',
        'Shopping History'
    ];

    return (
        <div className="mt-4 border rounded me-4 w-100 mb-4">
            <h2 className="text-center bg-secondary text-white p-1 mb-0 rounded-top">User Info</h2>
            <div className="table-responsive text-center">
                <Table striped borderless variant="light mb-0">
                    <thead>
                        <tr>
                            {thFields.map(th => (
                                <th key={th} rowSpan="3" className="bg-primary text-white">{th}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loadingUsersInfo ? (
                            <tr>
                                <td>{loadingUsersInfoAnimation}</td>
                            </tr>
                        ) : (
                            usersInfo && usersInfo.length > 0 ? (
                                usersInfo.map((user) => (
                                    <tr key={user.idUser}>
                                        <td>{user.idUser}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.country}</td>
                                        <td>{user.state}</td>
                                        <td>{user.city}</td>
                                        <td>{user.shippingAddress}</td>
                                        <td>{user.zip}</td>
                                        <td><TbShoppingCartSearch size={25} /></td>
                                    </tr>
                                ))
                            ) : null
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default UsersInfo;