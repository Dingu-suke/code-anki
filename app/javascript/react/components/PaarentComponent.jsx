import React, { useRef, useState } from 'react'
import DraggableModal from './editor/Modal/DraggableModal'

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div>
      <button onClick={openModal}>モーダルを開く</button>
      <DraggableModal
        modalRef={modalRef}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <h2>ドラッグ可能なモーダル</h2>
        <p>この部分をドラッグしてモーダルを移動できます。</p>
      </DraggableModal>
    </div>
  )
}

export default ParentComponent