import React from 'react';
import styles from './Dashboard.module.scss';
import Orders from '../../features/Orders';
import Reservations from '../../features/Reservations';
import { Paper } from '@material-ui/core';


const Dashboard = () => (

  <div className={styles.component}>
    <Paper className={styles.paper}>    
      <Orders className={styles.orders} />
    </Paper>
    <Paper className={styles.paper}>    
      <Reservations className={styles.bookings} />
    </Paper>
  </div>
);

export default Dashboard ;
