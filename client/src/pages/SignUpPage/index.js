import React, { useState } from "react";
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Form, Button } from 'react-bootstrap';
import ContentContainer from '../../components/ContentContainer';

const SignUpPage = ({ setAlert, register, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    cPassword: ''
  });
  const { firstname, lastname, email, password, cPassword } = formData;

  const handleOnChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!firstname && !lastname && !email && !password && !cPassword) {
      setAlert("All Fields are Required", "danger");
    } else if (password !== cPassword) {
      setAlert("Passwords must match", "danger");
    } else {
      register(formData);
      // setFormData({...formData, [firstname] : "",[lastname] : "", [email] : "", [firstname] : "",})
    }

  };

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (!firstname && !lastname && !email && !password && !cPassword) {
        setAlert("All Fields are Required", "danger");
      } else if (password !== cPassword) {
        setAlert("Passwords must match", "danger");
      } else {
        register(formData);
        // setFormData({...formData, [firstname] : "",[lastname] : "", [email] : "", [firstname] : "",})
      }
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>

      <ContentContainer>
        <h3>Sign Up</h3>
        <Form onKeyDown={handleKeyPress}>
          <Form.Group >
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstname" onChange={handleOnChange} placeholder="First Name" />
          </Form.Group>
          <Form.Group >
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastname" onChange={handleOnChange} placeholder="Last Name" />
          </Form.Group>
          <Form.Group >
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" onChange={handleOnChange} placeholder="Email Address" />
          </Form.Group>
          <Form.Group >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" onChange={handleOnChange} placeholder="Password" />
          </Form.Group>
          <Form.Group >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="cPassword" onChange={handleOnChange} placeholder="Confirm Password" />
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={handleFormSubmit}>Register</Button>{' '}Do you have an account? <Link to="/login" >Log In</Link>
      </ContentContainer>
    </>
  );
};

//Assigning Proptypes for linting
SignUpPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

//Getting state from store and use it for component prop consuming
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

//Exporting and connecting to our store
export default connect(
  mapStateToProps,
  { setAlert, register }
)(SignUpPage);