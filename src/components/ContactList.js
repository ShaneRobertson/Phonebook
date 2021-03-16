import React from "react";
import ContactCards from "./ContactCards";

export default function ContactList({ contacts, setContacts }) {
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
          user_id,
          is_favorite
        } = contact;
        return (
          <ContactCards
            key={contact_id}
            first_name={first_name}
            last_name={last_name}
            phone_number={phone_number}
            email={email}
            image={image}
            user_id={user_id}
            contact_id={contact_id}
            is_favorite={is_favorite}
            setContacts={setContacts}
            contacts={contacts}
          />
        );
      })}
    </>
  );
}
