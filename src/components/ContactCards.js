import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { ChevronDoubleDown, Telephone, Envelope } from "react-bootstrap-icons";
import "./ContactCards.css";
import CustomToggle from "./CustomToggle.js";
import Radium from 'radium'

export default function ContactCards({
  contact_id,
  first_name,
  last_name,
  phone_number,
  email,
  image,
}) {
  const [rotateIcon, setRotateIcon] = useState(false);

  return (
    <>
      <Accordion>
        <Card className="contact-container">
          <Card.Header className="contact-header">
           
              <img src={image} id="contact-image" alt="Your contact" />

            <span>
              {first_name} {last_name}
            </span>
            <CustomToggle eventKey="0">
              {" "}

              <ChevronDoubleDown              
                style={{
                  transform: rotateIcon ? "rotate(180deg)" : "",
                  transition: ".5s"
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
