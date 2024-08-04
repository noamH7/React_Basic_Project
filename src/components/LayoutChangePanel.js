import React from 'react';
import '../css/ControlPanel.css';

const LayoutChangePanel = ({ onChangeLayout }) => {
    return (
            <div className="layout-buttons">
                <button onClick={() => onChangeLayout('english')}>abc</button>
                <button onClick={() => onChangeLayout('ENGLISH')}>ABC</button>
                <button onClick={() => onChangeLayout('hebrew')}>אבג</button>
                <button onClick={() => onChangeLayout('numbers')}>123</button>
                <button onClick={() => onChangeLayout('emojis')}>😀</button>
                <button onClick={() => onChangeLayout('symbols')}>()@?</button>
            </div>
    );
};

export default LayoutChangePanel;
