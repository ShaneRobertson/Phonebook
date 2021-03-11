import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { loginUser } from "../api/index";
import {useHistory} from 'react-router-dom'
import {getContacts} from '../api/index.js'
import "./login.css";

export default function Login({setContacts}) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const handleChanges = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const history = useHistory()

  return (
    <div className="login-form">
      <h2>Login</h2>
      <Form
        onSubmit={async (event) => {
          event.preventDefault();
          setUsernameError(false)
          setPasswordError(false)
          try {
            const userObj = await loginUser(
              credentials.username,
              credentials.password
            );
            console.log('th e userobj: ', userObj)
            setCredentials({ username: "", password: "" });
            console.log('the userObj: ', userObj)
            if (userObj.usernameError) {
              setUsernameError(true);
            }
            if (userObj.passwordError) {
              setPasswordError(true);
            }
            if(userObj.token){
              localStorage.setItem('token', userObj.token)
              const allContacts = await getContacts(userObj.user.user_id)
              localStorage.setItem('contacts', JSON.stringify(allContacts))
              setContacts(allContacts)
              console.log('all the contacts: ', allContacts)
              history.push('/contacts')
            }
            
          } catch (error) {
            console.log("The login error: ", error);
          }
        }}
      >
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
            autoComplete="off"
          />
        </Form.Group>
        {usernameError && credentials.username.length === 0 ? (
          <p style={{ color: "red", fontSize: ".8rem" }}>
            Invalid username. Try again.
          </p>
        ) : (
          ""
        )}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={handleChanges}
            required
            minLength="5"
            maxLength="15"
          />
        </Form.Group>
        {passwordError && credentials.password.length === 0 ? (
          <p style={{ color: "red", fontSize: ".8rem" }}>
            Invalid password. Try again.
          </p>
        ) : (
          ""
        )}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
