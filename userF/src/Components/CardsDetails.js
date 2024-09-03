import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DLT,ADD,REMOVE } from '../redux/actions/action'
const apiUrl = process.env.REACT_APP_API_URL;


const CardsDetails = () => {

 
  const [data,setData] = useState([]);
  // console.log(data);

  const {id} = useParams();
  // console.log(id);

  const history = useNavigate();

  const dispatch = useDispatch();

  
  const getdata = useSelector((state)=> state.cartreducer.carts);
  // console.log(getdata);


  const compare = ()=>{
    let comparedata = getdata.filter((e)=>{
      return e.id == id
    });
    // console.log(comparedata);
    setData(comparedata);
  }

  // add data
  

  const send = (e)=>{
    // console.log(e);
    dispatch(ADD(e));
  }
  
  const dlt = (id)=>{
    dispatch(DLT(id));
    history("/");
}

// remove one
const remove = (item)=>{
  dispatch(REMOVE(item))
}


  useEffect(()=>{
    compare();
  },[id])

  return (
    <>
      <div className="container mt-2">
        <h3 className='text-center' style={{fontWeight:'500', fontFamily:'Montserrat;'}}>Iteams Details Page
        </h3>

        <section className='container mt-3'>
          <div className="iteamsdetails">
          {
            data.map((ele)=>{
              return (
                <>
                <div className="items_img ps-3 mx-4 mt-2" style={{boxShadow:'3px 3px 3px 6px grey', borderRadius:'5px'}}>
              <img  src={ele.imgdata} alt="" />
            </div>

            <div className="details p-3">
              <Table>
                <tr>
                  <td>
                    <p> <strong>Product Name</strong>  : {ele.rname}</p>
                    <p><strong>Order Review :</strong> <span >{ele.somedata}	</span></p>
                    <p> <strong>Price</strong>  : ₹ {ele.price}</p>
                    <p> <strong>Total</strong>  :₹  {ele.price * ele.qnty}</p>

                    <div className='row'>

                      <div className='col-sm-6'>
                      <div className='p-2 mt-2 mx-3 d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                    <span style={{fontSize:24}} onClick={ele.qnty <=1 ? ()=>dlt(ele.id) : ()=>remove(ele)}>-</span>
                    <span style={{fontSize:22}}>{ele.qnty}</span>
                    <span style={{fontSize:24}} onClick={()=>send(ele)}>+</span>

                    </div>

                      </div>
                      <div className='col-sm-6'>
                      <p className='p-3'><strong>Remove :</strong> <span ><i className='fas fa-trash' onClick={()=>dlt(ele.id)} style={{color:"red",fontSize:20,cursor:"pointer"}}></i>	</span></p>
                 

                      </div>
                    </div>
                    
                    
                  </td>
                  <td>
                    
                     </td>
                </tr>
              </Table>
            </div>
          
                </>
              )
            })
          }
          </div>
        </section>
      </div>
    </>
  )
}

export default CardsDetails