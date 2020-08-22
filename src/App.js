import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import Kitchen from './components/views/Kitchen/Kitchen';
import Login from './components/views/Login/Login';
import Tables from './components/views/Tables/Tables';
//import TableOrderNew from './components/views/Table/TableOrderNew'; do zrobienia
//import TableOrderId from './components/views/Table/TableOrderId';  do zrobienia
import Waiter from './components/views/Waiter/WaiterContainer';
import WaiterOrderNew from './components/views/Waiter/WaiterOrderNew';
import WaiterOrderId from './components/views/Waiter/WaiterOrderId';
import Dashboard from './components/views/Dashboard/Dashboard';
import { StylesProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import store from './redux/store';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2B4C6F',
    },
    //secondary: {
    //main: '#11cb5f',
    //},
  },
});

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter basename={'/panel'}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <MainLayout>
              <Switch>
                <Route exact path={`${process.env.PUBLIC_URL}/`} component={Dashboard} />
                <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login} />
                <Route exact path={`${process.env.PUBLIC_URL}/tables`} component={Tables} />
                <Route exact path={`${process.env.PUBLIC_URL}/waiter`} component={Waiter} />
                <Route exact path={`${process.env.PUBLIC_URL}/kitchen`} component={Kitchen} />
                <Route exact path={`${process.env.PUBLIC_URL}/waiter/order/new`} component={WaiterOrderNew} />  
                <Route exact path={`${process.env.PUBLIC_URL}/waiter/order/booking/:id`} component={WaiterOrderId} />  
              </Switch>
            </MainLayout>
          </ThemeProvider>
        </StylesProvider>
      </BrowserRouter>
    </Provider>
  );
 
}


export default App;
