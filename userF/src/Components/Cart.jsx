import React, { useState, useEffect } from "react";
import "../style/Cart.css";
const apiUrl = process.env.REACT_APP_API_URL;

function Cart() {
  const [getCart, setGetCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  // Replace with actual user ID or authentication logic
  const userId = 'YOUR_USER_ID'; 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/cart/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setGetCart(data.cartItems);
          setTotalPrice(data.totalPrice);
        } else {
          console.error('Failed to fetch cart items:', data.message);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleIncrease = async (index) => {
    try {
      const item = getCart[index];
      await fetch(`${apiUrl}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: 1,
        }),
      });
      const updatedCart = [...getCart];
      updatedCart[index].quantity += 1;
      setGetCart(updatedCart);
      setTotalPrice(totalPrice + item.price); // Update total price
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDecrease = async (index) => {
    try {
      const item = getCart[index];
      if (item.quantity > 1) {
        await fetch(`${apiUrl}/api/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            title: item.title,
            price: item.price,
            image: item.image,
            quantity: -1,
          }),
        });
        const updatedCart = [...getCart];
        updatedCart[index].quantity -= 1;
        setGetCart(updatedCart);
        setTotalPrice(totalPrice - item.price); // Update total price
      } else {
        await fetch(`${apiUrl}/api/cart/${userId}/${item.title}`, {
          method: 'DELETE',
        });
        const updatedCart = getCart.filter((_, i) => i !== index);
        setGetCart(updatedCart);
        setTotalPrice(totalPrice - item.price * item.quantity); // Update total price
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const handlePayment = () => {
    setShowPaymentDetails(true);
  };

  return (
    <div className="cart-item">
      <div className="cart-container ms-n5">
        <div className="row">
          <div className="col-2">
            <h5>ITEM</h5>
          </div>
          <div className="col-3">
            <h5>Description</h5>
          </div>
          <div className="col-2 price">
            <h5>Price</h5>
          </div>
          <div className="col-2">
            <h5>Quantity</h5>
          </div>
          <div className="col-3">
            <h5>Total</h5>
          </div>
        </div>
      </div>

      {getCart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        getCart.map((e, index) => {
          const totalPrice = e.quantity * e.price;
          return (
            <div key={index}>
              <div className="container">
                <div className="row item-div mt-3">
                  <div className="col-2">
                    <img className="cart_img" src={e.image} alt="" />
                  </div>
                  <div className="col-3 title mt-4">
                    <h6>{e.title}</h6>
                  </div>
                  <div className="col-2 mt-4 price">
                    <h6>₹{e.price}</h6>
                  </div>
                  <div className="col-2 mt-3">
                    <div className="quantity-control">
                      <button
                        className="btn-add m-0"
                        onClick={() => handleDecrease(index)}
                      >
                        -
                      </button>
                      <span>{e.quantity}</span>
                      <button
                        className="btn-add"
                        onClick={() => handleIncrease(index)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-3 mt-4">
                    <h6>₹{totalPrice}</h6>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}

      <div className="container">
        <div className="row mt-3 ms-0 me-0">
          <div className="col-12 d-flex align-items-center justify-content-between">
            <p className="mb-0">Total Price: ₹{totalPrice}</p>
            <button
              className="btn btn-primary pay-btn"
              onClick={handlePayment}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {showPaymentDetails && (
        <div className="container mt-5">
          <h5>Payment Details:</h5>
          <div className="row">
            <div className="col-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {getCart.map((e, index) => (
                    <tr key={index}>
                      <td>{e.title}</td>
                      <td>{e.quantity}</td>
                      <td>₹{e.price}</td>
                      <td>₹{e.quantity * e.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3">Total:</td>
                    <td>₹{totalPrice}</td>
                  </tr>
                </tfoot>
              </table>
              <button className="btn btn-outline-primary b2">
                <a href="/checkOut">Order Now</a>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
