import React, { useState, useEffect, useRef, useCallback } from 'react';

const ResponsiveWindow = ({ children, title, initialPosition, initialSize, onClose }) => {
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState('');
  const windowRef = useRef(null);

  const updateSize = useCallback((width, height) => {
    setSize({ width, height });
    windowRef.current.style.setProperty('--window-width', `${width}px`);
    windowRef.current.style.setProperty('--window-height', `${height}px`);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      } else if (isResizing) {
        let newWidth = size.width;
        let newHeight = size.height;
        let newX = position.x;
        let newY = position.y;

        if (resizeDirection.includes('e')) {
          newWidth = e.clientX - position.x;
        }
        if (resizeDirection.includes('s')) {
          newHeight = e.clientY - position.y;
        }
        if (resizeDirection.includes('w')) {
          newWidth = size.width + (position.x - e.clientX);
          newX = e.clientX;
        }
        if (resizeDirection.includes('n')) {
          newHeight = size.height + (position.y - e.clientY);
          newY = e.clientY;
        }

        setSize({ width: Math.max(200, newWidth), height: Math.max(100, newHeight) });
        setPosition({ x: newX, y: newY });
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
  }, [isDragging, isResizing, dragOffset, size, position, resizeDirection]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleResizeStart = (direction) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  const resizeHandles = [
    { direction: 'n', style: 'top-0 left-0 right-0 h-1 cursor-n-resize' },
    { direction: 's', style: 'bottom-0 left-0 right-0 h-1 cursor-s-resize' },
    { direction: 'e', style: 'top-0 right-0 bottom-0 w-1 cursor-e-resize' },
    { direction: 'w', style: 'top-0 left-0 bottom-0 w-1 cursor-w-resize' },
    { direction: 'ne', style: 'top-0 right-0 w-4 h-4 cursor-ne-resize' },
    { direction: 'nw', style: 'top-0 left-0 w-4 h-4 cursor-nw-resize' },
    { direction: 'se', style: 'bottom-0 right-0 w-4 h-4 cursor-se-resize' },
    { direction: 'sw', style: 'bottom-0 left-0 w-4 h-4 cursor-sw-resize' },
  ];

  return (
    <div
      ref={windowRef}
      className="fixed bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: 1000,
      }}
    >
      <div
        className="bg-gray-100 px-4 py-2 flex justify-between items-center cursor-move"
        onMouseDown={handleMouseDown}
      >
        <h3 className="text-sm font-semibold">{title}</h3>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>×</button>
      </div>
      <div className="p-4 overflow-auto" style={{ height: 'calc(100% - 40px)' }}>
        {children}
      </div>
      {resizeHandles.map(({ direction, style }) => (
        <div
          key={direction}
          className={`absolute ${style}`}
          onMouseDown={handleResizeStart(direction)}
        />
      ))}
    </div>
  );
};

export default ResponsiveWindow;