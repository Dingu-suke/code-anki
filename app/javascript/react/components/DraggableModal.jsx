import React, { useState, useRef, useEffect } from 'react'

const DraggableModal = ({ children, modalRef, isOpen, onClose }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dragRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setPosition({ x: 0, y: 0 })
    }
  }, [isOpen])

  const handleMouseDown = (e) => {
    if (e.target === dragRef.current) {
      setIsDragging(true)
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <dialog
      ref={modalRef}
      className={`modal ${isOpen ? 'modal-open' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div
        className="modal-box h-2/3 relative cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={dragRef}
      >
        <div className="p-4">
          {children}
        </div>
        <button
          className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </dialog>
  )
}

export default DraggableModal