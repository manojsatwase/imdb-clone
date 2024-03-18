import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  const handleCloseModal = (event) => {
   if(event.target === event.currentTarget){
    onClose();
   }
  }
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal-content">
        <button onClick={onClose} className="close-button">&times;</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal') // Specify the target DOM element to render the portal content
  );
};

export default Modal;