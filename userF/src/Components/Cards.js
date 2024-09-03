import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Cardsdata from './CardsData'
import { NavLink } from 'react-router-dom';
// import "..style/Card.css";
import { useDispatch } from 'react-redux';
import { ADD } from '../redux/actions/action';
const apiUrl = process.env.REACT_APP_API_URL;

// Example assuming Cards.js is in ./src/components/Cards.js
// import Cards from './components/Cards';
const Cards = () => {

  const [data, setData] = useState(Cardsdata);
  // console.log(data);
  const dispatch = useDispatch();
  const send = (e) => {
    // console.log(e);  
    alert("Item has been added to cart!")

    dispatch(ADD(e));

  }
  const filterItem = (categItem) => {
    const updateItems = Cardsdata.filter((curEle) => {
      return curEle.category === categItem;
    })

    setData(updateItems);
  }
  const handleClick = (element) => {
    console.log(element);
  }
  return (
    <div className='container mt-3'>

      <h3 className="text-center p-3" style={{ fontWeight: '500', fontFamily: 'Montserrat;' }}>Products Details</h3>
      <hr />

      <div className='container mx-auto'>
        <button class="button mx-3 mb-2" onClick={() => setData(Cardsdata)}>
          <span class="button_lg">
            <span class="button_sl"></span>
            <span class="button_text">All Product</span>
          </span>
        </button>

        <button class="button mx-3 mb-2" onClick={() => filterItem('Equipment')}>
          <span class="button_lg">
            <span class="button_sl"></span>
            <span class="button_text">Equipment</span>
          </span>
        </button>

        <button class="button mx-3 mb-2" onClick={() => filterItem('Merchandise')}>
          <span class="button_lg">
            <span class="button_sl"></span>
            <span class="button_text">Merchandise</span>
          </span>
        </button>
        {/* <button className='btn btn-dark mx-2' onClick={()=>setData(Cardsdata)}>All</button>
        <button className='btn btn-dark mx-2' onClick={()=>filterItem('Equipment')}>Equipment</button>
        <button className='btn btn-dark mx-2' onClick={()=>filterItem('Merchandise')}>Merchandise</button>
        */}
      </div>

      <div className=" d-flex flex-wrap justify-content-center align-items-center">
        {
          data.map((element, id) => {
            return (
              <>

                <Card key={id} style={{ width: '22rem', border: "none", cursor: "default" }} className="mx-2 mt-4 card_style">
                  <NavLink to={`/product_details/${element.id}`} style={{ textDecoration: "none", color: "black" }}>
                    <Card.Img variant="top" src={element.imgdata} style={{ height: "16rem", borderRadius: '5px' }} className="mt-3 p-3 shadow" />
                  </NavLink>
                  <Card.Body>
                    <Card.Title>{element.rname}</Card.Title>
                    <Card.Text>
                      Price : ₹ {element.price}
                    </Card.Text>
                    <div className="button_div d-flex justify-content-between">

                      <button class="button">
                        <span class="button_lg" onClick={() => {

                          send(element);
                        }}>
                          <span class="button_sl"></span>
                          <span class="button_text">Add to cart!</span>
                        </span>
                      </button>
                      {/*                   
          <Button variant="dark"
                       
                        className='col-lg-5'><strong>Add to Cart</strong> </Button> */}
                    </div>
                  </Card.Body>
                </Card>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cards