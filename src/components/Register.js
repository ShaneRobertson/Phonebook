import React from "react";
import {useHistory} from 'react-router-dom'
import "./register.css";
import { Form, Button } from "react-bootstrap";

export default function Register() {

    const history = useHistory()

  return (
    <div className="register-form">
        <h2>Register below</h2>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter username" minLength='8' required/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" minLength='8' required />
        </Form.Group>
        <Form.Text className="text-muted">
      Already a member? Sign in <span id='register-login-button' onClick={() => {
          history.push('/login')
      }}>here!</span>
    </Form.Text>
        <Button variant="primary" type="submit" onSubmit={() => {

        }}>
          Register
        </Button>
      </Form>
    </div>
  );
}
