import { Heart, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import '../styles/tailwind.css';
import { Link } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const MyCart = () => {

    // Initialize the state
    const [cartData, setCartData] = useState([]);
    const [subtotal, setSubtotal] = useState(0); // New state for subtotal
    const [itemCount, setItemCount] = useState(0);
  
    // Function to update cart data and subtotal
    const updateCartData = (newCartData) => {
      setCartData(newCartData);
      const total = newCartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setSubtotal(total);
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




    const addToCartPlus = (product) => {
      const cartData = localStorage.getItem('cartData');
      let cart = cartData ? JSON.parse(cartData) : [];
      const existingProductIndex = cart.findIndex((item) => item.name === product.name);
  
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
      }
  
      localStorage.setItem('cartData', JSON.stringify(cart));
      alert('Product added to cart!');
    };
    



    const addToCartMinus = (product) => {
      const cartData = localStorage.getItem('cartData');
      let cart = cartData ? JSON.parse(cartData) : [];
      const existingProductIndex = cart.findIndex((item) => item.name === product.name);
  
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) - 1;
      }
  
      localStorage.setItem('cartData', JSON.stringify(cart));
      alert('Product added to cart!');
    };


    const removeToCart = (product) => {
      const cartData = localStorage.getItem('cartData');
      let cart = cartData ? JSON.parse(cartData) : [];
      const existingProductIndex = cart.findIndex((item) => item.name === product.name);
      if (existingProductIndex !== -1) {
         // Remove the product from the cart
          cart.splice(existingProductIndex, 1);
          // Update the cart data in localStorage
          localStorage.setItem('cartData', JSON.stringify(cart));
          // Notify the user that the product was removed
          alert('Product removed from cart!');
      }
    };






  return (
    <div className="max-w-7xl px-2 lg:px-0 mx-auto">
      <div className="max-w-2xl lg:max-w-7xl mx-auto lg:mx-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="lg:grid lg:grid-cols-12 lg:items-start">
          <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className="divide-y divide-gray-200">
              {cartData.map((product, productIdx) => (
                <div key={product._id} className="">
                  <li className="flex py-6 sm:py-6 ">
                    <div className="flex-shrink-0">
                      <img
                        src={`${apiUrl}/${product.images}`}
                        alt={product.name}
                        className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a href={product.href} className="font-semibold text-black">
                                {product.name}
                              </a>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-sm text-gray-500">{product.colors}</p>
                            {product.size ? (
                              <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                {product.size}
                              </p>
                            ) : null}
                          </div>
                          <div className="mt-1 flex items-end">
                            <p className="text-xs font-medium text-gray-500 line-through">
                              {product.originalPrice}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              &nbsp;&nbsp;{product.price}
                            </p>
                            &nbsp;&nbsp;
                            {/* <p className="text-sm font-medium text-green-500">{product.discount}</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div className="mb-2 flex">
                    <div className="min-w-24 flex">
                      <button type="button" className="h-7 w-7" onClick={()=> addToCartMinus(product)}>
                        -
                      </button>
                      <input
                        type="text"
                        className="mx-1 h-7 w-9 rounded-md border text-center"
                        defaultValue={product.quantity}
                      />
                      <button type="button" className="flex h-7 w-7 items-center justify-center" onClick={()=> addToCartPlus(product)}>
                        +
                      </button>
                    </div>
                    <div className="ml-6 flex text-sm">
                      <button type="button" className="flex items-center space-x-1 px-2 py-1 pl-0" onClick={()=> removeToCart(product)}>
                        <Trash size={12} className="text-red-500" />
                        <span className="text-xs font-medium text-red-500">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-20 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:pl-4 lg:pr-4 lg:py-6"
          >
            <div className="p-4">
              <dl className="space-y-1">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">Price ({itemCount})</dt>
                  <dd className="text-sm font-medium text-gray-900">₹ {subtotal}</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4">
                  <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                  <dd className="text-base font-medium text-gray-900">₹ {subtotal}</dd>
                </div>
              </dl>
                <div className='flex'>
                    <Link to="/">
                        <button id='cart-page-last' className="bg-red-500 rounded-[0.2rem] px-3 py-2 text-white"><i class="fa-solid fa-arrow-left-long"></i> shopping</button>
                    </Link>
                    <Link to="/checktwo">
                        <button id='cart-page-last'  className="bg-red-500 rounded-[0.2rem] px-4 py-2 text-white ms-[10px]">Checkout</button>
                    </Link>
                </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

export default MyCart;
