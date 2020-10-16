import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

function ModalOverlay(props) {
  const content = (
    <div className="modal">
      {props.children}
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
}

export default function Modal(props) {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition 
        in={props.show} 
        mountOnEnter 
        unmountOnExit 
        timeout={200} 
        classNames="modal" 
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
}
