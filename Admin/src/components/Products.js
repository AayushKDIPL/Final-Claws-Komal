import React, { useEffect, useState } from 'react';
import './Product.css';
const apiUrl = process.env.REACT_APP_API_URL;

const Product = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [subcategories, setSubcategories] = useState([]); // State for subcategories
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productColors, setProductColors] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [productPriority, setProductPriority] = useState('');
  const [productSubcategory, setProductSubcategory] = useState('');

  useEffect(() => {
    fetchAllProduct();
    fetchSubcategories(); // Fetch subcategories when component mounts
  }, []);

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/product`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      const data = await response.json();
      setAllProduct(data.message);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/subcategories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch subcategories');
      }
      const data = await response.json();
      setSubcategories(data.message);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const deleteProduct = async (_id) => {
    try {
      const res = await fetch(`${apiUrl}/api/product/${_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      alert(data.message);
      fetchAllProduct();
    } catch (err) {
      console.log('Something went wrong');
    }
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setProductName(product.name);
    setProductDescription(product.description);
    setProductSize(product.size);
    setProductColors(product.colors.join(',')); // Convert array to comma-separated string
    setProductPrice(product.price);
    setProductPriority(product.priority);
    setProductSubcategory(product.subcategory);
    setProductImages([]);
  };

  const handleSave = async () => {
    if (!currentProduct) return;

    try {
      // const formData = new FormData();
      // formData.append('name', productName);
      // formData.append('description', productDescription);
      // formData.append('size', productSize);
      // formData.append('colors', productColors);
      // formData.append('price', productPrice);
      // formData.append('priority', productPriority);
      // formData.append('subcategory', productSubcategory);
      
      // Append images if any
      // productImages.forEach((image) => {
      //   formData.append('images', image);
      // });

      const response = await fetch(`${apiUrl}/api/product/${currentProduct._id}`, {
        method: 'PATCH',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({name: productName,description: productDescription, colors: productColors, price: productPrice, priority: productPriority, size: productSize})
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const data = await response.json();
      alert(data.message);
      fetchAllProduct();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="row">
            <div className="col-md-12">
              <div className="App">
                <h1>Product Display</h1>
                <div className="product-list">
                  {allProduct.map((product, index) => (
                    <div className="product-card" key={index}>
                      <img
                        src={`${apiUrl}/${product.images[0]}`}
                        alt={product.name}
                        className="product-image"
                      />
                      <div className="product-details">
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">Price: ₹{product.price}</p>
                        <p className="product-size">Size: {product.size}</p>
                        <p className="product-color">Color: {product.colors.join(', ')}</p>
                      </div>
                      <div className="product-actions">
                        <button
                          className="edit-button"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => handleEditClick(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => deleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Product
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form>
                {/* Name Input */}
                <div className="form-group">
                  <label htmlFor="productName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                {/* Description Input */}
                <div className="form-group">
                  <label htmlFor="productDescription">Description</label>
                  <textarea
                    className="form-control"
                    id="productDescription"
                    placeholder="Enter product description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>

                {/* Size Input */}
                <div className="form-group">
                  <label htmlFor="productSize">Size</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productSize"
                    placeholder="Enter product size"
                    value={productSize}
                    onChange={(e) => setProductSize(e.target.value)}
                  />
                </div>

                {/* Colors Input */}
                <div className="form-group">
                  <label htmlFor="productColors">Colors (comma-separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productColors"
                    placeholder="Enter product colors"
                    value={productColors}
                    onChange={(e) => setProductColors(e.target.value)}
                  />
                </div>

                {/* Price Input */}
                <div className="form-group">
                  <label htmlFor="productPrice">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productPrice"
                    placeholder="Enter product price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>

                {/* Image Input */}
                <div className="form-group">
                  <label htmlFor="productImages">Images</label>
                  <input
                    type="file"
                    className="form-control"
                    id="productImages"
                    multiple
                    onChange={(e) => setProductImages(Array.from(e.target.files))}
                  />
                </div>

                {/* Priority Input */}
                <div className="form-group">
                  <label htmlFor="productPriority">Priority</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productPriority"
                    placeholder="Enter product priority"
                    value={productPriority}
                    onChange={(e) => setProductPriority(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
