import React, { useRef } from 'react';
import '../css/AppKeybored.css';

const TextDisplay = ({ text, onSelectionChange }) => {
    const textRef = useRef(null);

    const handleMouseUp = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const startContainer = range.startContainer;
            const endContainer = range.endContainer;

            const calculateIndex = (node, offset) => {
                let index = 0;
                if (node === textRef.current) {
                    return index + offset;
                }
                const traverseNodes = (currentNode) => {
                    if (currentNode === node) {
                        index += offset;
                        return true;
                    }
                    if (currentNode.nodeType === Node.TEXT_NODE) {
                        index += currentNode.textContent.length;
                    }
                    for (let i = 0; i < currentNode.childNodes.length; i++) {
                        if (traverseNodes(currentNode.childNodes[i])) {
                            return true;
                        }
                    }
                    return false;
                };
                traverseNodes(textRef.current);
                return index;
            };

            const startIndex = calculateIndex(startContainer, range.startOffset);
            const endIndex = calculateIndex(endContainer, range.endOffset);

            console.log(`Selection start: ${startIndex}, end: ${endIndex}`);
            onSelectionChange(startIndex, endIndex);
        }
    };

    return (
        <div className="text-display" ref={textRef} onMouseUp={handleMouseUp}>
            {text.map((item, index) => (
                <span key={index} style={item.style}>{item.char}</span>
            ))}
        </div>
    );
};

export default TextDisplay;
