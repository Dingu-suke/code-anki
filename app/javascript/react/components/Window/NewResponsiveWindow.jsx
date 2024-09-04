import React, { useState, useCallback } from 'react';
import ResponsiveWindow from './ResponsiveWindow';

export const NewResponsiveWindow = ({ isOpen, onClose, children, title, initialPosition, initialSize }) => {
  
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);

  const handlePositionChange = useCallback((newPosition) => {
    setPosition(newPosition);
  }, []);

  const handleSizeChange = useCallback((newSize) => {
    setSize(newSize);
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