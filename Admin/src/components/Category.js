import React, { useEffect, useState } from 'react';
import './Category.css';
const apiUrl = process.env.REACT_APP_API_URL;

const Category = () => {
  const [formData, setFormData] = useState({
    name: '',
    categoryType: '',
    priority: '',
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  console.log("sub", subcategories);
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    getSubcategory();
  },[])

  // Validation function
  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.categoryType) tempErrors.categoryType = "Category type is required";
    if (!formData.priority) tempErrors.priority = "Priority is required";
    if (isNaN(formData.priority) || formData.priority <= 0) tempErrors.priority = "Priority must be a positive number";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res=await fetch(`${apiUrl}/api/subcategory`,{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({name: formData.name, priority: formData.priority , category: formData.categoryType})
    });
    const data=await res.json();
    alert(data.message);
    getSubcategory();
  };

  const getSubcategory = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/subcategory`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const data = await res.json();
      
      // Check if data.message is an array; if not, convert it to an array
      const subcategories = Array.isArray(data.message) ? data.message : [data.message];
      
      setSubcategories(subcategories);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      // Handle error as needed, e.g., show a message to the user
    }
  };

  const deleteCat=async(_id)=>{
    const res=await fetch(`${apiUrl}/api/subcategory/${_id}`,{
      method: 'DELETE',
      headers: {'Content-Type':'application/json'}
    });
    const data=await res.json();
    alert(data.message);
    getSubcategory();
  }
  

  return (
    <div className="content-wrapper">
        <section className="content-header">
            <div className="row">
                <div className="col-md-12">
                    <div className="category-container">
                        <div className="form-container">
                            <h2>Add Category</h2>
                            <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                />
                                {errors.name && <span className="error">{errors.name}</span>}
                            </div>
                        <div className="form-group">
                            <label htmlFor="categoryType">Category Type:</label>
                                <select
                                id="categoryType"
                                name="categoryType"
                                value={formData.categoryType}
                                onChange={handleChange}
                                >
                                <option value="">Select Category Type</option>
                                <option value="EQUIPMENT">EQUIPMENT</option>
                                <option value="MERCHANDISE">MERCHANDISE</option>
                                </select>
                                {errors.categoryType && <span className="error">{errors.categoryType}</span>}
                        </div>
                            <div className="form-group">
                                <label htmlFor="priority">Priority:</label>
                                <input
                                type="number"
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                />
                                {errors.priority && <span className="error">{errors.priority}</span>}
                            </div>
                                <button type="submit">Add Category</button>
                                </form>
                            </div>
                            <div className="view-container">
                                <h2>View Categories</h2>
                                {subcategories.length > 0 ? (
                                <ul className="category-list">
                                    {subcategories.map((cat, index) => (
                                    <li key={index} className="category-item">
                                        <strong>Name:</strong> {cat.name} <br />
                                        <strong>Type:</strong> {cat.category} <br />
                                        <strong>Priority:</strong> {cat.priority}
                                        <button className='delete-subcategory' onClick={()=> deleteCat(cat._id)}>Delete</button>
                                    </li>
                                    ))}
                                </ul>
                                ) : (
                                <p>No categories added yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
  );
};

export default Category;
