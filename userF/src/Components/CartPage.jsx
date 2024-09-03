import React, { useEffect, useState } from 'react';
import './CartPage.css'; // Import the CSS file
import { Link } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const CartPage = () => {
  // Initialize the state
  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0); // New state for subtotal

  // Function to update cart data and subtotal
  const updateCartData = (newCartData) => {
    setCartData(newCartData);
    const total = newCartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(total);
    // Update local storage whenever cart data changes
    localStorage.setItem('cartData', JSON.stringify(newCartData));
  };

  useEffect(() => {
    // Get data from localStorage
    const storedCartData = localStorage.getItem('cartData');

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

  const removeCart = () => {
    // Remove the cart data from localStorage
    localStorage.removeItem('cartData');
    
    // Clear the state
    updateCartData([]);
    
    alert('All items have been removed from the cart.');
  };

  // Function to remove a specific item from the cart
  const handleRemoveItem = (id) => {
    // Filter out the item with the matching id
    const updatedCart = cartData.filter((item) => item._id !== id);
    
    // Update cart data and subtotal
    updateCartData(updatedCart);
    
    alert('Item has been removed from the cart.');
  };

  return (
    <>
      <div className="cart-page">
        {cartData.length > 0 ? ( // Check if the cart is not empty
          <div>
            {/* Table */}
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={`${apiUrl}/${item.images}`}
                        alt={item.name}
                        id="product-img"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <i className="fa-solid fa-trash" onClick={() => handleRemoveItem(item._id)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
                <div className='clear-div-cart'><button className="clear-cart" onClick={removeCart}>
                  Clear Cart
                </button></div>
            <div className="last-cart">
              {/* Buttons */}
              <div className="cart-buttons">
                <Link to={"/"}>
                  <button className="continue-shopping">Continue Shopping</button>
                </Link>
                <Link to={"/order"}><button className='order-proceed'>Proceed Order</button></Link>
              </div>
            </div>
          </div>
        ) : (
          // Message to display when the cart is empty
          <div className="cart-empty">
            <h2 className='empty-cart-display'>Your cart is empty.</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
