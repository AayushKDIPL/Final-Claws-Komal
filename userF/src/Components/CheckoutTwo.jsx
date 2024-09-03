import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import axios from "axios";  // Correct import for axios
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

// process.env.API_URL as String

const CheckoutTwo=()=> {
      // Initialize the state
      const [cartData, setCartData] = useState([]);
      const [subtotal, setSubtotal] = useState(0); // New state for subtotal
      const [itemCount, setItemCount] = useState(0);
      const [totalPrice, setTotalPrice] = useState(0);
      const [userId, setUserId] = useState("");

      const [responseId, setResponseId] = useState("");
      const [responseState, setResponseState] = useState([]);

      const jump=useNavigate();

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

      const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

      // State to store the coupon code
      const [couponCode, setCouponCode] = useState('');

      // Function to handle input changes
      const handleInputChange = (event) => {
        setCouponCode(event.target.value);
      };
    
      // Function to update cart data and subtotal
      const updateCartData = (newCartData) => {
        setCartData(newCartData);
        const total = newCartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setSubtotal(total);
        setTotalPrice(total);
        // Count the number of unique items in the cart
        const CountItem = newCartData.length;
        setItemCount(CountItem); // Update the item count state
        // Update local storage whenever cart data changes
        localStorage.setItem('cartData', JSON.stringify(newCartData));
      };
    
      useEffect(() => {
        
      const getCartFromCart=()=>{
        // Get data from localStorage
      const storedCartData = localStorage.getItem('cartData');
      const storedUser = localStorage.getItem('user');
      setUserId(storedUser);
    
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
      }
      getCartFromCart();
      }, []); // Empty dependency array ensures this runs once when the component mounts

      const applycoupon=()=>{
        setTotalPrice(subtotal-couponCode);
      }

      // State to store form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    number: '',
    address: '',
    state: '',
    city: '',
    postalCode: '',
  });

  console.log("Hre is address", formData);

  // Single function to handle changes for both inputs
  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Dynamically update the state based on input name
    }));
  };

  const orderConfirm = async () => {

    const dataToSend={
        billingDetails: {
          name: formData.fullName,
          mobile: formData.number,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postcode: formData.postalCode
        },
        total: totalPrice,
        user: userId,
        cartData: cartData.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          images: item.images,
          colors: item.colors,
          size: item.size
        }))
    }

    console.log(" data to sent ", dataToSend)

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
          amount: totalPrice * 100, // in paise
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
            name: formData.fullName,
            contact: formData.number,
          },
          notes: {
            address: formData.address + ' ' + formData.city + ' ' + formData.state + ' ' + formData.postalCode,
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
    <div className="mx-auto my-4 max-w-4xl md:my-6">
      <div className="overflow-hidden  rounded-xl shadow" style={{marginTop: '10rem'}}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="text-gray-900 md:px-8">
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="py-6">
                  <form>
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                    <div>
                        <h3
                          id="contact-info-heading"
                          className="text-lg font-semibold text-gray-900"
                        >
                          Contact information
                        </h3>
                        <div className="mt-4 w-full">
                          <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="name"
                          >
                            Full Name
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            placeholder="Enter your name"
                            id="name"
                            name="fullName" // Set the name attribute to identify the input
                            value={formData.fullName} // Bind the input value to state
                            onChange={handleAddressChange} // Use a single function for input change
                          />
                        </div>
                        <div className="mt-4 w-full">
                          <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="number"
                          >
                            Number
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text" // Corrected input type
                            placeholder="Enter your number"
                            id="number"
                            name="number" // Set the name attribute to identify the input
                            value={formData.number} // Bind the input value to state
                            onChange={handleAddressChange} // Use a single function for input change
                          />
                        </div>
                      </div>
                      <hr className="my-8" />
                      <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>
                        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Address
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address} // Bind the input value to state
                                onChange={handleAddressChange} // Use a single function for input change
                                autoComplete="street-address"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                            >
                              City
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city} // Bind the input value to state
                                onChange={handleAddressChange} // Use a single function for input change
                                autoComplete="address-level2"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium text-gray-700"
                            >
                              State / Province
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state} // Bind the input value to state
                                onChange={handleAddressChange} // Use a single function for input change
                                autoComplete="address-level1"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="postalCode"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Postal code
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode} // Bind the input value to state
                                onChange={handleAddressChange} // Use a single function for input change
                                autoComplete="postal-code"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-8" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Product List */}
          <div className="bg-gray-100 px-2 py-3 md:px-8">
            <div className="flow-root">
            <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">Payment details</h3>
                      </div>
            </div>
            <hr className="mt-6 border-gray-200" />
            <form action="#" className="mt-6">
              <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                <div className="flex-grow">
                  <input
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode} // Bind input value to state
                    onChange={handleInputChange} // Handle input change
                  />
                </div>
                <div className="sm:mt-0 md:mt-4 lg:mt-0 px-6">
                  <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black unique"
                  onClick={applycoupon}>
                    Apply Coupon
                  </button>
                </div>
              </div>
            </form>
            <ul className="mt-6 space-y-3 px-6">
              <li className="flex items-center justify-between text-gray-600">
                <p className="text-sm font-medium">Sub total</p>
                <p className="text-sm font-medium">₹ {subtotal}</p>
              </li>
              <li className="flex items-center justify-between text-gray-900">
                <p className="text-sm font-medium ">Total</p>
                <p className="text-sm font-bold ">₹ {totalPrice}</p>
              </li>
            </ul>
            <div className="mt-10 flex justify-end border-t border-gray-200 pt-6 px-6">
                        <button
                          type="button"
                          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        onClick={orderConfirm}>
                          Make payment
                        </button>
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CheckoutTwo