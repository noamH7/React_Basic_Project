// src/App.js
import React, { useState } from 'react';
import Keyboard from './Keyboard';
import TextDisplay from './TextDisplay';
import ControlPanel from './ControlPanel';
import '../css/AppKeybored.css';

const AppKeybored = () => {
    const [textFormat, setTextFormat] = useState({
        fontFamily: 'Arial',
        fontSize: '16px',
        color: 'black',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none'
    });

    const [text, setText] = useState([]);
    const [history, setHistory] = useState([]);
    const [selection, setSelection] = useState({ start: 0, end: 0 });

    const handleKeyPress = (key) => {
        setHistory([...history, text]);
        const updatedText = [...text];
        updatedText.splice(selection.end, 0, { char: key, style: { ...textFormat } });
        setText(updatedText);
        setSelection({ start: selection.end + 1, end: selection.end + 1 });
    };

    const handleFormatChange = (format, value) => {
        setTextFormat(prevFormat => ({
            ...prevFormat,
            [format]: value
        }));

        if (selection.start === selection.end && text.length > 0) {
            const newText = text.map(item => ({
                ...item,
                style: {
                    ...item.style,
                    [format]: value
                }
            }));
            setText(newText);
            return;
        }

        const updatedText = text.map((item, index) => {
            if (index >= selection.start && index < selection.end) {
                return { ...item, style: { ...item.style, [format]: value } };
            }
            return item;
        });

        setText(updatedText);
    };

    const handleSpecialAction = (action) => {
        setHistory([...history, text]);
        if (action === 'deleteLast') {
            setText(text.slice(0, -1));
        } else if (action === 'clearAll') {
            setText([]);
        } else if (action === 'undo') {
            setText(history.pop() || []);
            setHistory([...history]);
        } else if (action === 'upper-case') {
            const upperText = text.map(item => ({
                ...item,
                char: item.char.toUpperCase()
            }));
            setText(upperText);
        } else if (action === 'lower-case') {
            const lowerText = text.map(item => ({
                ...item,
                char: item.char.toLowerCase()
            }));
            setText(lowerText);
        }
    };

    const handleSelectionChange = (start, end) => {
        setSelection({ start, end });
    };

    return (
        <div className="App">
            <h1>Text Editord</h1>
            <ControlPanel textFormat={textFormat} onFormatChange={handleFormatChange} onSpecialAction={handleSpecialAction} />
            <TextDisplay text={text} onSelectionChange={handleSelectionChange} />
            <Keyboard onKeyPress={handleKeyPress} />
        </div>
    );
};

export default AppKeybored;
