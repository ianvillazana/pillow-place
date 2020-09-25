import React from 'react';

import styles from './FaqPage.module.css';

export default function FaqPage() {
  return (
    <div className="page">
      <h2>FREQUENTLY ASKED QUESTIONS</h2>
      <div className={styles.questions}>
        <p className={styles.question}>
          How do I create an online account?
        </p>
        <p className={styles.answer}>
          It’s easy. Just click on account in the top right corner of this 
          webpage (or in the menu for smaller screens) and follow the 
          instructions. You’re just a few minutes away from simplifying your 
          shopping!
        </p>
        <p className={styles.question}>
          Can I order by phone instead?
        </p>
        <p className={styles.answer}>
          For sure. Just give us a call at 555-745-5697. We’re happy to help 
          you with your purchase.
        </p>
        <p className={styles.question}>
          Can I cancel or change my order once it has been placed?
        </p>
        <p className={styles.answer}>
          If you want to change or cancel an order, please contact us within 
          12 hours of submitting your order.
        </p>
        <p className={styles.question}>
          What kind of custom work do you offer?
        </p>
        <p className={styles.answer}>
          We are not currently accepting any custom work order requests. We may 
          offer this service in the future. If it's pillows you want, please 
          have a look at our vast selection first, you will probably find what 
          you're looking for or something similar.
        </p>
        <p className={styles.question}>
          I don't really like your current selection of pillows. When will you 
          add more?
        </p>
        <p className={styles.answer}>
          We're sorry that you couldn't find anything that suits your tastes. 
          We add new pillows to our store offerings regularly, so please come 
          back and check at another time. If you have any suggestions, please 
          visit our contact page and reach out to us. We would like to hear 
          from you!
        </p>
        <p className={styles.question}>
          Are your pillow covers machine washable?
        </p>
        <p className={styles.answer}>
          It depends on what fabric the pillow cover is made from. If it's a 
          higher quality fabric, like silk or velvet, we suggest you dry clean 
          it. If you are to machine wash, use cold water on it's own and lay 
          flat to dry - do not put it in the dryer.
        </p>
        <p className={styles.question}>
          Are you hiring?
        </p>
        <p className={styles.answer}>
          We currently do not have any open positions at this time. Thank you 
          for your interest!
        </p>
        <p className={styles.question}>
          What is your return and exchange policy?
        </p>
        <p className={styles.answer}>
          We offer free 14 day returns for online purchases. The customer is 
          responsible for return shipping charges.
        </p>
      </div>
    </div>
  );
}
