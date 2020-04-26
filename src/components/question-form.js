import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SnackBar from './snackbar';
import Backdrop from './backdrop';
import {connect} from "react-redux"
import "./login-form.css"

const FormDialog = ({ isLoggedIn, user, ownProps }) => {
 // const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, changeLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [returnMessage, setMessage] = React.useState(false);

  
  console.log(isLoggedIn);

  const login = async() => {
    changeLoading(true);
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
    //console.log(data);
    changeLoading(false);
    if (response.status === 200) {
      setError(false);      
      setMessage(`Success! Logged in as ${data.user_display_name}`);
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
      {(returnMessage) && !error ? <SnackBar message={returnMessage} severity={'success'} /> : '' }
      {isLoggedIn ? <Dialog open={ownProps.show} onClose={ownProps.hide} aria-labelledby="form-dialog-title">
       {loading ? <Backdrop /> : ''}
        <DialogTitle id="form-dialog-title">Post Question</DialogTitle>
        <DialogContent>
         {(returnMessage) && error ? <SnackBar message={returnMessage} severity={'error'} /> : '' }
          <DialogContentText>
            Ask a new question here. Once approved it will be posted live so the online community can help answer it.
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
          <Button onClick={ownProps.hide} color="primary">
            Cancel
          </Button>
          <Button onClick={login} color="primary">
            Login 
          </Button>
        </DialogActions>
      </Dialog> : ``}
    </div>
  );
}


  //destructure count object from state as it may have other objects in the future
  const mapStateToProps = ( { isLoggedIn, user }, ownProps) => {
    return { isLoggedIn, user , ownProps: ownProps }
  }
  
  // dispatch function is provided to the component automatically, here we pass it to the mapDispatchToProps function first and return the increment 
  // action creator to dispatch a change to the state
//   const mapDispatchToProps = dispatch => {
//     return { updateUser: (newUser) => dispatch({ type: `USERUPDATE`, payload: newUser }) }
//   }

export default connect(mapStateToProps)(FormDialog)