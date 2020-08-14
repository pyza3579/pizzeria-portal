import React from 'react';
import styles from './Kitchen.module.scss';
import { Link } from 'react-router-dom';


const Kitchen = () => (
  <div className={styles.component}>
    <h2>Kitchen view</h2>
    <Link to ={`${process.env.PUBLIC_URL}/kitchen`}></Link>  
  </div>
);

export default Kitchen;