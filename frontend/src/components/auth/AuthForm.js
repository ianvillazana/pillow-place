import React, { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import Input from '../Input/Input';
import WideButton from '../WideButton/WideButton';
import { 
  VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } 
  from '../../utils/validators';
import styles from './AuthForm.module.css';
import './AuthFormAnimation.css';

function Overlay(props) {
  const { isLogin, setIsLogin, onSubmit, onCancel } = props;

  const content = (
    <div className={styles.authForm}>
      <h2>{isLogin ? "Exisiting Customer" : "New Account"}</h2>
      <form onSubmit={onSubmit ? onSubmit : e => e.preventDefault()}>
        {!isLogin && (
          <Input 
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name."
            onInput={() => {}}
          />
        )}
        <Input
          id="email"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={() => {}}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={() => {}}
        />
        <div onClick={setIsLogin} className={styles.switch}>
          {isLogin 
            ? "Don't have an account? Sign up here!" 
            : "Already have an account? Log in here!"
          }
        </div>
        <div className={styles.buttons}>
          <WideButton onClick={onSubmit}>
            {isLogin ? "LOG IN" : "SIGN UP"}
          </WideButton>
          <WideButton onClick={onCancel} className={styles.cancelBtn}>
            CANCEL
          </WideButton>
        </div>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('authForm-hook'));
}

export default function AuthForm(props) {
  const { show, onCancel } = props;

  // Close form when browser back button is pressed.
  useEffect(() => {
    window.onpopstate = () => onCancel();
  });

  return (
    <Fragment>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition 
        in={show} 
        timeout={200} 
        classNames="authForm" 
        mountOnEnter 
        unmountOnExit 
      >
        <Overlay {...props} />
      </CSSTransition>
    </Fragment>
  );
}
