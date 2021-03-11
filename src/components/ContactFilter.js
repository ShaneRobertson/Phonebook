import React, { useState } from "react";
import "./ContactCards.css";
import { getPersonalContacts, getBusinessContacts } from "../api/index.js";

export default function ContactFilter({ contacts, setContacts, user_id }) {
  console.log("user_id in the contactFilter: ", user_id);
  return (
    <>
      <ul id="contact-filter">
        <li
          onClick={async () => {
            try {
              const personalContacts = await getPersonalContacts(user_id);
              setContacts(personalContacts);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Personal
        </li>
        <li
          onClick={async () => {
            try {
              const businessContacts = await getBusinessContacts(user_id);
              setContacts(businessContacts);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Business
        </li>
        <li>Favorites</li>
      </ul>
    </>
  );
}
