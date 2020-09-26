import React from 'react';

export default function ShippingPage() {
  return (
    <div className="page">
      <h2>SHIPPING {"&"} DELIVERY</h2>
      <div className="max-width">
        <p className="h7">
          We offer free worldwide shipping on all orders over $40.
        </p>
        <p className="caption">
          *Unfortunately we are unable to offer our standard international 
          shipping to certain countries because the local post office is not 
          reliable enough, but we offer a subsidized DHL Express option to the 
          following countries: Algeria, Argentina, Aruba, Azerbaijan, Bosnia 
          and Herzegovina, Bulgaria, Chile, Colombia, Cyprus, El Salvador, 
          Estonia, Faroe Islands, Greece, Israel, Kazakhstan, Latvia, Lebanon, 
          Macedonia, Mexico, Moldova, Morocco, Mozambique, Nepal, New 
          Caledonia, Peru, Saudi Arabia, Serbia, Slovenia, South Africa, 
          Tunisia, Ukraine and Vietnam.
        </p>
        <p className="paragraph">
          All orders will be scheduled for shipment in 1-2 business days, 
          excluding holidays. Orders placed after 11AM EST on Fridays may not 
          be processed for shipping until the following Monday morning.
        </p>
        <p className="paragraph">
          Once your order has been processed for shipment, you will receive an 
          automated shipping notification with tracking.
        </p>
        <p className="h7">
          Domestic Shipping:
        </p>
        <ul className="unordered-list">
          <li>Standard Domestic (2-5 days): $3 (FREE on orders over $40)</li>
          <li>Priority (1-3 days): $5</li>
          <li>Next Day Air (No Weekend Delivery): $25</li>
        </ul>
        <p className="h7">
          Worldwide Shipping:
        </p>
        <ul className="unordered-list">
          <li>Standard International (7-14 days): $5 (FREE on orders over $40)</li>
          <li>DHL Express (2-4 days): $20</li>
          <li>
            Typically there won't be any customs or import fees. We do our 
            best to minimize any customs charges relating to the invoice but 
            they will vary from country to country and we cannot guarantee 
            what they will be in advance.
          </li>
        </ul>
        <p>
          *Please note that these are estimates and aren't guaranteed, we
          will not be able to reimburse expedited shipping costs for packages
          that miss the estimated delivery date, nor do we refund shipping
          costs for returned items. If you have any questions about shipping
            or delivery, please <u>contact us.</u>
        </p>
      </div>
    </div>
  );
}
