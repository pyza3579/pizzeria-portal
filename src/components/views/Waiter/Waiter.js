import React from 'react';
import PropTypes from 'prop-types';
import styles from './Waiter.module.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';

class Waiter extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }

  static propTypes = {
    fetchTables: PropTypes.func,  
    loading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.any,
    }),
    updateTables: PropTypes.func,
    tables: PropTypes.any,
    update: PropTypes.any,
  }

  componentDidMount(){
    const { fetchTables } = this.props;
    fetchTables();
  }

  handleClick(status, rowId, event) {
    console.log('event onClick',event);
    console.log('status onClick',status);
    console.log('rowId onClick',rowId);

    const { updateTables } = this.props;
    updateTables(rowId, status);
  }

  renderActions(status, rowId){
    switch (status) {
      case 'free':
        return (
          <>
            <Button onClick={(e) => this.handleClick('thinking', rowId, e)}>thinking</Button>
            <Button component={NavLink} to={`${process.env.PUBLIC_URL}/waiter/order/new`}>new order</Button>
          </>
        );
      case 'thinking':
        return (
          <Button component={NavLink} to={`${process.env.PUBLIC_URL}/waiter/order/new`}>new order</Button>
        );
      case 'ordered':
        return (
          <Button onClick={(e) => this.handleClick('prepared', rowId, e)}>prepared</Button>
        );
      case 'prepared':
        return (
          <Button onClick={(e) => this.handleClick('delivered', rowId, e)}>delivered</Button>
        );
      case 'delivered':
        return (
          <Button onClick={(e) => this.handleClick('paid', rowId, e)}>paid</Button>
        );
      case 'paid':
        return (
          <Button onClick={(e) => this.handleClick('free', rowId, e)}>free</Button>
        );
      default:
        return null;
    }
  }

  render() {
    const { loading: { active, error }, tables } = this.props;

    if(active || !tables.length){
      return (
        <Paper className={styles.component}>
          <p>Loading...</p>
        </Paper>
      );
    } else if(error) {
      return (
        <Paper className={styles.component}>
          <p>Error! Details:</p>
          <pre>{error}</pre>
        </Paper>
      );
    } else {
      return (
        <Paper className={styles.component}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Table</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tables.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>
                    {row.status}
                  </TableCell>
                  <TableCell>
                    {row.order && (
                      <Button to={`${process.env.PUBLIC_URL}/waiter/order/${row.order}`}>
                        {row.order}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {this.renderActions(row.status, row.id)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }
}

export default Waiter;