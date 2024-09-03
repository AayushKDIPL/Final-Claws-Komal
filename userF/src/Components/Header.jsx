import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../img/logo1.png";
import "../style/Header.css";
import "../style/Search.css";
import Cart from "./Cart";
const apiUrl = process.env.REACT_APP_API_URL;

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [getCart, setGetCart] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [getMSubcategories, setGetMSubcategories] = useState([]);
  const [getESubcategories, setGetESubcategories] = useState([]);
  const [merchandiseDropdown, setMerchandiseDropdown] = useState([]);
  const [equipmentSubcategory, setEquipmentSubcategory] = useState([]);
  const [merchandiseSubcategory, setMerchandiseSubcategory] = useState([]);
  const [equipmentDropdown, setEquipmentDropdown] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };


  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setSearchOpen(false);

    if (searchTerm.trim()) {
      // Navigate to search results page and pass searchTerm
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
    setSearchTerm('');
  };



  const handleOffcanvasClick = () => {
    setOffcanvasOpen(!offcanvasOpen);
  };
    const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getSubcategory();

    // Check for cart data in localStorage
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

  }, [token]);




  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      const data = await response.json();
      alert(data.message); // "signout success"

      // Remove token from localStorage
      localStorage.removeItem("accessToken");

      // Update isLoggedIn state
      setIsLoggedIn(false);
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };



  const formatNameForUrl = (name) => {
    return name.toLowerCase().replace(/ /g, '-');
  };





  useEffect(() => {
    getMerchandiseDropdown();
    getEquipmentDropdown();
  }, []);

  useEffect(() => {
    const cartData = localStorage.getItem("cartData");
    if (cartData) {
      try {
        const parsedData = JSON.parse(cartData);
        setGetCart(parsedData);
      } catch (error) {
        console.error("Error parsing cartData from localStorage", error);
        setGetCart([]);
      }
    }
  }, []);

  const getSubcategory = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/subcategory`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await res.json();
  
      if (!data.success) {
        throw new Error('Failed to fetch data');
      }
  
      // Temporary arrays to store subcategories
      const equipmentSubcategories = [];
      const merchandiseSubcategories = [];
  
      // Loop through the subcategories and classify them
      for (let i = 0; i < data.message.length; i++) {
        const subcategory = data.message[i];
  
        if (subcategory.category === "EQUIPMENT") {
          equipmentSubcategories.push(subcategory);
        } else {
          merchandiseSubcategories.push(subcategory);
        }
      }
  
      // Update state once with all accumulated subcategories
      setEquipmentSubcategory(prevState => [...prevState, ...equipmentSubcategories]);
      setMerchandiseSubcategory(prevState => [...prevState, ...merchandiseSubcategories]);
  
    } catch (e) {
      console.error("An error occurred:", e.message);
    }
  };
  
  

  const getMerchandiseDropdown = async () => {
    try {
      const response = await fetch(`${apiUrl}/merchandise`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      setMerchandiseDropdown(json);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getEquipmentDropdown = async () => {
    try {
      const response = await fetch(`${apiUrl}/equipment`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      setEquipmentDropdown(json);
    } catch (error) {
      console.log(error.message);
    }
  };

  let count = getCart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#1c1b1b" }}>
        <div className="container-fluid">
          <a href="/">
            <img className="logo" src={logo1} alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <a href="/">
                  <img className="logo" src={logo1} alt="logo" />
                </a>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-start text-white flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">HOME</Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/merchandise"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    MERCHANDISE
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  {merchandiseSubcategory.map((item) => (
                    <li key={item._id}>
                      <Link
                        to={`/filter/${formatNameForUrl(item.name)}`}
                        className="dropdown-item"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink2"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    EQUIPMENT
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
                    {equipmentSubcategory.map((item) => (
                      <li key={item._id}>
                      <Link
                        to={`/filter/${formatNameForUrl(item.name)}`}
                        className="dropdown-item"
                      >
                        {item.name}
                      </Link>
                    </li>
                    ))}
                  </ul>
                </li>

                {/* Conditional Rendering Based on Login Status */}
                {isLoggedIn ? (
                  <li className="nav-item">
                    <Link to="/" className="nav-link active" aria-current="page" onClick={handleLogout}>LOGOUT</Link>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/Login" className="nav-link active" aria-current="page">LOGIN</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Signup" className="nav-link active" aria-current="page">SIGNUP</Link>
                    </li>
                  </>
                )}
                <div className="so_icon">
                  <ul className="social-icon">
                    <a href="#">
                      <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </ul>
                </div>
              </ul>
            </div>
          </div>

          {/* ------ search and cart icon --------- */}
          <div className="nav-icon d-flex">
            <i className="fas fa-search" onClick={handleSearchClick}></i>
            <button
              className="btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            ></button>
            <Link className="text-decoration-none list-unstyled" to="/mycart">
              <i className="fa-solid fa-store"></i>
              {/* <span className="text-white">{count}</span> */}
            </Link>
          </div>
          {isLoggedIn ? (
                  <div><Link to={"/finalp"}><i className="fa-solid fa-user profile-icon"></i></Link></div>
                ) : (
                  ""
                )}

          {searchOpen && (
            <div className="search-bar">
            <form onSubmit={handleSearchSubmit}>
                <input className="search-input" type="text" placeholder="Search for products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button type="submit" className="search-button">Search</button>
              </form>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
