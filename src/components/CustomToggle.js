import React, {useState} from 'react'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import {ChevronDoubleDown} from 'react-bootstrap-icons'

export default function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey);
    const [rotateIcon, setRotateIcon] = useState(false)
    return (
      <ChevronDoubleDown
      style={{transform: rotateIcon ? 'rotate(180deg) scale(1.5)' : 'scale(1.5)', transition: '.5s'}}
        onClick={() => {
            decoratedOnClick()
            setRotateIcon(!rotateIcon)
        }}
      >
        {children}
      </ChevronDoubleDown>
    );
  }