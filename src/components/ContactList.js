import React from 'react'
import ContactCards from './ContactCards'




export default function ContactList({contacts}) {
    
    return (
        <div className='contacts-list'>
            {contacts.map(contact => {
                const {first_name, last_name, phone_number, email} = contact
                return (
                    <ContactCards first_name={first_name} last_name={last_name} phone_number={phone_number} email={email} />
                )
            })}
        </div>
    )
}
