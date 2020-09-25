import React from 'react';

import styles from './ReturnPolicyPage.module.css';

export default function ReturnPolicyPage() {
  return (
    <div className="page">
      <h2>RETURN POLICY</h2>
      <div className="max-width">
        <p>
          There is always some uncertainty when buying any product online, 
          especially pillows you haven't held or seen in person. That's why we 
          offer a 14-day free return guarantee! You can return any product for 
          up to 14 days from the date you received your order.
        </p>
        <p>
          You can order worry free, knowing that if you are in any way 
          unsatisfied with your purchase, you may return it for a full refund 
          within 14 days. We take pride in our products and strive to not only 
          provide you with quality handmade pillows, but with awesome customer 
          service as well.
        </p>
        <p>
          To make a return, <a href="/">contact us</a> and we will send you instructions for 
          sending your order back to us. Any product you return must be in the 
          same condition you received it and in the original packaging.  
          <strong>
            &nbsp;You will only have to cover the return shipping costs. Once 
            the product is returned, we will then refund the credit card you 
            used.
          </strong>
        </p>
      </div>
    </div>
  );
}
