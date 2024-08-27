import React, { useState, useEffect, useRef, useCallback } from 'react';

const ResponsiveWindow = ({ children, title, initialPosition, initialSize, onClose }) => {
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState(initialPosition);
  const windowRef = useRef(null);

  const MIN_WIDTH = 300;  // 最小幅
  const MIN_HEIGHT = 200; // 最小高さ

  const updateSizeAndPosition = useCallback(() => {
    if (!windowRef.current) return;

    const browserWidth = window.innerWidth;
    const browserHeight = window.innerHeight;
    
    let newWidth = Math.min(size.width, browserWidth - 40); // 20px margin on each side
    let newHeight = Math.min(size.height, browserHeight - 40);
    
    newWidth = Math.max(newWidth, MIN_WIDTH);
    newHeight = Math.max(newHeight, MIN_HEIGHT);

    let newX = Math.min(Math.max(0, position.x), browserWidth - newWidth);
    let newY = Math.min(Math.max(0, position.y), browserHeight - newHeight);

    setSize({ width: newWidth, height: newHeight });
    setPosition({ x: newX, y: newY });

    windowRef.current.style.setProperty('--window-width', `${newWidth}px`);
    windowRef.current.style.setProperty('--window-height', `${newHeight}px`);
  }, [size, position]);

  useEffect(() => {
    updateSizeAndPosition();
    window.addEventListener('resize', updateSizeAndPosition);
    return () => window.removeEventListener('resize', updateSizeAndPosition);
  }, [updateSizeAndPosition]);

  const handleDrag = useCallback((e) => {
    if (e.clientX === 0 && e.clientY === 0) return; // Ignore events with invalid coordinates

    const browserWidth = window.innerWidth;
    const browserHeight = window.innerHeight;
    
    let newX = e.clientX - size.width / 2;
    let newY = e.clientY - 20; // Assuming 20px is half the height of the title bar

    newX = Math.min(Math.max(0, newX), browserWidth - size.width);
    newY = Math.min(Math.max(0, newY), browserHeight - size.height);

    setPosition({ x: newX, y: newY });
  }, [size]);

  const handleResize = useCallback((e, direction) => {
    const browserWidth = window.innerWidth;
    const browserHeight = window.innerHeight;
    
    let newWidth = size.width;
    let newHeight = size.height;
    let newX = position.x;
    let newY = position.y;

    if (direction.includes('e')) {
      newWidth = Math.min(Math.max(MIN_WIDTH, e.clientX - position.x), browserWidth - position.x);
    }
    if (direction.includes('s')) {
      newHeight = Math.min(Math.max(MIN_HEIGHT, e.clientY - position.y), browserHeight - position.y);
    }
    if (direction.includes('w')) {
      const potentialWidth = Math.max(MIN_WIDTH, size.width + (position.x - e.clientX));
      if (potentialWidth <= size.width) {
        newWidth = potentialWidth;
        newX = Math.max(0, e.clientX);
      }
    }
    if (direction.includes('n')) {
      const potentialHeight = Math.max(MIN_HEIGHT, size.height + (position.y - e.clientY));
      if (potentialHeight <= size.height) {
        newHeight = potentialHeight;
        newY = Math.max(0, e.clientY);
      }
    }

    setSize({ width: newWidth, height: newHeight });
    setPosition({ x: newX, y: newY });
  }, [size, position]);

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
        onMouseDown={(e) => {
          const handleMouseMove = (moveEvent) => handleDrag(moveEvent);
          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      >
        <h3 className="text-sm font-semibold">{title}</h3>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>×</button>
      </div>
      <div className="p-4 overflow-auto" style={{ height: 'calc(100% - 40px)' }}>
        {React.Children.map(children, child =>
          React.cloneElement(child, { windowSize: size, useInWindow: true })
        )}
      </div>
      {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(direction => (
        <div
          key={direction}
          className={`absolute ${getResizeHandleClass(direction)}`}
          onMouseDown={(e) => {
            const handleMouseMove = (moveEvent) => handleResize(moveEvent, direction);
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        />
      ))}
    </div>
  );
};

// リサイズハンドルのクラスを取得する補助関数
function getResizeHandleClass(direction) {
  const baseClass = "cursor-{}-resize";
  const sizeClass = (direction.length === 1) ? "w-1 h-1" : "w-3 h-3";
  const positionClass = {
    n: "top-0 left-0 right-0",
    s: "bottom-0 left-0 right-0",
    e: "top-0 right-0 bottom-0",
    w: "top-0 left-0 bottom-0",
    ne: "top-0 right-0",
    nw: "top-0 left-0",
    se: "bottom-0 right-0",
    sw: "bottom-0 left-0"
  }[direction];

  return `${baseClass.replace('{}', direction)} ${sizeClass} ${positionClass}`;
}

export default ResponsiveWindow;