import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

export default function AlignItemsList(props) {
  return (
    <>
      <ListItem alignItems="flex-start">
      <ListItemAvatar>
          <Avatar alt="Siddique" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={props.title}
          secondary={
             <div dangerouslySetInnerHTML={ {__html: props.content} }></div>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}