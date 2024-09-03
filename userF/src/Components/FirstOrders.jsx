import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const FirstOrders = () => {

  const [getOrders, setGetOrders]=useState([]);
  const [userId, setUserId]=useState();
  console.log("userID", userId);
  console.log("Order", getOrders);

  useEffect(() => {
      getCartFromCart();
      getOrder();
  },[]);


  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      // Redirect to login if token is not found
      navigate('/login');
    } else {
      // Optionally, add logic here to validate token
      // For example, send a request to the server to verify the token
    }
  }, [navigate]);

    const getCartFromCart=()=>{
        const storedUser = localStorage.getItem('user');
        setUserId(storedUser);
    }

  const getOrder=async()=>{
      const _id = localStorage.getItem('user');
    try{
      const res=await fetch(`${apiUrl}/api/order/${_id}`,{
        method: 'GET',
        headers: {'Content-Type':'application/json'}
      });
      const data = await res.json();
      const orders = Array.isArray(data.message) ? data.message : [data.message];
      setGetOrders(orders);
    }catch(err){
      alert(err.message);
    }
  }

  return (
    <div className="mx-auto my-64 max-w-6xl px-2 md:my-16 md:px-0">
      <h2 className="text-3xl font-bold">Order Details</h2>
      <div className="mt-3 text-sm">
        Check the status of recent and old orders & discover more products
      </div>
      {getOrders.map((e, index)=>{
        return(
          <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
            <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
              <div className="p-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                    <div className="mb-4">
                      <div className="text-sm font-semibold">Order No</div>
                      <div className="text-sm font-medium text-gray-700">{e.orderno}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-semibold">Payment Receipt</div>
                      <div className="text-sm font-medium text-gray-700">{e.razorpayOrderId.receipt}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-semibold">Order Date</div>
                      <div className="text-sm font-medium text-gray-700">{e.createdAt.slice(0, 10)}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-semibold">Delivery Date</div>
                      <div className="text-sm font-medium text-gray-700">{e.deliveryDate.slice(0, 10)}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-semibold">Paid Amount</div>
                      <div className="text-sm font-medium text-gray-700">{e.total}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-semibold">Status</div>
                      <div className="text-sm font-medium text-gray-700">{e.status}</div>
                    </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="p-8">
                <ul className="-my-7 divide-y divide-gray-200">
                  {getOrders[index].cartData.map((product) => (
                    <li
                      className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                    >
                      <div className="flex flex-1 items-stretch">
                        <div className="flex-shrink-0">
                          <img
                            className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                            src={`${apiUrl}/${product.images}`}
                            alt="image/product"
                          />
                        </div>

                        <div className="ml-5 flex flex-col justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">{product.name}</p>
                            <p className="mt-1.5 text-sm font-medium text-gray-500">{product.colors}</p>
                          </div>

                          <p className="mt-4 text-sm font-medium text-gray-500">x {product.quantity}</p>
                        </div>
                      </div>

                      <div className="ml-auto flex flex-col items-end justify-between">
                        <p className="text-right text-sm font-bold text-gray-900">{product.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default FirstOrders