import React, { useState, useEffect, useRef, useCallback } from 'react';

const ResponsiveWindow = ({ children, title, initialPosition, initialSize, onClose }) => {
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const updateSize = useCallback((width, height) => {
    windowRef.current.style.setProperty('--window-width', `${width}px`);
    windowRef.current.style.setProperty('--window-height', `${height}px`);
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        updateSize(width, height);
      }
    });

    if (windowRef.current) {
      resizeObserver.observe(windowRef.current);
      updateSize(initialSize.width, initialSize.height);
    }

    return () => {
      if (windowRef.current) {
        resizeObserver.unobserve(windowRef.current);
      }
    };
  }, [initialSize, updateSize]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  return (
    <div
      ref={windowRef}
      className="fixed bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${initialSize.width}px`,
        height: `${initialSize.height}px`,
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
    </div>
  );
};

export default ResponsiveWindow;