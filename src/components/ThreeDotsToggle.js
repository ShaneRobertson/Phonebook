import React, {useState} from 'react'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import {ThreeDotsVertical} from 'react-bootstrap-icons'

export default function ThreeDotsToggle({ children, eventKey }) {
 
    const decoratedOnClick = useAccordionToggle(eventKey);
    const [rotateIcon, setRotateIcon] = useState(false)

    return (
      <ThreeDotsVertical
      style={{transform: rotateIcon ? 'rotate(90deg) scale(1.5)' : 'scale(1.5)', transition: '.5s'}}
        onClick={() => {
            decoratedOnClick()
            setRotateIcon(!rotateIcon)
        }}
      >
        {children}
      </ThreeDotsVertical>
    );
  }
