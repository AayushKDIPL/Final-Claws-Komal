import React from 'react';
import Content from "./Content"
import Header from "./Header"
import SideBar from "./SideBar"
const apiUrl = process.env.REACT_APP_API_URL;

const Home=()=>{
    return(
        <div>
            <Content />
        </div>
    )
}
export default Home