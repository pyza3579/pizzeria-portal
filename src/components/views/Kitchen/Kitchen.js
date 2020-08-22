import React from 'react';
import styles from './Kitchen.module.scss';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

/*const demoContent = [ 
  {hour: '18:00', table1: '134', table2: null, table3: null, table4: '243', table5: '871', table6: null},
  {hour: '18:30',table1: '256', table2: null, table3: null, table4: '444', table5: null, table6: null},
  {hour: '19:00',table1: '763', table2: '453', table3: 123, table4: null, table5: '345', table6: 235},
  {hour: '19:30',table1: '47', table2: '321', table3: 234, table4: '321', table5: null, table6: 654},
  {hour: '20:00',table1: '53', table2: '453', table3: 345, table4: null, table5: '345', table6: null},
  {hour: '20:30',table1: '61', table2: '123', table3: 456, table4: null, table5: '231', table6: null},
];*/


/* const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));*/

export function Kitchen() {
  // const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Paper className={styles.component}>
      <List>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Order ${value + 1}`}>
                <Link to ={`${process.env.PUBLIC_URL}/kitchen`}></Link>    
              </ListItemText>       
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

export default Kitchen;