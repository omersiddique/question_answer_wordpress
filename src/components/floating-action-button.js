import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import EditIcon from '@material-ui/icons/Edit';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import NavigationIcon from '@material-ui/icons/Navigation';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import QuestionMenu from './question-menu'

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