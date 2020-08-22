import { connect } from 'react-redux';
import Waiter from './Waiter';
import { getAll, fetchFromAPI, getLoadingState, updateApp } from '../../../redux/tablesRedux';//update App new

const mapStateToProps = (state) => ({
  tables: getAll(state),
  loading: getLoadingState(state),
  

});

const mapDispatchToProps = (dispatch) => ({
  fetchTables: () => dispatch(fetchFromAPI()),
  updateTables: (rowId, status) => dispatch(updateApp(rowId, status)),//update tables new!
});


export default connect(mapStateToProps, mapDispatchToProps)(Waiter);