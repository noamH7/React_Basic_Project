import React, { useState } from 'react'
import '../css/Keyboard.css'
import LayoutChangePanel from '../components/LayoutChangePanel'

const layouts = {
  ENGLISH: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  english: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  hebrew: 'אבגדהוזחטיכלמנסעפצקרשת'.split('').reverse(),
  numbers: '0123456789'.split(''),
  symbols: ['.', ',', '?', '!', '"', "'", '(', ')', '-', '@', ':'],
  emojis: ['😀', '😁', '🤣', '😃', '😅', '😆', '😊', '😋', '😎', '😍', '😘']
}

const Keyboard = ({ onKeyPress }) => {
  const [layout, setLayout] = useState('english')
  const keys = layouts[layout]

  const handleChangeLayout = newLayout => {
    setLayout(newLayout)
  }

  return (
    <div className='keyboard'>
      <div >
        {keys.map((key, index) => (
          <button key={index} onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
        <button className='spaceKey' onClick={() => onKeyPress(' ')}>Space</button>
      </div>
      <LayoutChangePanel onChangeLayout={handleChangeLayout} />
    </div>
  )
}

export default Keyboard
