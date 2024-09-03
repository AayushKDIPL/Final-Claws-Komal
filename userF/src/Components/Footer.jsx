import React from 'react'
import "../style/Footer.css"
import { Link } from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API_URL;
function Footer() {
  return (
    <div className='footer'> 
    <footer className='footer-box'>
      
        <div className='f-box1'>
          <h5>ABOUT CLAWS</h5>
          <p>claws's goal is to help grow our sport and just make the armwrestling experience more fun. claws will be your guide from which you unlock your armwrestling journey. Beginner to veteran - the home of armwrestling.</p>
          <div>© Copyright 2023 claws. All rights reserved.</div>
          {/* <FontAwesomeIcon icon="fa-brands fa-instagram" /> */}
        </div>
        <div className='f-box2'>
          <h5>QUICK LINKS</h5>
          <ul><Link className='footer-links' to={"/equipment"}>Equipment</Link></ul>
          <ul><Link className='footer-links' to={"/merchandise"}>Merchandise</Link></ul>
          <ul><Link className='footer-links' to={"/contactus"}>Contact Us</Link></ul>
          <ul>App Support</ul>
          <ul>Privacy Policy</ul>
          <ul>Claws Store Terms of Service</ul>
          <ul>Claws Terms & Conditions</ul>
        </div>
        <div className='f-box3'>
          <h5>NEWSLETTER</h5>
          <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
          <input type="email" className='email-box' placeholder='Enter Your email address'/> 
          <h5 className='subs' >SUBSCRIBE</h5>
           
          <ul className='social-icon'>
            <a href="#"><i class="fa-brands fa-facebook"></i></a>
            <a href="#"><i class="fa-brands fa-twitter"></i></a>
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-youtube"></i></a>
          </ul>
         
        </div>
    </footer>
    </div>
  )
}

export default Footer