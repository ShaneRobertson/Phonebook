import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import {
  ChevronDoubleDown,
  Telephone,
  Envelope,
  Star,
  StarFill,
} from "react-bootstrap-icons";
import "./ContactCards.css";
import CustomToggle from "./CustomToggle.js";
import { updateContact } from "../api/index.js";

export default function ContactCards({
  contact_id,
  first_name,
  last_name,
  phone_number,
  email,
  image,
  user_id,
  is_favorite,
  setContacts,
  contacts,
}) {
  const [rotateIcon, setRotateIcon] = useState(false);
 const [isFavorite, setIsFavorite] = useState(false);
  const updateContacts = (contactArr, updatedContact) => {
    contactArr.forEach((contact) => {
      if (contact.contact_id === updatedContact.contact_id) {
        contactArr.splice(contactArr.indexOf(contact), 1, updatedContact);
      }
    });
  };

  return (
    <>
      <Accordion>
        <Card className="contact-container">
          <Card.Header className="contact-header">
            <img src={image} id="contact-image" alt="Your contact" />
            <span>
              {first_name} {last_name}
            </span>
            { isFavorite ? (
              <StarFill /* onClick={() => {
                setIsFavorite(currentFav  => !currentFav)
              }}   */
                onClick={async () => {
                  let contactsCopy = [...contacts];
                  const result = await updateContact(
                    contact_id,
                    user_id,
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    false
                  );
                  updateContacts(contactsCopy, result)
                  setContacts(contactsCopy);
                  setIsFavorite(currentFav  => !currentFav)
                }}
              />
            ) : (
              <Star onClick={() => {
                setIsFavorite(currentFav  => !currentFav)
              }}
                // onClick={async () => {
                //   let contactsCopy = [...contacts];
                //   const result = await updateContact(
                //     contact_id,
                //     user_id,
                //     "",
                //     "",
                //     "",
                //     "",
                //     "",
                //     "",
                //     true
                //   );
                //   updateContacts(contactsCopy, result)
                //   setContacts(contactsCopy);
                //   setIsFavorite(!isFavorite)
                // }}
              />
            )}
            <CustomToggle eventKey="0">
              <ChevronDoubleDown
                style={{
                  transform: rotateIcon ? "rotate(180deg)" : "",
                  transition: ".5s",
                }}
                onClick={() => {
                  setRotateIcon(!rotateIcon);
                }}
              />
            </CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Card.Text>
                <Telephone /> {phone_number}
              </Card.Text>
              <Card.Text>
                <Envelope /> {email}
              </Card.Text>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}
