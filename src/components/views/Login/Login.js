import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
      padding: '40px',
    },
  },
}));



const Login  = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Container maxWidth="lg">
        <form  noValidate autoComplete="off"> 
          <TextField id="outlined-basic" label="Login" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </form>
        <Button variant="contained" size="large" color="primary" href="${process.env.PUBLIC_URL}/dashboard">Login</Button>
      </Container>
    </Card>
  );
};


export default Login;





