import React, { useState } from "react";
import tshirt from "../img/product-1.JPG";
// Import your CSS file for additional styling
import Categories from "./Categories";
import cable from "../img/cable.jpg";
import Claws_Arm_Wrestling_Table from "../img/Claws_Arm_Wrestling_Table.png";
import table from "../img/table.jpg" 
const apiUrl = process.env.REACT_APP_API_URL;
 
export default function ArmWrestingT() {
  const [data,setData]=useState([Categories]);
  const [cart, setCart] = useState([]); // 
  const handleAddToCart = (Categories) => {
    // Retrieve the existing cart data from localStorage
    const cartData = localStorage.getItem('cartData');
    let cart = cartData ? JSON.parse(cartData) : [];

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.title === Categories.title);

    if (existingProductIndex !== -1) {
      // If the product exists, increment the quantity
      cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
      // If the product does not exist, add it to the cart with quantity 1
      cart.push({ ...Categories, quantity: 1 });
    }

    // Save the updated cart data to localStorage
    localStorage.setItem('cartData', JSON.stringify(cart));

    // Provide feedback to the user
    alert('Product added to cart!');
  };

  return (
    <div className="tshirt-container me-4">
      <h1 className="text-center text-dark">Arm Wrestling Table</h1>
      <div className="container-fluid mx-2  ">
        <div className="row mt-5 ">
           
          <div className="col-md-12">
            <div className="row">
              {data.map((values)=>{
                const {id,title,price,image}=values;
                return(
                  <>
                  <div className="col-md-12" key={id} >
                    <div className="row">
                <div className="card">
                  <img src={values.image} className="card-img-top imgdata" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p>Price: ₹2499.00  &nbsp; Offer: 20%off</p>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <button href="#" class="btn btn-dark w-50">
                      Buy now
                    </button>
                  </div>
                </div>
                <div className="card">
                  <img src={Claws_Arm_Wrestling_Table} className="card-img-top imgdata" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p>Price: ₹2299.00  &nbsp; Offer: 2%off</p>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <button href="#" class="btn btn-dark w-50">
                      Buy now
                    </button>
                  </div>
                </div>
                <div className="card">
                  <img src={table} className="card-img-top imgdata" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p>Price: ₹2499.00  &nbsp; Offer: 20%off</p>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <button onClick={() => handleAddToCart(values)} className="btn btn-dark w-50">
                              Add to Cart
                            </button>
                  </div>
                </div>
              </div>
              </div>
                  </>
                )
              })}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
