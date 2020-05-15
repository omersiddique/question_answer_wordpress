import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TimeAgo from 'react-timeago'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  author:{
    padding: '5px',
    fontSize: `12px`,
    borderRadius: `19px`,
  },
  answer:{
    paddingTop: `1rem`,
  }
}));

let switchColours = false;

export default function AlignItemsList(props) {
  const classes = useStyles();
  let author = props.author.slice(0,1).toUpperCase();
  let dateProper = props.date + 'Z';
  return (
    <>
      <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={switchColours ? classes.orange : classes.purple}>{author}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<div>{props.title} <br /><small className={[classes.author, switchColours ? classes.orange : classes.purple].join(' ')}>{props.author}</small><br /></div> }
          
          secondary={
             <div className={classes.answer} dangerouslySetInnerHTML={ {__html: props.content} }></div>
          }
        />
        <Typography>{<small>posted <TimeAgo date={dateProper} live={false} /></small>}</Typography>
      </ListItem>
      <Divider variant="inset" component="li" />      
      {switchColours = !switchColours}
    </>
  );
}