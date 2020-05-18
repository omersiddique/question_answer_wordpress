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
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';


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
  },
  heart:{
    color: '#a83f39',
  },
  heartNumber:{
    fontSize: `1rem`,
    fontWeight: `bold`,
    marginLeft: `0.2rem`,
    marginTop: `0.3rem`,
  },
  cardArea:{
    display: `block`,
    textAlign: `right`,
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
        <Typography style={{width: `100%`}}>{<small>posted <TimeAgo date={dateProper} live={false} /></small>}</Typography>
      </ListItem>
      <CardActions disableSpacing className={classes.cardArea}>
        <IconButton aria-label="add to favorites" onClick={() => props.heartCallback(props.id,'answer')}>
          <FavoriteIcon className={classes.heart} /> <span className={classes.heartNumber}>{props.hearts}</span>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Divider variant="inset" component="li" />      
      {switchColours = !switchColours}
    </>
  );
}