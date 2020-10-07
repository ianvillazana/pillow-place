import React, { Fragment } from 'react';

import Input from '../Input/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../utils/validators';

export default function Login() {
  return (
    <Fragment>
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
    </Fragment>
  );
}
