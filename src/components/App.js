import React, {useState} from "react";
import { Route } from "react-router-dom";
import ContactList from "./ContactList.js";
import DisplayContact from "./DisplayContact.js";
import Login from "./Login.js";
import Register from "./Register.js";

function App() {
  const [contacts, setContacts] = useState([])
  return (
    <div className="app">
      <div className='landingPage'>
      <Route exact path="/">
        <Register />
      </Route>
      <Route path="/login">
        <Login setContacts={setContacts}/>
      </Route>
      </div>
      <div className='contacts-list'>
      <Route path="/contacts">
        <ContactList contacts={contacts}/>   
      </Route>
      </div>
   
    </div>
  );
}

export default App;
