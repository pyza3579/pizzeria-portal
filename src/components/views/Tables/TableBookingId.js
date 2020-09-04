
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../common/Title/Title';
import PropTypes from 'prop-types';
import {Paper, Button} from '@material-ui/core';
import styles from './Tables.module.scss';

function createData(id, from, to, name, number, tableNo) {
  return { id, from, to, name, number, tableNo };
} 

const rows = [
  createData(
    12,
    '14:30',
    '16:30',
    'Phlip Thinius',
    '000-0000-00',
    '1',
  ),
];


const TablesBookingEdit = (props) => {

  return (
    <div className={styles.component}>
      <Paper className={styles.paper}>
        <Title>{props.match.params.id}</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Table number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell >{row.from}</TableCell>
                <TableCell >{row.to}</TableCell>
                <TableCell >{row.name}</TableCell>
                <TableCell >{row.number}</TableCell>
                <TableCell >{row.tableNo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <Button color="primary" href="#">
          Edit Order
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default TablesBookingEdit;

TablesBookingEdit.propTypes = {
  match: PropTypes.any,
};

