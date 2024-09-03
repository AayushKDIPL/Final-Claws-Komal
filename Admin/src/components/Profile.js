import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

function Profile() {

  const [user, setUser] = useState();
  const [profileData, setProfileData] = useState([]);
  const [cartData, setCartData] = useState([]);
  console.log("cart data here", cartData);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
  });

  const [profileImg, setProfileImg] = useState(null)



  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      // Redirect to login if token is not found
      navigate('/login');
    } else {
      // Optionally, add logic here to validate token
      // For example, send a request to the server to verify the token
    }
  }, [navigate]);



  useEffect(() => {
    // Retrieve user from local storage
    const _id = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    setUser(_id);

    // Fetch user data and cart data when component mounts
    fetchUserData(_id, token);
    fetchCartData(_id, token);
  }, []);

  // Function to fetch user data
  const fetchUserData = async (_id, token) => {
    try {
      const response = await fetch(`${apiUrl}/api/user/${_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setProfileData(data.message);
      // Set initial form data with fetched user data
      setProfile({
        name: data.message.name || '',
        email: data.message.email || '',
        number: data.message.number || '',
        address: data.message.address || '',
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Function to fetch cart data
  const fetchCartData = async (_id, token) => {
    try {
      const response = await fetch(`${apiUrl}/api/order/${_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const data = await response.json();
      setCartData(data.message);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleInputImgChange = (event) => {
    // Get the file from the input
    const file = event.target.files[0];

    // Check if a file was selected
    if (file) {
      // Store the file in a state variable
      setProfileImg(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the access token from local storage
      const _id = user; // Use the user ID from your state or wherever it's stored

      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('number', profile.number);
      formData.append('address', profile.address);
      formData.append('images', profileImg);


      // Make the PATCH request to update the user's profile
      const response = await fetch(`${apiUrl}/api/user/${_id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the access token for authentication
        },
        body: formData, // Pass the profile object with updated data
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const result = await response.json();
      alert('User updated successfully');

      // After successfully updating, refetch the user data to reflect changes
      fetchUserData(_id, token);
      fetchCartData(_id, token);

      setShow(false); // Close the modal after successful submission
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };


  const cancleOrder=()=>{
    alert("Order Cancel");
  }


  return (
    <div>
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-img-container">
          <img src={`${apiUrl}/${profileData.images}`} alt="User Image" className="profile-img" />
        </div>
        <div className="profile-info">
          <h2>{profileData.name}</h2>
          <p>{profileData.email}</p>
          <p>{profileData.number}</p>
          <p>{profileData.address}</p>
        </div>
      </div>
    </div>

    {/* Modal for Updating Profile */}
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Profile</h5>
              <button type="button" className="btn-close" onClick={() => setShow(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Image Field */}
                <div className="mb-3">
                  <label htmlFor="images" className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="images"
                    name="images"
                    onChange={handleInputImgChange}
                  />
                </div>
                {/* Name Field */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Number Field */}
                <div className="mb-3">
                  <label htmlFor="number" className="form-label">Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="number"
                    name="number"
                    value={profile.number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Address Field */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows="3"
                    value={profile.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
