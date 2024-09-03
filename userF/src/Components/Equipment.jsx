import React from 'react';
import equipment from "../img/table.jpg";
import merchandise from "../img/product-1.JPG";
import "../style/Equipment.css";
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

function Equipment() {
  return (
    <div className="euip">
    <div className="equip-container">
      <div className="equip-box equip-box1">
        <div data-aos="fade-right">
          <img src={equipment} alt="Equipment" className="equip-img" />
        </div>
      </div>
      <div className="equip-box equip-box2">
      <div data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500"
 className="box-2">
          <h1>EQUIPMENT</h1>
          <div className="equip-description">
            Claws line of tables, pulley systems, and strength building grips and handles set a new standard in armwrestling equipment. Time to get massive.
          </div>
          <Link to={"/equipment"}><button type="button" className="btn1 bt-red"> View Equipment</button> </Link>
        </div>
      </div>
    </div>
    <div className="equip-container">
    
    
      <div className="equip-box equip-box2">
      <div data-aos="fade-up"
     data-aos-duration="1500" className="box-2">
          <h1>MERCHANDISE</h1>
          <div className="equip-description">
          If you're a proud member of the armwrestling community, shop the latest Clwas Gear at our Official Online Shop of apparel, hats, tees, and more.
          </div>
          <Link to={"/merchandise"}><button type="button" className="btn1 bt-red">View Merchandise</button></Link>
        </div>
      </div>
      <div className="equip-box equip-box1">
        <div data-aos="fade-right">
          <img src={merchandise} alt="Equipment" className="equip-img" />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Equipment;
