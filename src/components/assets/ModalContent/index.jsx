import Modal from 'react-modal'
import React, { useState } from 'react'

export function ModalContent({ children, isOpen, onRequestClose }) {

  function handleCloseModal() {
    setIsOpen(false)
  }
  function handleOpenModal() {
    setIsOpen(true)
  }

  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(20, 53, 45, 0.9)',
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #ccc',
            background: '#fff',
          },
        }}
      >
        {children}
      </Modal>
    </div>
  )
}
