import React from 'react';
import { useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const OrderDetails = () => {
  const { id } = useParams();

  // Mock order details
  const orderDetails = {
    id,
    date: '2024-07-15',
    total: '$99.99',
    items: [
      { name: 'Product 1', quantity: 1, price: '$99.99' }
    ]
  };

  return (
    <div className="order-details-page">
      <h1>Order Details</h1>
      <p>Order ID: {orderDetails.id}</p>
      <p>Date: {orderDetails.date}</p>
      <p>Total: {orderDetails.total}</p>
      <h2>Items:</h2>
      <ul>
        {orderDetails.items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} x {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
