import React, { Fragment, useContext, useEffect, useState } from 'react';

import Order from '../components/Order/Order';
import Spinner from '../components/Spinner/Spinner';
import { AuthContext } from '../context/auth-context';
import { useHttpClient } from '../hooks/useHttpClient';

export default function AccountPage() {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const getOrders = async () => {
      try {
        const userData = await sendRequest(
          `http://localhost:5000/api/users/orders/${auth.state.user.id}`
        );
        let ordersArray = [];
        for (let oid of userData.orders) {
          try {
            const orderData = await sendRequest(
              `http://localhost:5000/api/orders/${oid}`
            );
            ordersArray.push(orderData.order);
          } catch {}
        }
        setOrders(ordersArray);
        setIsLoading(false);
      } catch {}
    };
    getOrders();
  }, [auth.state.user.id, sendRequest]);

  return (
    <div className="page">
      <h2>Order History for {auth.state.user.name}</h2>
      {isLoading ? <Spinner /> : (
        <Fragment>
          {orders.length <= 0 ? <h3>You have no orders</h3> : (
            <Fragment>
              {orders.map((order, index) => (
                <Order order={order} key={index} />
              ))}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
}
