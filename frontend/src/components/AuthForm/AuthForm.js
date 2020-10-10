import React, { Fragment, useContext } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import Input from '../Input/Input';
import WideButton from '../WideButton/WideButton';
import { AuthContext } from '../../context/auth-context';
import { useForm } from '../../hooks/useForm';
import { 
  VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } 
  from '../../utils/validators';
import styles from './AuthForm.module.css';
import './AuthFormAnimation.css';

function Overlay(props) {
  const { auth } = props;

  const [formState, inputHandler, setFormData] = useForm({
    email: { value: "", isValid: false },
    password: { value: "", isValid: false }
  }, false);

  const switchHandler = () => {
    if (auth.state.isLogin) {
      setFormData({ ...formState.inputs, name: undefined }, false);
      auth.open(false);
    } else {
      setFormData({ ...formState.inputs, name: { value: "", isValid: false } });
      auth.open(true);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    
    console.log(formState);
  }

  const content = (
    <div className={styles.authForm}>
      <h2>{auth.state.isLogin ? "Existing Customer" : "New Account"}</h2>
      <form onSubmit={submitHandler}>
        {!auth.state.isLogin && (
          <Input 
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name."
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        <div 
          onClick={switchHandler} 
          className={styles.switch}
        >
          {auth.state.isLogin 
            ? "Don't have an account? Sign up here!" 
            : "Already have an account? Log in here!"
          }
        </div>
        <div className={styles.buttons}>
          <WideButton type="submit" disabled={!formState.isValid}>
            {auth.state.isLogin ? "LOG IN" : "SIGN UP"}
          </WideButton>
          <WideButton onClick={() => auth.close()} className={styles.cancelBtn}>
            CANCEL
          </WideButton>
        </div>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('authForm-hook'));
}

export default function AuthForm() {
  const auth = useContext(AuthContext);

  return (
    <Fragment>
      {auth.state.show && <Backdrop onClick={auth.close} />}
      <CSSTransition 
        in={auth.state.show} 
        timeout={200} 
        classNames="authForm" 
        mountOnEnter 
        unmountOnExit 
      >
        <Overlay auth={auth} />
      </CSSTransition>
    </Fragment>
  );
}
