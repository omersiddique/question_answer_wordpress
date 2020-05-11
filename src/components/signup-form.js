import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import SnackBar from './snackbar';
import Backdrop from './backdrop';
import {connect} from "react-redux"
import SignUp from './functions/signUp';
import Login from './functions/login';
import "./login-form.css"

const FormDialog = ({ownProps, updateUser}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, changeLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [returnMessage, setMessage] = React.useState(false);
  const [password_confirm, confirmPassword] = React.useState('');


  const login = async(event) => {
    event.preventDefault();
    changeLoading(true);
    setMessage(false);
    const response = await SignUp(username, email, password);
    const data = await response.json();
    console.log(data); // Having a look at data we get back
    changeLoading(false);
    if (response.status === 200) {
      setError(false);      
      setMessage(`${data.message}`);
      ownProps.closeDialog();
      // Login
      const loginResponse = await Login(username,password);
      const loginData = await loginResponse.json();
      updateUser(loginData);
    }
    else{
      setError(true);
      setMessage(`${data.message}`);
    }
  }

  const updateUsername = (event) => {
    setUsername(event.target.value);
  }

  const updatePassword = (event) => {
    setPassword(event.target.value);
  }

  const updateEmail = (event) => {
    setEmail(event.target.value);
  }

  return (
    <div>      
      {(returnMessage) && !error ? <SnackBar message={returnMessage} severity={'success'} /> : '' }
      
      {true ? <Dialog open={ownProps.openSign} onClose={ownProps.closeDialog} aria-labelledby="form-dialog-title">
       {loading ? <Backdrop /> : ''}
       
       <form onSubmit={login}>
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
         {(returnMessage) && error ? <SnackBar message={returnMessage} severity={'error'} /> : '' }
          <DialogContentText>
            Enter your details to sign up. <br /><small>Note your name will be visible when you post questions/answers.</small>
          </DialogContentText>
          <FormControl  fullWidth variant="outlined"> 
            <InputLabel htmlFor="name">Your Name</InputLabel> 
            <OutlinedInput
                  id="name"
                  value={username}
                  onChange={updateUsername}
                  labelWidth={80}
                  fullWidth
                  required
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
            />         
         </FormControl> 
          
        <Box marginTop={3} />
         <FormControl  fullWidth variant="outlined"> 
            <InputLabel htmlFor="email">Your Email</InputLabel> 
            <OutlinedInput
                  id="email"
                  value={email}
                  onChange={updateEmail}
                  labelWidth={80}
                  fullWidth
                  required
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
            />         
         </FormControl> 
        
         <Box marginTop={3} />
        <FormControl  fullWidth variant="outlined"> 
            <InputLabel htmlFor="password">Your Password</InputLabel> 
            <OutlinedInput
                  id="password"
                  value={password}
                  onChange={updatePassword}
                  labelWidth={120}
                  fullWidth
                  required
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
            />         
         </FormControl>     
         <Box marginTop={3} />
         <FormControl fullWidth variant="outlined"> 
            <InputLabel htmlFor="password_confirm">Confirm Password</InputLabel> 
            <OutlinedInput
                  id="password_confirm"
                  value={password_confirm}
                  onChange={confirmPassword}
                  labelWidth={120}
                  fullWidth
                  required
                  startAdornment={<InputAdornment position="start"></InputAdornment>}
            />         
         </FormControl>   

        </DialogContent>
        <DialogActions>
          <Button onClick={ownProps.closeDialog} color="primary">
            Cancel
          </Button>
          <Button type='submit' color="primary">
            Signup 
          </Button>
        </DialogActions>             
        </form> 
      </Dialog> : ``}
    </div>
  );
}


  //destructure count object from state as it may have other objects in the future
  const mapStateToProps = ( {}, ownProps ) => {
    return { ownProps }
  }
  
  // dispatch function is provided to the component automatically, here we pass it to the mapDispatchToProps function first and return the increment 
  // action creator to dispatch a change to the state
  const mapDispatchToProps = dispatch => {
    return { updateUser: (newUser) => dispatch({ type: `USERUPDATE`, payload: newUser }) }
  }

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)