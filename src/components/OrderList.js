import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../api/axiosConfig';
import styles from './OrderList.module.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [userId, setUserId] = useState('');
  const [orderId, setOrderId] = useState('');

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/orders', {
        params: {
          sort_by: sortBy,
          user_id: userId,
          order_id: orderId,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('There was an error fetching the orders!', error);
    }
  }, [sortBy, userId, orderId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDelete = async (orderId) => {
    try {
      await axiosInstance.delete(`/orders/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('There was an error deleting the order!', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Orders</h1>
      <div className={styles.controls}>
        <label>Sort By:</label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Select</option>
          <option value="id">Order ID</option>
          <option value="user_id">User ID</option>
        </select>

        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <label>Order ID:</label>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>

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
