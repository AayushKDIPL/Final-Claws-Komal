import React, { useEffect, useState } from 'react';
import './Order.css'
const apiUrl = process.env.REACT_APP_API_URL;

const Order=()=>{

    const [allOrder, setAllOrder]=useState([]);
    console.log("users", allOrder);

    useEffect(()=>{
        fetchAllOrder();
    },[])

    const fetchAllOrder = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/order`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setAllOrder(data.message);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

    const orders = [
        {
          orderImg: 'https://via.placeholder.com/100',
          name: 'Product A',
          price: '$99.99',
          address: '1234 Elm Street, Springfield, IL',
          paymentStatus: 'Paid',
          userName: 'John Doe',
          userEmail: 'john@example.com',
          userNumber: '123-456-7890',
          orderNo: 'ORD001',
          deliveryStatus: 'Delivered',
        },
        {
          orderImg: 'https://via.placeholder.com/100',
          name: 'Product B',
          price: '$149.99',
          address: '5678 Oak Street, Springfield, IL',
          paymentStatus: 'Pending',
          userName: 'Jane Smith',
          userEmail: 'jane@example.com',
          userNumber: '987-654-3210',
          orderNo: 'ORD002',
          deliveryStatus: 'Pending',
        },
        {
          orderImg: 'https://via.placeholder.com/100',
          name: 'Product C',
          price: '$59.99',
          address: '9012 Pine Street, Springfield, IL',
          paymentStatus: 'Paid',
          userName: 'Alice Johnson',
          userEmail: 'alice@example.com',
          userNumber: '555-123-4567',
          orderNo: 'ORD003',
          deliveryStatus: 'Shipped',
        },
      ];

    return(
        <div>
        <div className="content-wrapper">
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="App">
                            <h1>Order Details</h1>
                                <div className="order-list">
                                    {allOrder.map((order, index) => (
                                    <div className="order-card" key={index}>
                                        <img src={order.orderImg} alt={order.name} className="order-image" />
                                        <div className="order-details">
                                        <span className="order-name">Product Name: ``</span>
                                        <span className="order-price">Price: {order.total}</span>
                                        <span className="order-address">Address: `${order.billingDetails.address1} , ${order.billingDetails.address2}`</span>
                                        <span className="payment-status">Payment Status: {order.paymentMethod}</span>
                                        <span className="payment-status">Customer Name: {order.billingDetails.name}</span>
                                        <span className="user-email">Email: {order.billingDetails.email}</span>
                                        <span className="user-number">Mobile: {order.billingDetails.mobile}</span>
                                        <span className="order-no">Order No: {order.orderno}</span>
                                        <span className="delivery-status">Delivery Status: {order.status} <i class="fa-solid fa-pen-to-square"></i></span>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </div>
    )
}
export default Order