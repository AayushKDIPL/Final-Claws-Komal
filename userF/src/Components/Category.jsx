import React, { useState } from "react";
import tshirt from "../img/product-1.JPG";
// Import your CSS file for additional styling
import Categories from "./Categories";
import cable from "../img/cable.jpg";
const apiUrl = process.env.REACT_APP_API_URL;

export default function ArmWrestingT() {
  const [data, setData] = useState([Categories]);
  return (
    <div className="tshirt-container">
      <h1 className="text-center text-info">Let's working</h1>
      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          <div className="col-md-3">
            <button className="btn btn-danger w-100 mb-4">Handle</button>
            <button className="btn btn-danger w-100 mb-4">Grip</button>
            <button className="btn btn-danger w-100 mb-4">Table</button>
            <button className="btn btn-danger w-100 mb-4">Others</button>
          </div>
          <div className="col-md-9">
            <div className="row">
              {data.map((values) => {
                const { id, title, price, image } = values;
                return (
                  <>
                    <div className="col-md-12" key={id}>
                      <div className="card">
                        <img
                          src={tshirt}
                          className="card-img"
                          alt="T-shirt 3"
                        />
                        <p className="card-title">T-shirt Design 3</p>
                        <p className="card-info">
                          Trendy T-shirt with a unique graphic print.
                        </p>
                        <button className="btn btn-secondary">
                          View more...
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
