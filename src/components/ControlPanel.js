// src/components/ControlPanel.js
import React, { useState } from 'react';
import '../css/ControlPanel.css';

const fonts = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'];
const fontSizes = ['12px', '16px', '20px', '24px', '28px'];
const colors = ['black', 'red', 'blue', 'green', 'purple'];

const ControlPanel = ({ textFormat, onFormatChange, onSpecialAction }) => {
    const [activeFormats, setActiveFormats] = useState({
        fontWeight: textFormat.fontWeight === 'bold',
        fontStyle: textFormat.fontStyle === 'italic',
        textDecoration: textFormat.textDecoration === 'underline',
    });

    const toggleFormat = (format) => {
        const isActive = activeFormats[format];
        setActiveFormats({ ...activeFormats, [format]: !isActive });

        let newValue;
        if (format === 'textDecoration') {
            newValue = isActive ? 'none' : 'underline';
        } else if (format === 'fontWeight') {
            newValue = isActive ? 'normal' : 'bold';
        } else if (format === 'fontStyle') {
            newValue = isActive ? 'normal' : 'italic';
        }

        onFormatChange(format, newValue);
    };

    return (
        <div className="control-panel">
            <div className="format-buttons">
                <button
                    onClick={() => toggleFormat('fontWeight')}
                    className={activeFormats.fontWeight ? 'active' : ''}
                >
                    Bold
                </button>
                <button
                    onClick={() => toggleFormat('fontStyle')}
                    className={activeFormats.fontStyle ? 'active' : ''}
                >
                    Italic
                </button>
                <button
                    onClick={() => toggleFormat('textDecoration')}
                    className={activeFormats.textDecoration ? 'active' : ''}
                >
                    Underline
                </button>
            </div>
            <div className="special-actions">
                <button onClick={() => onSpecialAction('deleteLast')}>Delete Last</button>
                <button onClick={() => onSpecialAction('clearAll')}>Clear All</button>
                <button onClick={() => onSpecialAction('undo')}>Undo</button>
                <button onClick={() => onSpecialAction('upper-case')}>Upper all</button>
                <button onClick={() => onSpecialAction('lower-case')}>Lower all</button>
            </div>
            <div className="dropdowns">
                <select
                    value={textFormat.fontFamily}
                    onChange={(e) => onFormatChange('fontFamily', e.target.value)}
                >
                    {fonts.map((font, index) => (
                        <option key={index} value={font}>{font}</option>
                    ))}
                </select>
                <select
                    value={textFormat.fontSize}
                    onChange={(e) => onFormatChange('fontSize', e.target.value)}
                >
                    {fontSizes.map((size, index) => (
                        <option key={index} value={size}>{size}</option>
                    ))}
                </select>
                <select
                    value={textFormat.color}
                    onChange={(e) => onFormatChange('color', e.target.value)}
                >
                    {colors.map((color, index) => (
                        <option key={index} value={color}>{color}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ControlPanel;
