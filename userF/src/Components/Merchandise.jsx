import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To extract URL parameters
const apiUrl = process.env.REACT_APP_API_URL;

function Merchandise() {
  const { id } = useParams(); // Get the category ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product data based on the category ID
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/merchandise/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <img src={product.img} className="card-img-top imgdata" alt={product.title} />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p>Price: ₹{product.price} &nbsp; Offer: {product.offer}% off</p>
            <p className="description">{product.description}</p>
            <button onClick={() => handleAddToCart(product)} className="btn btn-dark w-100">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const handleAddToCart = (item) => {
  // Implement your add to cart logic here
  console.log('Adding to cart:', item);
};

export default Merchandise;
