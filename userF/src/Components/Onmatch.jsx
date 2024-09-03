import React from 'react';
import tshirt from '../img/tshirt.JPG';
import FAT_GRIP from '../img/FAT_GRIP.JPG';
import table from '../img/table.jpg';
import cable from '../img/cable.jpg';
import '../style/Onmatch.css';
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;


function Onmatch() {
  return (
    <div className="on-mat">
      <div className="box3">
        <div className="container main_div">
          <div className="card">
            <img className="card_img" src={tshirt} alt="Tshirt" />
            <h1 className="card_title"><Link to={`/search?query=${encodeURIComponent('tshirt')}`} className='linkit' >TSHIRT</Link></h1>
          </div>
          <div className="card">
            <img className="card_img" src={FAT_GRIP} alt="Fat Grip" />
            <h1 className="card_title"><Link to={`/search?query=${encodeURIComponent('fat grip')}`} className='linkit' >FAT GRIP</Link></h1>
          </div>
          <div className="card">
            <img className="card_img" src={table} alt="Table" />
            <h1 className="card_title"><Link to={`/search?query=${encodeURIComponent('table')}`} className='linkit' >TABLE</Link></h1>
          </div>
          <div className="card">
            <img className="card_img" src={cable} alt="Cable" />
            <h1 className="card_title"><Link to={`/search?query=${encodeURIComponent('cable')}`} className='linkit' >CABLE</Link></h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onmatch;
