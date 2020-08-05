import React from 'react';
import styles from './waiter.module.scss';
import { Link } from 'react-router-dom';

const Waiter = () => (
  <div className={styles.component}>
    <h2>Waiter view</h2>
    <Link to ={`${process.env.PUBLIC_URL}/waiter/order/new`}></Link>
    <Link to ={`${process.env.PUBLIC_URL}/waiter/order/:id`}></Link>  
  </div>
);

export default Waiter;