
import React from 'react';
import styles from './Waiter.module.scss';
import PropTypes from 'prop-types';


const WaiterOrderId = props=> (
  <div className={styles.component}>
    <h2>{props.match.params.id}</h2> 
  </div>
);

WaiterOrderId.propTypes = {
  match: PropTypes.any,
};
export default WaiterOrderId;





