import React, { useEffect, useState } from 'react';
import './Product.css';
import { Link, useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [getData, setGetData] = useState({});
  const { id } = useParams();

  // State to store the selected color and its opacity
  const [selectedColor, setSelectedColor] = useState('');
  const [buttonOpacity, setButtonOpacity] = useState(1);

  console.log(selectedColor);

  // Fetch product data by ID
  const fetchDataById = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/product/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setGetData(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/product`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (Array.isArray(data.message)) {
        // Filter the products based on the search term from `getData`
        const filteredProducts = data.message.filter((product) => {
          const name = product.name ? product.name.toLowerCase() : '';
          const description = product.description ? product.description.toLowerCase() : '';
          const category = product.subcategory?.category ? product.subcategory.category.toLowerCase() : '';
          const categoryName = product.subcategory?.name ? product.subcategory.name.toLowerCase() : '';

          return (
            name.includes(getData.name?.toLowerCase()) ||
            description.includes(getData.name?.toLowerCase()) ||
            category.includes(getData.name?.toLowerCase()) ||
            categoryName.includes(getData.name?.toLowerCase())
          );
        });

        setProductData(filteredProducts);
      } else {
        console.error('Expected an array but got:', data.message);
        setProductData([]);
      }
    } catch (e) {
      console.log('Failed to fetch products:', e);
      setProductData([]);
    }
  };

  useEffect(() => {
    // First fetch the product by ID
    fetchDataById();
  }, [id]);

  useEffect(() => {
    // Fetch related products after `getData` is set
    if (getData.name) {
      fetchProducts();
    }
  }, [getData]);

  const handleAddToCart = (product) => {
    const cartData = localStorage.getItem('cartData');
    let cart = cartData ? JSON.parse(cartData) : [];
    const existingProductIndex = cart.findIndex((item) => item.name === product.name);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1, colors: selectedColor });
    }

    localStorage.setItem('cartData', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  // Assuming getData.colors might be a single value or not an array
const colorsArray = Array.isArray(getData.colors) ? getData.colors : [getData.colors];

const handleColorClick = (color) => {
  setSelectedColor(color);
  setButtonOpacity(buttonOpacity === 1 ? 0.5 : 1); // Toggle opacity between 1 and 0.5
};

  return (
    <div>
      <div className="product">
        <div className="product-main">
          <div className="product-image">
            <img src={`${apiUrl}/${getData.images}`} alt="product" />
          </div>
          <div className="product-details">
            <h2 className="product-details-h2">{getData.name}</h2>
            <p id="product-price-p">₹ {getData.price}</p>
            <p className="product-details-p">
              {getData.description}
            </p>
            <div style={{display: 'flex'}}>
            {colorsArray.map((color, index) => {
              // Check if color is defined before using it
              if (color && typeof color === 'string') {
                return (
                  <div key={index} className="product-details-color me-1">
                    {/* {["green", "yellow", "red"].includes(color.toLowerCase()) ? ( */}
                      <button
                        className="colors-btn"
                        style={{ 
                          backgroundColor: color.toLowerCase(),
                          border: selectedColor === color ? '4px solid black' : 'none', // Apply border if selected
                        }}
                        aria-label={`Choose color ${color}`}
                        onClick={() => handleColorClick(color)}
                      ></button>
                    {/* ) : (
                      ""
                    )} */}
                  </div>
                );
              } else {
                // Handle the case when color is undefined or not a string
                return (
                  <p key={index} className="product-details-p">
                    Colour: Unknown
                  </p>
                );
              }
            })}
            </div>

            <button type="button" className="product-btn2" onClick={() => handleAddToCart(getData)}>Add to cart</button>
          </div>
        </div>
        <div className="related">
          <h2>Related products</h2>
          <div className="related-product">
              {productData.length > 0 ? (
                productData.map((e) => (
                  <div key={e.id}>
                      <Link to={`/product/${e._id}`}><img className='related-img' src={`${apiUrl}/${e.images}`} alt={e.name} /></Link>
                      <h2>{e.name}</h2>
                  </div>
                ))
              ) : (
                <p>No related products available</p>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
