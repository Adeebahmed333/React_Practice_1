import { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:4400/orders');
                setOrders(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[]);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Orders</h2>
            <table className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>User ID</th>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Payment Method</th>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.userId}</td>
                            <td>{order.productId}</td>
                            <td>{order.quantity}</td>
                            <td>
                                <span
                                    className={`badge ${order.status === "delivered" ? "bg-success" : "bg-warning"
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </td>
                            <td>{order.payment.method}</td>
                            <td>{order.payment.transactionId}</td>
                            <td>₹{order.payment.amount.toLocaleString()}</td>
                            <td>{new Date(order.orderDate).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table