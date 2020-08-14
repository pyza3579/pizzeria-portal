import React from 'react';
import styles from './Login.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
      width: '30ch',
    },
  },
}));



const Login  = () => {
  const classes = useStyles();

  return (
    <Card className={styles.component}>
      <Container maxWidth="lg">
        <form className={classes.root} noValidate autoComplete="off"> 
          <TextField id="outlined-basic" label="Login" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </form>
        <Button variant="contained" size="large" color="primary" href="${process.env.PUBLIC_URL}/dashboard">Login</Button>
      </Container>
    </Card>
  );
};


export default Login;





