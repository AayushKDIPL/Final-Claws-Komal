import React, {Component, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const Header=()=> {

    const jump=useNavigate();

    useEffect(()=>{
        const token=localStorage.getItem('accesstoken');
        if(!token){
            jump('/adminlogin')
        }
    });

    const logout=()=>{
        localStorage.removeItem('accesstoken');
        alert("Logout");
        jump('/adminlogin');
    }

        return (
            <header className="main-header">
                <a href="#" className="logo">
                    <span className="logo-mini"><b>A</b>LT</span>
                    <span className="logo-lg"><b>Claws</b>Admin Panel</span>
                </a>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown messages-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa-solid fa-user"></i>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <ul className="menu">
                                            <li>
                                                <Link to="/profile">
                                                    <div className="pull-left">
                                                        <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                                                    </div>
                                                    <p>View Profile</p>
                                                </Link>
                                            </li>
                                            <li onClick={logout}>
                                                <a href="#">
                                                    <div className="pull-left">
                                                        <i class="fa-solid fa-right-from-bracket"></i>
                                                    </div>
                                                    <p>Logout</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
export default Header