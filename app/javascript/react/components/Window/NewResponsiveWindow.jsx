import React, { useState, useCallback, useRef } from 'react';
import ResponsiveWindow from './ResponsiveWindow';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const NewResponsiveWindow = ({ isOpen, onClose, children, title, initialPosition, initialSize }) => {
  
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const positionRef = useRef(initialPosition);
  const sizeRef = useRef(initialSize);

  const debouncedSetPosition = useCallback(
    debounce((newPosition) => {
      setPosition(newPosition);
    }, 500),
    []
  );

  const debouncedSetSize = useCallback(
    debounce((newSize) => {
      setSize(newSize);
    }, 500),
    []
  );

  const handlePositionChange = useCallback((newPosition) => {
    positionRef.current = newPosition;
    debouncedSetPosition(newPosition)
  }, []);

  const handleSizeChange = useCallback((newSize) => {
    sizeRef.current = newSize
    debouncedSetSize(newSize)
  }, []);
  
  // console.log("NewWindow", WindowBoolean)
  console.log("NewWindow", isOpen)
  if (!isOpen) return null;

  return (
    <div> 
      
      {/* {WindowBoolean && ( */}
        <ResponsiveWindow
          title={title}
          initialPosition={position}
          initialSize={size}
          onClose={onClose}
          onPositionChange={handlePositionChange}
          onSizeChange={handleSizeChange}
        >
          {children}
        </ResponsiveWindow>
      {/* )} */}
    </div>
  );
};