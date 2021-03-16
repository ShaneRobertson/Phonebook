import React, { useState } from "react";
import { PersonFill, ShieldLockFill } from "react-bootstrap-icons";
import { loginUser } from "../api/index";
import { useHistory } from "react-router-dom";
import { getContacts } from "../api/index.js";
import "./login.css";

export default function Login({ setContacts, setUser_id }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const handleChanges = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const history = useHistory();

  return (
    <div className="login-container">
      <h2>Welcome</h2>
      {usernameError && credentials.username.length === 0 ? (
        <span style={{ color: "red", fontSize: ".9rem", marginLeft: "3rem" }}>
          Invalid username. Try again.
        </span>
      ) : (
        ""
      )}
      {passwordError && credentials.password.length === 0 ? (
        <span style={{ color: "red", fontSize: ".9rem", marginLeft: "18rem" }}>
          Invalid password. Try again.
        </span>
      ) : (
        ""
      )}
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setUsernameError(false);
          setPasswordError(false);
          try {
            const userObj = await loginUser(
              credentials.username,
              credentials.password
            );
            setCredentials({ username: "", password: "" });
            console.log("the userObj: ", userObj);
            if (userObj.usernameError) {
              setUsernameError(true);
            }
            if (userObj.passwordError) {
              setPasswordError(true);
            }
            if (userObj.token) {
              localStorage.setItem("token", userObj.token);
              const allContacts = await getContacts(userObj.user.user_id);
              localStorage.setItem("contacts", JSON.stringify(allContacts));
              setContacts(allContacts);
              setUser_id(userObj.user.user_id);

              console.log("all the contacts: ", allContacts);
              history.push("/contacts");
            }
          } catch (error) {
            console.log("The login error: ", error);
          }
        }}
      >
        <div className="login-input-container">
          <PersonFill className="login-icon" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChanges}
            required
            minLength="5"
            maxLength="15"
            autoComplete="off"
          />

          <ShieldLockFill className="login-icon" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={handleChanges}
            required
            minLength="5"
            maxLength="15"
          />
        </div>

        <br />
        <button variant="primary" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}
