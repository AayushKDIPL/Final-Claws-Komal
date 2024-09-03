import React, { useState, useEffect } from 'react';
import moment from 'moment';
const apiUrl = process.env.REACT_APP_API_URL;

const Check = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from the API using fetch
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/orders`);  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Order Tracking</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.order_number}</td>
                <td>{moment(order.order_date).format('MMMM D, YYYY')}</td>
                <td>{moment(order.delivery_date).format('MMMM D, YYYY')}</td>
                <td>{order.tracking_number}</td>
                <td>
                  <img src={order.product.image} alt={order.product.title} />
                  <span>{order.product.title}</span>
                </td>
                <td>${order.product.price}</td>
                <td>{order.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Check;
