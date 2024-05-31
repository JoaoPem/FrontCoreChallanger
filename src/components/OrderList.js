// Importações de libs
import React, { useEffect, useState, useCallback } from 'react';
// Importa o axios para requisição HTTP
import axiosInstance from '../api/axiosConfig';
// Importa o CSS
import styles from './OrderList.module.css';


// Componente funcional OrderList
const OrderList = () => {
  // Armazena os pedidos em um array vazio
  const [orders, setOrders] = useState([]);
  // Critério de ordenação
  const [sortBy, setSortBy] = useState('');
  // Filtro ID user
  const [userId, setUserId] = useState('');
  // Filtro ID order
  const [orderId, setOrderId] = useState('');

  // Busca de pedidos na API
  const fetchOrders = useCallback(async () => {
    try {
      // Requisição GET para o controller admin
      const response = await axiosInstance.get('/admin_orders', {
        params: {
          sort_by: sortBy,
          user_id: userId,
          order_id: orderId,
        },
      });
      // Retorno
      setOrders(response.data);
      // Dispara um erro caso a requisição falhe
    } catch (error) {
      console.error('There was an error fetching the orders!', error);
    }
  }, [sortBy, userId, orderId]);

   // Usa o hook useEffect para chamar fetchOrders quando o componente é montado ou quando fetchOrders muda
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); // Dependencias


  // Requisição apra deletar
  const handleDelete = async (orderId) => {
    try {
      await axiosInstance.delete(`/admin_orders/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('There was an error deleting the order!', error);
    }
  };

  // JSX para renderizar o componente
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
            <p>Order RAM: {order.order_rams && order.order_rams.length > 0 ? 
              order.order_rams.flatMap(order_ram => order_ram.rams.map(ram => ram.name)).join(', ') : 'N/A'}</p>
            <p>Created At: {new Date(order.created_at).toLocaleString()}</p>
            <p>Updated At: {new Date(order.updated_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exporta o componente OrderList como padrão
export default OrderList;
