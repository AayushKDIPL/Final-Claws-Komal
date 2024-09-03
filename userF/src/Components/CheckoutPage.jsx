import React, { useState } from 'react';
import './CheckoutPage.css'; // Custom CSS file
const apiUrl = process.env.REACT_APP_API_URL;

const CheckoutPage = () => {
  // State to manage form inputs and order summary
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

  // Handler to update form state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  // Handler to update coupon state
  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Billing Details:', billingDetails);
    console.log('Coupon:', coupon);
  };

  return (
    <div className="container my-4">
      <div className="row">
        {/* Left Column: Billing Details */}
        <div className="col-lg-6 mb-4">
          <h2>Billing Details</h2>
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
        <div className="col-lg-6">
          <h2>Order Details</h2>
          <table className="table">
            <tbody>
              <tr>
                <td>Quantity</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Subtotal</td>
                <td>₹1200</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>₹200</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>₹1000</td>
              </tr>
            </tbody>
          </table>

          <h3>Apply Coupon</h3>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={handleCouponChange}
            />
            <button className="btn btn-primary mt-2">Apply Coupon</button>
          </div>

          <h3>Payment Options</h3>
          <div className="form-group mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentOption"
                id="upi"
                value="upi"
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
              />
              <label className="form-check-label" htmlFor="card">
                Credit/Debit Card
              </label>
            </div>
          </div>

          <button className="btn btn-success">Proceed to Order</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
