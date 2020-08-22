
import React from 'react';
import styles from './Waiter.module.scss';
import PropTypes from 'prop-types';


const TableOrderId = props=> (
  <div className={styles.component}>
    <h2>dd{props.match.params.id}</h2> 
  </div>
);

TableOrderId.propTypes = {
  match: PropTypes.any,
};
export default TableOrderId;




