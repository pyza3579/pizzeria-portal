
import React from 'react';
import styles from './Tables.module.scss';
import PropTypes from 'prop-types';


const TableBookingId = props=> (
  <div className={styles.component}>
    <h2>dd{props.match.params.id}</h2> 
  </div>
);

TableBookingId.propTypes = {
  match: PropTypes.any,
};
export default TableBookingId;




