import React, { Fragment, useContext } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import Input from '../Input/Input';
import WideButton from '../WideButton/WideButton';
import Spinner from '../Spinner/Spinner';
import { AuthContext } from '../../context/auth-context';
import { useForm } from '../../hooks/useForm';
import { useHttpClient } from '../../hooks/useHttpClient';
import { 
  VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } 
  from '../../utils/validators';
import styles from './AuthForm.module.css';
import './AuthFormAnimation.css';

function Overlay(props) {
  const { auth } = props;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm({
    email: { value: "", isValid: false },
    password: { value: "", isValid: false }
  }, false);

  const switchHandler = () => {
    if (auth.state.isLogin) {
      setFormData({ ...formState.inputs, name: undefined }, false);
      clearError();
      auth.open(false);
    } else {
      setFormData({ ...formState.inputs, name: { value: "", isValid: false } });
      clearError();
      auth.open(true);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (auth.state.isLogin) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          { 'Content-Type': 'application/json' }
        );
        auth.login(
          responseData.user.id, 
          responseData.user.email, 
          responseData.user.name
        );
      } catch {}
    } else {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          { 'Content-Type': 'application/json' }
        );
        auth.login(
          responseData.user.id, 
          responseData.user.email, 
          responseData.user.name
        );
      } catch {}
    }
  };

  const closeHandler = (event) => {
    event.preventDefault();
    auth.close();
  }

  const content = (
    <div className={styles.authForm}>
      {isLoading ? <Spinner /> : (
        <Fragment>
          <h2>{auth.state.isLogin ? "Existing Customer" : "New Account"}</h2>
          {error && <div className={styles.error}>{error}</div>}
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
              <WideButton onClick={closeHandler} className={styles.cancelBtn}>
                CANCEL
          </WideButton>
            </div>
          </form>
        </Fragment>
      )}
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
