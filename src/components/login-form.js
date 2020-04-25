import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SnackBar from './snackbar';
import {connect} from "react-redux"
import "./login-form.css"

const FormDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState('mr.omersiddique@gmail.com');
  const [password, setPassword] = React.useState('');
  const [loading, changeLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [returnMessage, setMessage] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const login = async() => {
    setMessage(false);
    const login_url = `https://hikmahsessions.com/control-panelz/wp-json/jwt-auth/v1/token`;
    const login_data = {
      username,
      password
    }
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(login_data),
    }
    const response = await fetch(login_url, requestOptions);
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setError(false);
      
      setMessage('Success! Logging you in.');
    }
    else{
      setError(true);
      setMessage('Error logging in. Are you sure your details are correct?');
    }
  }

  const updateUsername = (event) => {
    setUsername(event.target.value);
  }

  const updatePassword = (event) => {
    setPassword(event.target.value);
  }

  return (
    <div>      
      {(returnMessage) && error ? <SnackBar message={returnMessage} severity={'error'} /> : '' }
      {(returnMessage) && !error ? <SnackBar message={returnMessage} severity={'success'} /> : '' }
      <Button variant="filled" color="primary" style={{color:"white"}} onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email and password to login
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={username}
            onChange={updateUsername}
          />
          <TextField            
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={updatePassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={login} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


  // destructure count object from state as it may have other objects in the future
  const mapStateToProps = ( { count } ) => {
    return { count }
  }
  
  // dispatch function is provided to the component automatically, here we pass it to the mapDispatchToProps function first and return the increment 
  // action creator to dispatch a change to the state
  const mapDispatchToProps = dispatch => {
    return { increment: () => dispatch({ type: `INCREMENT`, payload: 5 }) }
  }

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)