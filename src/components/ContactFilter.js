import React, { useState } from "react";
import "./ContactCards.css";
import { Search, ThreeDotsVertical, PersonPlus } from "react-bootstrap-icons";
import ThreeDotsToggle from './ThreeDotsToggle.js'

export default function ContactFilter({ contacts, setContacts, user_id }) {



  return (
    <div id="contact-filter-search">
      <Search id="contact-search-icon" />
      <input type="text" placeholder="Search" id="contact-search-input"></input>
      <PersonPlus id="contact-person-icon" />
      <ThreeDotsToggle id="contact-dots-icon" />
  
     
    </div>
  );
}
