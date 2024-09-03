import React, { useState } from 'react';
import '../style/Address.css'
const apiUrl = process.env.REACT_APP_API_URL;

function DeliveryAddressForm() {
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
    <div className='address'>
      {showAddress ? (
        <div className="address-details">
          <div className="address-info">
            <p>
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
          <div className="form-group">
            <label htmlFor="name">Name:</label>
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
            <label htmlFor="mobileNumber">10-digit mobile number:</label>
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
            <label htmlFor="pincode">Pincode:</label>
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
            <label htmlFor="locality">Locality:</label>
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
            <label htmlFor="address">Address (Area and Street):</label>
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
            <label htmlFor="city">City/District/Town:</label>
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
            <label htmlFor="landmark">Landmark (Optional):</label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={addressDetails.landmark}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="alternatePhone">Alternate Phone (Optional):</label>
            <input
              type="tel"
              id="alternatePhone"
              name="alternatePhone"
              value={addressDetails.alternatePhone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressType">Address Type:</label>
            <div>
              <input
                type="radio"
                id="home"
                name="addressType"
                value="Home"
                checked={addressDetails.addressType === 'Home'}
                onChange={handleChange}
              />
              <label htmlFor="home">Home (All day delivery)</label>
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
              </label>
            </div>
          </div>
          <button type="submit">Save and Deliver Here</button>
        </form>
      )}
    </div>
  );
}

export default DeliveryAddressForm;