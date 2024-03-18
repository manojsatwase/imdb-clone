import React, { useState } from 'react';
import Modal from './Modal';
import './AppModal.css'; // Import the CSS file

const AppModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <div className='modal'>
      <button type='button' onClick={handleOpenModal} style={{position:"fixed",left:"49%",bottom:"5%"}}>Modal</button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <input className='modal_open_btn' type='text' placeholder='search...' />
        <button type='button'>search</button>
      </Modal>
    </div>
  );
};

export default AppModal;
