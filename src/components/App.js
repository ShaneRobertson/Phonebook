import React from "react";
import { Route } from "react-router-dom";
//import ContactList from "./ContactList.js";
//import LandingPage from "./LandingPage.js";
import Login from "./Login.js";
import Register from "./Register.js";

function App() {
  return (
    <div className="app">
      <div className='landingPage'>
      <Route exact path="/">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      </div>
   
    </div>
  );
}

export default App;
