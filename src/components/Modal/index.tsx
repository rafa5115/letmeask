import React, { useState, useEffect } from 'react'
import ReactFrom from 'react-dom'
import ReactDom from 'react-dom'
import CloseIcon from '@material-ui/icons/Close';
import './styles.scss'


interface ModalProps {
  isShowing: boolean;
  toggle: () => void;
}

const Modal: React.FC<ModalProps> = ({ isShowing, toggle, children }) => { 
  useEffect(() => {
    const listner = function (e: KeyboardEvent ) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();

        isShowing && toggle();
      }
    }

    window.addEventListener('keyup', listner)

    return (() => {
      window.removeEventListener('keyup', listner)
    })

  }, [isShowing, toggle])

  return (
    isShowing ? ReactDom.createPortal(
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal">
            {children}
          </div>
        </div>
      </div>, document.body
    ) : null
  )
}

interface ModalHeaderProps {
  toggle: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ toggle, children }) => (
    <div className="modal-header">
        {children || 'Title'}
    <button 
            className="modal-button-close" 
            data-dismiss="modal" 
            aria-label="Close" 
        onClick={toggle}
        
    >
      <CloseIcon></CloseIcon>
    </button>    
    </div>
)

export const ModalBody: React.FC = ({ children }) => (
    <div className="modal-body">
        {children}
    </div>
)

export const ModalFooter: React.FC = ({ children }) => (
    <div className="modal-footer">
        {children}
  </div>
)


export default Modal;