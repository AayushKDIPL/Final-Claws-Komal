import React, { useEffect, useState } from 'react';
import './AddProduct.css';
const apiUrl = process.env.REACT_APP_API_URL;

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    colors: [''],
    images: null,
    size: [''], // Added size field here
    subcategory: '',
    priority: ''
  });

  const [errors, setErrors] = useState({});
  const [subcategory, setSubcategory] = useState([]);

  useEffect(() => {
    getSubcategory();
  }, []);

  const getSubcategory = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/subcategory`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setSubcategory(data.message);
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  // Validation function
  const validate = () => {
    let tempErrors = {};
    if (!product.name) tempErrors.name = "Name is required";
    if (!product.description) tempErrors.description = "Description is required";
    if (!product.price) tempErrors.price = "Price is required";
    if (isNaN(product.price)) tempErrors.price = "Price must be a number";
    if (!product.subcategory) tempErrors.subcategory = "Subcategory is required";
    if (!product.priority) tempErrors.priority = "Priority is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'colors') {
      const colors = [...product.colors];
      colors[e.target.dataset.index] = value;
      setProduct({ ...product, colors });
    } else if (name === 'size') {
      const size = [...product.size];
      size[e.target.dataset.index] = value;
      setProduct({ ...product, size });
    } else if (name === 'images') {
      setProduct({ ...product, images: files });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleColorChange = (index, e) => {
    const colors = [...product.colors];
    colors[index] = e.target.value;
    setProduct({ ...product, colors });
  };

  const handleSizeChange = (index, e) => {
    const size = [...product.size];
    size[index] = e.target.value;
    setProduct({ ...product, size });
  };

  const addColorField = () => {
    setProduct({ ...product, colors: [...product.colors, ''] });
  };

  const addSizeField = () => {
    setProduct({ ...product, size: [...product.size, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    product.colors.forEach((color, index) => formData.append(`colors[${index}]`, color));
    product.size.forEach((size, index) => formData.append(`size[${index}]`, size)); // Add size to form data
    if (product.images) {
      Array.from(product.images).forEach((image, index) => {
        formData.append('images', image);
      });
    }
    formData.append('subcategory', product.subcategory);
    formData.append('priority', product.priority);

    try {
      const response = await fetch(`${apiUrl}/api/product`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Product added successfully');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="row">
          <div className="col-md-12">
            <div className='form-main'>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>
                <div>
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                  ></textarea>
                  {errors.description && <span className='text-danger'>{errors.description}</span>}
                </div>
                <div>
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                  />
                  {errors.price && <span className='text-danger'>{errors.price}</span>}
                </div>
                <div>
                  <label>Size:</label>
                  {product.size.map((size, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        name="size"
                        data-index={index}
                        value={size}
                        onChange={(e) => handleSizeChange(index, e)}
                      />
                    </div>
                  ))}
                  <button type="button" onClick={addSizeField}>Add Size</button>
                </div>
                <div>
                  <label>Colors:</label>
                  {product.colors.map((color, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        name="colors"
                        data-index={index}
                        value={color}
                        onChange={(e) => handleColorChange(index, e)}
                      />
                    </div>
                  ))}
                  <button type="button" onClick={addColorField}>Add Color</button>
                </div>
                <div>
                  <label>Images:</label>
                  <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Subcategory:</label>
                  <select name="subcategory" value={product.subcategory} onChange={handleChange}>
                    <option value="">Select Subcategory</option>
                    {subcategory.map((e) => (
                      <option key={e._id} value={e._id}>{e.name}</option>
                    ))}
                  </select>
                  {errors.subcategory && <span className='text-danger'>{errors.subcategory}</span>}
                </div>
                <div>
                  <label>Priority:</label>
                  <input
                    type="text"
                    name="priority"
                    onChange={handleChange}
                  />
                  {errors.priority && <span className='text-danger'>{errors.priority}</span>}
                </div>
                <button type="submit">Add Product</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddProduct;
