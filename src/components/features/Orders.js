import React from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../common/Title/Title';

// Generate Order Data
function createData(id, date, name, delivery, amount) {
  return { id, date, name, delivery, amount };
}

const rows = [
  createData(
    0,
    '13:00',
    'Philip Thinius',
    'inhouse',
    21,

  ),
  createData(
    1,
    '14:45',
    'Iza Witkowska',
    'delivery',
    37.22,
  ),
  createData(
    2,
    '15:23',
    'Lisa Brüssau',
    'inhouse',
    43.10,
  ),
  createData(
    3,
    '16:12',
    'Oli xv',
    'inhouse',
    53.99,
  ),
  createData(
    4,
    '17:17',
    'Alifdg',
    'inhouse',
    13.99,
  ),
  createData(
    5,
    '18:41',
    'Alfred Düblin',
    'inhouse',
    78.20,
  ),
];

const Orders = () => {
  return (
    <>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Inhouse/Delivery</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.delivery}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div >
        <Link color="primary" href="#">
          See more orders
        </Link>
      </div>
    </>
  );
};

export default Orders;
