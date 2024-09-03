import React, { useEffect, useState } from 'react';
import './User.css';
const apiUrl = process.env.REACT_APP_API_URL;

const User = () => {
  const [allUser, setAllUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponPrice, setCouponPrice] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  console.log(currentUser);
  console.log("price", couponPrice);

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setAllUser(data.message);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const openModal = (product) => {
    handleEditClick(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (product) => {
    setCurrentUser(product._id);
    setCouponPrice(product.couponPrice);
  };


    const addCoupon=async()=>{

      const _id=currentUser;
       // Make the PATCH request to update the user's profile
      const response = await fetch(`${apiUrl}/api/user/${_id}`, {
        method: 'PATCH',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({couponPrice: couponPrice})
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      const result = await response.json();
      alert('User updated successfully');
    }

  return (
    <div>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="row">
            <div className="col-md-12">
              <div className="App">
                <h1>User Details</h1>
                <div className="user-list">
                  {allUser.map((user, index) => (
                    <div className="user-card" key={index}>
                      <img
                        src={`${apiUrl}/${user.images}`}
                        alt={user.name}
                        className="user-image"
                      />
                      <div className="user-details">
                        <span className="user-name">{user.name}</span>
                        <span className="user-email">Email: {user.email}</span>
                        <span className="user-mobile">Mobile: {user.number}</span>
                        <span className="user-address">Address: {user.address}</span>
                      </div>
                      <button type="button" className="btn" onClick={()=> openModal(user)} style={{backgroundColor: "#f5f5f5"}}>
                        <img
                          className="coupon-img"
                          src="https://static.vecteezy.com/system/resources/previews/009/342/078/large_2x/discount-coupon-icon-sign-design-free-png.png"
                          alt="coupon/img"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5 className="modal-title">Add Coupon</h5>
            <div className="modal-body">
              <form>
                  <div className="form-group">
                      <label htmlFor="productName">Enter Coupon Price</label>
                      <input
                        type="number"
                        className="form-control"
                        id="couponPrice"
                        placeholder="Enter product name"
                        value={couponPrice}
                        onChange={(e) => setCouponPrice(e.target.value)}
                      />
                    </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={addCoupon}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
