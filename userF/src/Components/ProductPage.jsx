import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import { useParams } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const ProductPage = () => {
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };








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
      cart.push({ description: product.description, name: product.name, images: product.images, price: product.price, subcategory: product.subcategory , quantity: quantity, colors: color, size: size  });
    }

    localStorage.setItem('cartData', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  // Assuming getData.colors might be a single value or not an array
const colorsArray = Array.isArray(getData.colors) ? getData.colors : [getData.colors];
const sizeArray = Array.isArray(getData.size) ? getData.size : [getData.size];

console.log("Cart Colrs", colorsArray);

const handleColorClick = (color) => {
  setSelectedColor(color);
};
const handleSizeClick = (size) => {
  setSelectedColor(size);
};

  return (
    <div className="product-page mt-5">
      <div className="container">
        <div className="image-section">
          <img
            src={`${apiUrl}/${getData.images}`}
            alt="Armbet Zipped Hoodie"
            className="product-image"
          />
        </div>

        <div className="details-section">
          <h1 className="product-title">{getData.name}</h1>
          <p className="product-price">Rs. {getData.price}</p>
          <p className="product-description">
              {getData.description}
          </p>

          <div className="selection-section">
            <div className="input-group">
              <label className="input-label">Size</label>
              <select
                value={size}
                onChange={handleSizeChange}
                className="input-select"
              >
                {sizeArray.map((size, index) => {
                  // Check if color is defined before using it
                    return (
                      <option key={index} value={size}>{size}</option>
                    );
                })}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Color</label>
              <select
                value={color}
                onChange={handleColorChange}
                className="input-select"
              >
                {colorsArray.map((color, index) => {
                  // Check if color is defined before using it
                    return (
                      <option value={color}>{color}</option>
                    )
                })}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Quantity</label>
              <div className="quantity-selector">
                <button
                  type="button"
                  className="quantity-button"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="quantity-input"
                />
                <button
                  type="button"
                  className="quantity-button"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button className="add-to-cart-button" onClick={() => handleAddToCart(getData)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;