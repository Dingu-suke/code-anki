import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MdCircle } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const ResponsiveWindow = ({ children, title, initialPosition, initialSize, onClose}) => {
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState('');
  const windowRef = useRef(null);

  const updateSizeAndPosition = useCallback(() => {
    const maxWidth = window.innerWidth - 20; // 20pxのマージンを確保
    const maxHeight = window.innerHeight - 20;
    
    setSize(prevSize => ({
      width: Math.min(prevSize.width, maxWidth),
      height: Math.min(prevSize.height, maxHeight)
    }));

    setPosition(prevPos => ({
      x: Math.min(Math.max(10, prevPos.x), window.innerWidth - size.width - 10),
      y: Math.min(Math.max(10, prevPos.y), window.innerHeight - size.height - 10)
    }));

    if (windowRef.current) {
      windowRef.current.style.setProperty('--window-width', `${Math.min(size.width, maxWidth)}px`);
      windowRef.current.style.setProperty('--window-height', `${Math.min(size.height, maxHeight)}px`);
    }
  }, [size.width, size.height]);

  useEffect(() => {
    window.addEventListener('resize', updateSizeAndPosition);
    return () => window.removeEventListener('resize', updateSizeAndPosition);
  }, [updateSizeAndPosition]);

  useEffect(() => {
    updateSizeAndPosition();
  }, [updateSizeAndPosition]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: Math.min(Math.max(0, e.clientX - dragOffset.x), window.innerWidth - size.width),
          y: Math.min(Math.max(0, e.clientY - dragOffset.y), window.innerHeight - size.height)
        });
      } else if (isResizing) {
        let newWidth = size.width;
        let newHeight = size.height;
        let newX = position.x;
        let newY = position.y;

        if (resizeDirection.includes('e')) {
          newWidth = Math.min(e.clientX - position.x, window.innerWidth - position.x - 10);
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.min(e.clientY - position.y, window.innerHeight - position.y - 10);
        }
        if (resizeDirection.includes('w')) {
          const maxWidth = position.x + size.width - 10;
          newWidth = Math.min(size.width + (position.x - e.clientX), maxWidth);
          newX = Math.max(10, e.clientX);
        }
        if (resizeDirection.includes('n')) {
          const maxHeight = position.y + size.height - 10;
          newHeight = Math.min(size.height + (position.y - e.clientY), maxHeight);
          newY = Math.max(10, e.clientY);
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
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #000000;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 5px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>
      <div
        ref={windowRef}
        className="fixed bg-black border border-spacing-44 border-green-300 shadow-lg rounded-lg overflow-hidden"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          zIndex: 1000,
          scrollbarColor: '#888 #000000',
        }}
      >
        <div
          className="bg-slate-700 px-6 py-2 flex justify-between items-center"
          onMouseDown={handleMouseDown}
        >
          <h3 className="text-lg font-semibold text-blue-200">{title}</h3>
          {/* <p className='text-sm justify-start'>マークダウンエディタの全画面編集モードはecsキーで解除できます。</p> */}
          <div
            className="relative cursor-pointer group"
            onClick={onClose}
          >
            <div className="flex items-center justify-center cursor-default">
              <MdCircle className="text-red-600 text-2xl" />
              <RxCross2 className="text-blue-100 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-default " />
            </div>
          </div>
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
    </>
  );
};

export default ResponsiveWindow;