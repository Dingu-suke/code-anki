import React from 'react'

const Modal = ({ children, modalRef }) => {
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box h-2/3">
        {children}
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className='cursor-default'>close</button>
      </form>
    </dialog>
  )
}
export default Modal