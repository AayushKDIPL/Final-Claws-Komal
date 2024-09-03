import React, { useEffect, useState } from 'react';
import './OrderPage.css'; // Custom CSS file
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const OrderPage = () => {

    const jump=useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      // Redirect to login if token is not found
      jump('/login');
    } else {
      // Optionally, add logic here to validate token
      // For example, send a request to the server to verify the token
    }
  }, [jump]);


  // State to manage form inputs
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    mobile: '',
    address1: '',
    address2: '',
    city: '',
    district: '',
    state: '',
    postcode: '',
    email: '',
  });

  const [coupon, setCoupon] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(''); // New state for payment method
  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0); // New state for subtotal
  const [totalQty, setTotalQuantity] = useState(0); // New state for total quantity
  const [discount, setDiscount] = useState(200); // Example discount value
  const [total, setTotal] = useState(0); // New state for total amount
  const [user, setUser] = useState({});
  console.log("mail", user);


    console.log('Billing Details:', billingDetails);
    console.log('Coupon:', coupon);
    console.log('Payment Method:', paymentMethod);
    console.log('Subtotal:', subtotal);
    console.log('Total:', total);
    console.log('qty:', totalQty);
    console.log('discount:', discount);

  // Handler to update form state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  // Handler to update coupon state
  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  // Handler to update payment method state
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  // Function to update cart data and calculate totals
  const updateCartData = (newCartData) => {
    setCartData(newCartData);

    const { total, totalQuantity } = newCartData.reduce(
      (acc, item) => {
        acc.total += item.price * item.quantity;
        acc.totalQuantity += item.quantity;
        return acc;
      },
      { total: 0, totalQuantity: 0 }
    );

    // Update state with subtotal, total quantity, and total
    setSubtotal(total);
    setTotalQuantity(totalQuantity);
    setTotal(total - discount); // Calculate total after discount

    // Update local storage whenever cart data changes
    localStorage.setItem('cartData', JSON.stringify(newCartData));
  };

  useEffect(() => {
    // Get data from localStorage
    const storedCartData = localStorage.getItem('cartData');
    const userGet = localStorage.getItem('user');
    setUser(userGet);

    // Check if the storedCartData is valid JSON and an array
    try {
      const parsedData = JSON.parse(storedCartData);
      if (Array.isArray(parsedData)) {
        // If valid array, update cart data
        updateCartData(parsedData);
      } else {
        // If not an array, set to empty array
        updateCartData([]);
      }
    } catch (error) {
      // Handle JSON parse error, set to empty array
      console.error('Failed to parse stored cart data:', error);
      updateCartData([]);
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const dataToSend = {
    billingDetails,
    paymentMethod,
    total,
    discount,
    cartData,
    user
  };

  console.log("last", dataToSend);


  const orderConfirm = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/order/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const keyResponse = await fetch(`${apiUrl}/api/order/key`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
  
      const key = await keyResponse.json();

      const data = await res.json();
  
      if (res.status === 201) {
        const options = {
          key: key.key,
          amount: total * 100, // in paise
          currency: 'INR',
          name: 'Claws',
          description: 'Order Payment',
          order_id: data.order_id, // Razorpay order ID from the server
          handler: async function (response) {
            const paymentData = {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            };
  
            // Verify payment on the server
            const verifyRes = await fetch(`${apiUrl}/api/order/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(paymentData),
            });
  
            const verifyData = await verifyRes.json();
            if (verifyRes.status === 200) {
              alert('Payment successful!');
              localStorage.removeItem('cartData');
              jump('/');
            } else {
              alert('Payment verification failed. Please try again.');
            }
          },
          prefill: {
            name: billingDetails.name,
            email: billingDetails.email,
            contact: billingDetails.mobile,
          },
          notes: {
            address: billingDetails.address1 + ' ' + billingDetails.address2,
          },
          theme: {
            color: '#F37254',
          },
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  };


  return (
    <div className="container checkout-container">
      <div className="row">
        {/* Left Column: Billing Details */}
        <div className="col-lg-6 mb-4 billing-details">
          <h2 className="section-heading">Billing Details</h2>
          <form className="billing-form" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={billingDetails.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Mobile</label>
              <input
                type="text"
                className="form-control"
                name="mobile"
                value={billingDetails.mobile}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Address Line 1</label>
              <input
                type="text"
                className="form-control"
                name="address1"
                value={billingDetails.address1}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Address Line 2</label>
              <input
                type="text"
                className="form-control"
                name="address2"
                value={billingDetails.address2}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={billingDetails.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>District</label>
              <input
                type="text"
                className="form-control"
                name="district"
                value={billingDetails.district}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>State</label>
              <select
                className="form-control"
                name="state"
                value={billingDetails.state}
                onChange={handleInputChange}
              >
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
                {/* Add other states */}
              </select>
            </div>
            <div className="form-group mb-3">
              <label>Postcode</label>
              <input
                type="text"
                className="form-control"
                name="postcode"
                value={billingDetails.postcode}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>

        {/* Right Column: Order Details */}
        <div className="col-lg-6 order-details">
          <h2 className="section-heading">Order Details</h2>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Quantity</td>
                <td>{totalQty}</td>
              </tr>
              <tr>
                <td>Subtotal</td>
                <td>{subtotal}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>{discount}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{total}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="apply-coupon-heading">Apply Coupon</h3>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={handleCouponChange}
            />
            <button className="btn btn-primary">Apply Coupon</button>
          </div>

          <h3 className="payment-options-heading">Payment Options</h3>
          <div className="form-group mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentOption"
                id="upi"
                value="upi"
                onChange={handlePaymentMethodChange}
              />
              <label className="form-check-label" htmlFor="upi">
                UPI
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentOption"
                id="cod"
                value="cod"
                onChange={handlePaymentMethodChange}
              />
              <label className="form-check-label" htmlFor="cod">
                Cash on Delivery
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentOption"
                id="card"
                value="card"
                onChange={handlePaymentMethodChange}
              />
              <label className="form-check-label" htmlFor="card">
                Credit/Debit Card
              </label>
            </div>
          </div>

          <button className="btn-success btn" onClick={orderConfirm}>Proceed to Order</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
