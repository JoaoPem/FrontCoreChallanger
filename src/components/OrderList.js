import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import styles from './OrderList.module.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('There was an error fetching the orders!', error);
      }
    };

    fetchOrders();
  }, []); // Certifique-se de que o array de dependências está vazio para evitar múltiplos fetches

  const handleDelete = (orderId) => {
    axiosInstance.delete(`/orders/${orderId}`)
      .then(() => {
        setOrders(orders.filter(order => order.id !== orderId));
      })
      .catch(error => {
        console.error('There was an error deleting the order!', error);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Orders</h1>
      <div className={styles.orderList}>
        {orders.map(order => (
          <div key={order.id} className={styles.orderItem}>
            <button 
              className={styles.closeButton} 
              onClick={() => handleDelete(order.id)}
            >
              X
            </button>
            <p className={styles.orderId}>Order ID: {order.id}</p>
            <p>User ID: {order.user_id}</p>
            <p>Processor: {order.processor.name}</p>
            <p>Motherboard: {order.motherboard.name}</p>
            <p>Video Card: {order.video_card ? order.video_card.name : 'N/A'}</p>
            <p>Order RAM: {order.order_ram.rams.map(ram => ram.name).join(', ')}</p>
            <p>Created At: {new Date(order.created_at).toLocaleString()}</p>
            <p>Updated At: {new Date(order.updated_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
