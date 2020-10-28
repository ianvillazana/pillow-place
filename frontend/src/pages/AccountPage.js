import React, { Fragment, useContext, useEffect, useState } from 'react';

import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import Order from '../components/Order/Order';
import Spinner from '../components/Spinner/Spinner';
import { AuthContext } from '../context/auth-context';
import { useHttpClient } from '../hooks/useHttpClient';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export default function AccountPage() {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const getOrders = async () => {
      try {
        const userData = await sendRequest(
          `${API_URL}/api/users/orders/${auth.state.user.id}`
        );
        let ordersArray = [];
        for (let oid of userData.orders) {
          try {
            const orderData = await sendRequest(
              `${API_URL}/api/orders/${oid}`
            );
            ordersArray.push(orderData.order);
          } catch {}
        }
        setOrders(ordersArray);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };
    getOrders();
  }, [auth.state.user.id, sendRequest]);

  const deleteOrder = async (oid) => {
    setIsLoading(true);
    try {
      await sendRequest(`${API_URL}/api/orders/${oid}`, 'DELETE');
      setOrders(orders.filter(order => order.id !== oid));
      setIsLoading(false);
      setShowModal(true);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <Modal show={showModal} onCancel={() => setShowModal(false)}>
        <div>Order cancelled.</div>
        <Button large onClick={() => setShowModal(false)}>OK</Button>
      </Modal>
      <h2>Order History for {auth.state.user.name}</h2>
      {isLoading ? <Spinner /> : (
        <Fragment>
          {orders.length <= 0 ? <h3>You have no orders</h3> : (
            <Fragment>
              {orders.map((order, index) => (
                <Order order={order} onClick={deleteOrder} key={index} />
              ))}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
}
