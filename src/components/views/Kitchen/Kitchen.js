
import React from 'react';
import styles from './Kitchen.module.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const demoContent = [ 
  {hour: '18:00', table: '1', dishes:['pizza', 'fries', 'salad'], order: null},
  {hour: '18:30', table: '2', dishes:['pizza', 'fries', 'salad'], order: 234},
  {hour: '19:00', table: '3', dishes:['pizza', 'fries', 'salad'], order: null},
  {hour: '19:30', table: '4', dishes:['pizza', 'fries', 'salad'], order: 453},
  {hour: '20:00', table: '5', dishes:['pizza', 'fries', 'salad'], order: null},
  {hour: '20:30', table: '6', dishes:['pizza', 'fries', 'salad'], order: 555},
];


const Kitchen = () => (
  <Paper className={styles.component}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Time</TableCell>
          <TableCell>Delivery/Table</TableCell>
          <TableCell>Dishes</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {demoContent.map(row => (
          <TableRow key={row.hour}>
            <TableCell component="th" scope="row">
              {row.hour}
            </TableCell>
            <TableCell>
              {row.table}
            </TableCell>
            <TableCell>
              {row.dishes.map (dishes => (
                <p key={dishes} >{dishes}</p>
              ))}
            </TableCell>
            <TableCell>
              <Button>Done</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);
export default Kitchen;