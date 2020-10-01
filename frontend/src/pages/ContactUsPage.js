import React from 'react';

import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../utils/validators';
import styles from './ContactUsPage.module.css';

export default function ContactUsPage() {
  return (
    <div className="page">
      <h2>CONTACT US</h2>
      <div style={{textAlign: "center"}}>
        <p className="paragraph">
          Have a question? We'll get back to you within 48 hours.
        </p>
        <p className="paragraph">
          Use the contact form below or e-mail us at {" "}
          <strong>info@pillowplace.zzz</strong>
        </p>
        <p className="paragraph">
          For urgent assistance, call us at 555-745-5697.
        </p>
      </div>
      <form className={styles.form}>
        <p className="h7">How Can We Help You?</p>
        <Input 
          id="subject"
          type="text"
          label="Subject"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a subject."
        />
        <Input 
          id="name"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your name."
        />
        <Input 
          id="email"
          type="text"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
        />
        <Input 
          id="message"
          type="text"
          label="Message"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your message."
          textarea
        />
        <div className={styles.submit}><Button>SUBMIT</Button></div>
      </form>
    </div>
  );
}