import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      position: `fixed`,
      right: `1em`,
      bottom: `1em`,
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


export default function FloatingActionButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}> 
      <Fab color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick={props.onClick}>
        <AddIcon />
      </Fab>
    </div>
  );
}