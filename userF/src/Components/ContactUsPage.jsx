import React, { useState } from 'react';
import './ContactUsPage.css'; // Import the CSS file
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const ContactUsPage = () => {
  const navigate = useNavigate();

  // State to store form data and errors
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({}); // State to track errors

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate input fields
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return; // Prevent submission if validation fails

    const emailBody = `
      <p>First Name: ${formData.name}</p>
      <p>Email: ${formData.email}</p>
      <p>Phone: ${formData.phone}</p>
      <p>Message: ${formData.message}</p>
    `;

    window.Email.send({
      Host: "smtp.elasticemail.com",
      Username: "komalsingh552718@gmail.com",
      Password: "754930E034C912C5AD660202516DCC5E67EC",
      To: 'komalsingh552718@gmail.com',
      From: "komalsingh552718@gmail.com",
      Subject: formData.subject,
      Body: emailBody
    }).then(
      () => {
        alert('Query sent successfully!');
        setTimeout(() => {
          navigate("/thanku");
        }, 1000);
      },
      (error) => {
        console.error("Email send failed:", error);
        alert('Failed to send email. Please try again.');
      }
    );
  };

  return (
    <Container className="contact-us-page">
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="text-center">
          <div className="intro-text">
            <p className="intro-subtitle">Get in touch</p>
            <h1 className="intro-title">Let's Talk About Your Idea</h1>
            <p className="intro-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam eius placeat, a quidem mollitia at accusantium reprehenderit pariatur provident nam ratione incidunt magnam sequi.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center text-dark">
        <Col xs={12} md={8}>
          <h2 className="form-heading text-center">Drop Us a Line</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={6} className="mb-3">
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name" 
                    placeholder="Enter your name" 
                    value={formData.name} 
                    onChange={handleChange}
                    isInvalid={!!errors.name} // Add error validation
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    value={formData.email} 
                    onChange={handleChange}
                    isInvalid={!!errors.email} // Add error validation
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} className="mb-3">
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="phone" 
                    placeholder="Enter your phone number" 
                    value={formData.phone} 
                    onChange={handleChange}
                    isInvalid={!!errors.phone} // Add error validation
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Form.Group controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="subject" 
                    placeholder="Enter the subject" 
                    value={formData.subject} 
                    onChange={handleChange}
                    isInvalid={!!errors.subject} // Add error validation
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.subject}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                name="message" 
                placeholder="Your message" 
                value={formData.message} 
                onChange={handleChange}
                isInvalid={!!errors.message} // Add error validation
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="text-center">
              <button type="submit" className="custom-btn">Send</button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUsPage;
