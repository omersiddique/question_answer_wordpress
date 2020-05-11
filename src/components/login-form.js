import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Type from '@material-ui/core/Typography';
import SnackBar from './snackbar';
import Backdrop from './backdrop';
import {connect} from "react-redux"
import "./login-form.css"
import SignUp from './signup-form';
import loginFunction from './functions/login';

const FormDialog = ({isLoggedIn, user, updateUser}) => {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, changeLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [returnMessage, setMessage] = React.useState(false);
  const [showSignup, setSignup] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openSignUpForm = () => {
    setSignup(true);
  }

  const closeSignUpForm = () => {
    setSignup(false);
  }

  const login = async() => {
    changeLoading(true);
    setMessage(false);
    const response = await loginFunction(username, password);
    const data = await response.json();
    //console.log(data);
    changeLoading(false);
    if (response.status === 200) {
      setError(false);      
      setMessage(`Success! Logged in as ${data.user_display_name}`);
      handleClose();
      // Send to Redux
      updateUser(data);
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

  const openSignUp = (event) =>{
    event.preventDefault();
    handleClose();
    setSignup(true);
  }

  return (
    <div>      
      {(returnMessage) && !error ? <SnackBar message={returnMessage} severity={'success'} /> : '' }
      <Button variant="filled" color="primary" style={{color:"white"}} onClick={handleClickOpen}>
        {isLoggedIn ? `${user.user_display_name} - Logout` : `Login`}
      </Button>
      {!isLoggedIn ? <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
       {loading ? <Backdrop /> : ''}
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
         {(returnMessage) && error ? <SnackBar message={returnMessage} severity={'error'} /> : '' }
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
      <Type align='center'>Don't have an account? <a href="#" onClick={openSignUp}>Sign up.</a></Type>
     
      </Dialog> : ``}
      <SignUp openSign={showSignup} closeDialog={closeSignUpForm} openDialog={openSignUpForm}  />
    </div>
  );
}


  //destructure count object from state as it may have other objects in the future
  const mapStateToProps = ( { isLoggedIn, user } ) => {
    return { isLoggedIn, user }
  }
  
  // dispatch function is provided to the component automatically, here we pass it to the mapDispatchToProps function first and return the increment 
  // action creator to dispatch a change to the state
  const mapDispatchToProps = dispatch => {
    return { updateUser: (newUser) => dispatch({ type: `USERUPDATE`, payload: newUser }) }
  }

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)