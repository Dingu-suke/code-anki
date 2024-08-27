import React, { useState, useRef, useEffect } from 'react';

const Window = ({ children, title, initialPosition = { x: 20, y: 20 }, initialSize = { width: 300, height: 200 }, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const windowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition(prev => ({
          x: prev.x + e.movementX,
          y: prev.y + e.movementY
        }));
      } else if (isResizing) {
        setSize(prev => ({
          width: Math.max(200, prev.width + e.movementX),
          height: Math.max(100, prev.height + e.movementY)
        }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  return (
    <div
      ref={windowRef}
      className="absolute bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
  
    >
      <div
        className="bg-gray-100 px-4 py-2 cursor-move flex justify-between items-center"
        onMouseDown={() => setIsDragging(true)}
      >
        <h3 className="text-sm font-semibold">{title}</h3>
        <button className="text-red-500 hover:text-red-700 text-lg" onClick={onClose}>❌</button>
      </div>
      <div className="p-4 overflow-auto" style={{ height: 'calc(100% - 40px)' }}>
        {children}
      </div>
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={() => setIsResizing(true)}
      />
    </div>
  );
};

export default Window;