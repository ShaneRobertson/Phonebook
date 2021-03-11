import React from "react";
import ContactCards from "./ContactCards";

export default function ContactList({ contacts }) {
  return (
    <>
      {contacts.map((contact) => {
        const {
          contact_id,
          first_name,
          last_name,
          phone_number,
          email,
          image,
        } = contact;
        return (
          <ContactCards
            key={contact_id}
            first_name={first_name}
            last_name={last_name}
            phone_number={phone_number}
            email={email}
            image={image}
          />
        );
      })}
    </>
  );
}
