import React from 'react';
import styles from './Tables.module.scss';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';



const classes = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    //czemu to nie dziala?
  },
  link: {
    color: 'white', //czemu to nie dziala?
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const demoContent = [ 
  {hour: '18:00', table1: '134', table2: null, table3: null, table4: '243', table5: '871', table6: null},
  {hour: '18:30',table1: '256', table2: null, table3: null, table4: '444', table5: null, table6: null},
  {hour: '19:00',table1: '763', table2: '453', table3: 123, table4: null, table5: '345', table6: 235},
  {hour: '19:30',table1: '47', table2: '321', table3: 234, table4: '321', table5: null, table6: 654},
  {hour: '20:00',table1: '53', table2: '453', table3: 345, table4: null, table5: '345', table6: null},
  {hour: '20:30',table1: '61', table2: '123', table3: 456, table4: null, table5: '231', table6: null},
];


const Tables = () => ( 
  <Paper className={styles.component}>
    
    <TextField
    
      id="datetime-local"
      label="Next appointment"
      type="datetime-local"
      defaultValue="2019-05-24T10:30"
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
    <Button className={classes.button} variant="contained" color="primary">
      <Link className={classes.link} to="/panel/tables/booking/new">ADD BOOKING</Link>
    </Button>
    <Button className={classes.button} variant="contained" color="primary">
      <Link className={classes.link} to="/panel/tables/event/new">ADD EVENT</Link>
    </Button>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Hour</StyledTableCell>
            <StyledTableCell align="right">Table 1</StyledTableCell>
            <StyledTableCell align="right">Table 2</StyledTableCell>
            <StyledTableCell align="right">Table 3</StyledTableCell>
            <StyledTableCell align="right">Table 4</StyledTableCell>
            <StyledTableCell align="right">Table 5</StyledTableCell>
            <StyledTableCell align="right">Table 6</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {demoContent.map((row) => (
            <StyledTableRow key={row.hour}>
              <StyledTableCell component="th" scope="row">
                {row.hour}
              </StyledTableCell>
              <TableCell align="right">
                {row.table1 && (
                  <Link to={`${process.env.PUBLIC_URL}/tables/bookings/${row.table1}`}>
                    {row.table1}
                  </Link>
                )}
              </TableCell>
              <TableCell align="right">
                {row.table2 && (
                  <Link to={`${process.env.PUBLIC_URL}/tables/bookings/${row.table2}`}>
                    {row.table2}
                  </Link>
                )}
              </TableCell>
              <TableCell align="right">
                {row.table3 && (
                  <Link to={`${process.env.PUBLIC_URL}/tables/bookings/${row.table3}`}>
                    {row.table3}
                  </Link>
                )}
              </TableCell>
              <TableCell align="right">
                {row.table4 && (
                  <Link to={`${process.env.PUBLIC_URL}/tables/bookings/${row.table4}`}>
                    {row.table4}
                  </Link>
                )}
              </TableCell>
              <TableCell align="right">
                {row.table5 && (
                  <Link to={`${process.env.PUBLIC_URL}/tables/bookings/${row.table5}`}>
                    {row.table5}
                  </Link>
                )}
              </TableCell>
              <TableCell align="right">
                {row.table6 && (
                  <Link to={`${process.env.PUBLIC_URL}/tables/bookings/${row.table6}`}>
                    {row.table6}
                  </Link>
                )}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

export default Tables;