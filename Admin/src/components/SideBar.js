import React, {Component, useEffect, useState} from 'react';
const apiUrl = process.env.REACT_APP_API_URL;

const SideBar=()=> {

    const [profileData, setProfileData]=useState({});
    const [user, setUser]=useState();
    const [userCount, setUserCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [subcategoryCount, setSubcategoryCount] = useState(0);
    const [productCount, setProductCount] = useState(0);

    console.log(profileData);

    useEffect(() => {
        // Retrieve user from local storage
        const _id = localStorage.getItem('Email');
        const token = localStorage.getItem('accesstoken');
        setUser(_id);
    
        // Fetch user data and cart data when component mounts
        fetchUserData(_id, token);
        fetchAllUser();
        fetchAllOrder();
        getSubcategory();
        fetchAllProduct();
      }, []);


      const fetchAllUser = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setUserCount(data.message.length);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      const fetchAllOrder = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/order`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setOrderCount(data.message.length);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      const getSubcategory = async () => {
        try {
          const res = await fetch(`${apiUrl}/api/subcategory`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          
          const data = await res.json();
          setSubcategoryCount(data.message.length);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
          // Handle error as needed, e.g., show a message to the user
        }
      };

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
          setProductCount(data.message.length);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };

    // Function to fetch user data
  const fetchUserData = async (_id, token) => {
    try {
      const response = await fetch(`${apiUrl}/api/user/${_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setProfileData(data.message);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <a href="#"><i className="fa fa-circle text-success"></i> Hi, </a>
                            <p>{profileData.name}</p>
                        </div>
                    </div>
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                        <input type="text" name="q" className="form-control" placeholder="Search..." />
                        <span className="input-group-btn">
                            <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                            </button>
                        </span>
                        </div>
                    </form>
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">MAIN NAVIGATION</li>
                        <li>
                            <a href="/user">
                            <i class="fa-solid fa-users"></i> <span> User</span>
                                <span className="pull-right-container">
                                <small className="label pull-right bg-green">{userCount}</small>
                                </span>
                            </a>
                        </li>
                        <li className="treeview">
                        <a href="#">
                        <i class="fa-brands fa-product-hunt"></i>
                            <span> Products</span>
                            <span className="pull-right-container">
                                <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a href="/product"><i className="fa fa-circle-o"></i> View Products
                            <span className="pull-right-container">
                                <small className="label pull-right bg-green">{productCount}</small>
                            </span>
                            </a></li>
                            <li><a href="/addproduct"><i className="fa fa-circle-o"></i> Add Products</a></li>
                        </ul>
                        </li>
                        <li>
                        <a href="/category">
                        <i class="fa-solid fa-layer-group"></i> <span> Category</span>
                            <span className="pull-right-container">
                            {/* <small className="label pull-right bg-red">3</small> */}
                            <small className="label pull-right bg-blue">{subcategoryCount}</small>
                            </span>
                        </a>
                        </li>
                        <li>
                        <a href="/order">
                        <i class="fa-solid fa-bag-shopping"></i> <span> Orders</span>
                            <span className="pull-right-container">
                            {/* <small className="label pull-right bg-red">3</small> */}
                            <small className="label pull-right bg-blue">{orderCount}</small>
                            </span>
                        </a>
                        </li>
                    </ul>
                </section>
            </aside> 
        )
    }
export default SideBar
