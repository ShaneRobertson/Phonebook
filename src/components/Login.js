import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {loginUser} from '../api/index'

import "./login.css";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleChanges = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <Form onSubmit={async (event) => {
            event.preventDefault()
            try {
                const userObj = await loginUser(credentials.username, credentials.password)
                console.log('the userObj in the front end: ', userObj)
            } catch (error){
                console.log('The login error: ', error)
            }
            
        }}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={credentials.username}
            onChange={handleChanges}
            required
            minLength="5"
            maxLength="15"
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name='password'
            value={credentials.password}
            onChange={handleChanges}
            required
            minLength="5"
            maxLength="15"
          />
        </Form.Group>

        <Button variant="primary" type="submit" >
          Login
        </Button>
      </Form>
    </div>
  );
}
