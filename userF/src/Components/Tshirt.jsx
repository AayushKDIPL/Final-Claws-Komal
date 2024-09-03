import React, { useState,useEffect } from 'react';
import tshirt from "../img/product-1.JPG";
import "../style/Tshirt.css";  
import { Link } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;
// import products from "./products";
export default function Tshirt() {
  // Define an array of product details

  const [productData, setProductData] = useState([]); // Initialize as an empty array

  console.log("j d BK>LNKN         jk LKDN", productData);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/product`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (Array.isArray(data.message)) {
          
      const merchandiseSubcategories = [];
  
      // Loop through the subcategories and classify them
      for (let i = 0; i < data.message.length; i++) {
        const subcategory = data.message[i];
  
        if (subcategory.subcategory.category === "MERCHANDISE") {
          merchandiseSubcategories.push(subcategory);
        }
      }
      // Update state once with all accumulated subcategories
      setProductData(prevState => [...prevState, ...merchandiseSubcategories]);





        } else {
          console.error('Expected an array but got:', data.message);
          setProductData([]);
        }
      } catch (e) {
        console.log('Failed to fetch products:', e);
        setProductData([]);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cartData = localStorage.getItem('cartData');
    let cart = cartData ? JSON.parse(cartData) : [];
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartData', JSON.stringify(cart));
    alert('Product added to cart!');
  };
 
  return (
    <div className="product-page mt-5">
      <div className="product-main-card">
        {productData.length > 0 ? (
          productData.map((product) => (
                <div key={product._id} className="product-card text-center">
                    {/* images */}
                    <div className="product-images">
                      {product.images.length > 0 ? (
                        product.images.map((image, index) => (
                          <Link to={`/productpage/${product._id}`} style={{textDecoration: 'none'}}>
                              <img
                                key={index}
                                src={`${apiUrl}/${image}`}
                                className="product-img   imgdata"
                                alt={`Product image ${index + 1}`}
                              />
                          </Link>

                        ))
                      ) : (
                        <p>No images available</p>
                      )}
                    </div>

                    <div className="product-body card-body">

                      <h5 className="product-name card-title">{product.name}</h5>


                      <p className="product-description description">{product.price}</p>


                    </div>
                    </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}
