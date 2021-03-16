import React, {useState} from "react";
import { Route } from "react-router-dom";
import ContactList from "./ContactList.js";
//import DisplayContact from "./DisplayContact.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ContactFilter from "./ContactFilter.js"

function App() {
  const [contacts, setContacts] = useState([])
  const [user_id, setUser_id] = useState('')
  return (
    <div className="app">
      <Route exact path="/">
        <Register />
      </Route>
      <Route path="/login">
        <Login setContacts={setContacts} setUser_id={setUser_id}/>
      </Route>
      <div className='contacts-list'>
      <Route path="/contacts">
        <ContactFilter contacts={contacts} setContacts={setContacts} user_id={user_id}/>
        <ContactList contacts={contacts} setContacts={setContacts}/>   
      </Route>
      </div>
   
    </div>
  );
}

export default App;
