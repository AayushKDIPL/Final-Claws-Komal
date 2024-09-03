import React, { useState } from "react";
import "../style/CheckOut.css";
import axios from "axios";  // Correct import for axios
const apiUrl = process.env.REACT_APP_API_URL;

const CheckOut = () => {
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = async (amount) => {
    const data = JSON.stringify({
      amount: amount * 100,  // Convert amount to paise
      currency: 'INR',
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiUrl}/orders`, // Adjust URL if using https
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      console.log("Order created:", response.data);
      handleRazorpayScreen(response.data.amount);
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error.message || error);
      alert("Error creating order. Please check the console for details.");
    }
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Some error occurred while loading the Razorpay script.");
      return;
    }

    const options = {
      key: 'rzp_test_ZUWzmXBR3ogNsS', // Correctly configured key
      amount: amount,
      currency: 'INR',
      name: "Papaya Coders",
      description: "Payment to Papaya Coders",
      image: "https://papayacoders.com/demo.png",
      handler: function(response) {
        setResponseId(response.razorpay_payment_id);
      },
      prefill: {
        name: "Papaya Coders",
        email: "papayacoders@gmail.com",
      },
      theme: {
        color: "#F4C430"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const paymentFetch = (e) => {
    e.preventDefault();

    const paymentId = e.target.paymentId.value;

    axios.get(`${apiUrl}/payment/${paymentId}`) // Adjust URL if using https
      .then((response) => {
        console.log("Payment details:", response.data);
        setResponseState(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payment details:", error.response?.data || error.message || error);
      });
  };

  const [showAddress, setShowAddress] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    name: '',
    mobileNumber: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    alternatePhone: '',
    addressType: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAddress(true);
  };

  const handleAddressChange = () => {
    setShowAddress(false);
  };

  return (
    <section className="checkout-section ">
      <div className="container1">
    {/* login */}
    <div>
      <p className="text-light">Didn't Login <a href="/login">Click here to login</a></p>
      
    
      

        {/* Billing Details Form */}
        <div className='address text-white mt-2  bg-dark ' id="adrress">
      {showAddress ? (
        <div className="address-details">
          <div className="address-info">
            <p><p className=""> Delivery Address</p>
              <b>{addressDetails.name}</b> 
            </p>
            <p>
              {addressDetails.address}, {addressDetails.locality},
              {addressDetails.city}, {addressDetails.state} -
              {addressDetails.pincode}
            </p>
          </div>
          <button onClick={handleAddressChange}>Change Address</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="add">Delivery Address</div>
          <div className="form-group mb-2 ">
            <label htmlFor="name">Name:</label><br />
            <input
              type="text"
              id="name"
              name="name"
              value={addressDetails.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">10-digit mobile number:</label><br />
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={addressDetails.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pincode:</label><br />
            <input
              type="number"
              id="pincode"
              name="pincode"
              value={addressDetails.pincode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="locality">Locality:</label><br />
            <input
              type="text"
              id="locality"
              name="locality"
              value={addressDetails.locality}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address (Area and Street):</label><br />
            <input
              type="text"
              id="address"
              name="address"
              value={addressDetails.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City/District/Town:</label><br />
            <input
              type="text"
              id="city"
              name="city"
              value={addressDetails.city}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="state">State:</label>
            <select
              id="state"
              name="state"
              value={addressDetails.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option> 
            </select>
          </div> */}
          <div className="form-group">
            <label htmlFor="landmark">Landmark (Optional):</label><br />
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={addressDetails.landmark}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="alternatePhone">Alternate Phone (Optional):</label><br />
            <input
              type="tel"
              id="alternatePhone"
              name="alternatePhone"
              value={addressDetails.alternatePhone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressType">Address Type:</label><br />
            <div>
              <input
                type="radio"
                id="home"
                name="addressType"
                value="Home"
                checked={addressDetails.addressType === 'Home'}
                onChange={handleChange}
              />
              <label htmlFor="home">Home (All day delivery)</label><br />
            </div>
            <div>
              <input
                type="radio"
                id="work"
                name="addressType"
                value="Work"
                checked={addressDetails.addressType === 'Work'}
                onChange={handleChange}
              />
              <label htmlFor="work">
                Work (Delivery between 10 AM - 5 PM)
              </label><br />
            </div>
          </div>
          <button type="submit">Save and Deliver Here</button>
        </form>
        
      )} 
      </div>


      <div className="pay-box ms-3 bg-dak">
      <button onClick={() => createRazorpayOrder(100)}>Payment of 100Rs.</button>
          {responseId && <p>{responseId}</p>}
          <h5>This is payment verification form</h5>
          <form onSubmit={paymentFetch}>
            <input type="text" name="paymentId" className="w-100" />
            <button type="submit">Fetch Payment</button>
            {responseState.length !== 0 && (
              <ul>
                <li>Amount: {responseState.amount / 100} Rs.</li>
                <li>Currency: {responseState.currency}</li>
                <li>Status: {responseState.status}</li>
                <li>Method: {responseState.method}</li>
              </ul>
            )}
          </form>
      </div>
    </div>
    </div>
     
    </section>
  );
};

export default CheckOut;
