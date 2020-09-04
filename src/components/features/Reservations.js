import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../common/Title/Title';

// Generate Order Data
function createData(id, date, name, booking) {
  return { id, date, name, booking };
}

const rows = [
  createData(0, '12:00', 'Philip Thinius', 'event'),
  createData(1, '13:11', 'Iza Witkowska', 'booking'),
  createData(2, '14:45', 'Lisa Brüssau', 'event'),
  createData(3, '15:20', 'Abi Abu', 'booking'),
  createData(4, '16:00', 'Ale Pffifig', 'event'),
  createData(5, '18:21', 'Ole Pffifig', 'event'),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Events/Bookings for today</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Events/Bookings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.booking}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
