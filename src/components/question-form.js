import React from 'react';
import {connect} from "react-redux"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextArea from '@material-ui/core/TextareaAutosize'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SnackBar from './snackbar';
import Backdrop from './backdrop';
import "./login-form.css"
import getQuestions from "./getQuestions.js"

const FormDialog = ({ isLoggedIn, user, questions, ownProps, updateQuestion }) => {
 // const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [loading, changeLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [returnMessage, setMessage] = React.useState(false);

  
  const postQuestion = async(event) => {
    event.preventDefault();
    changeLoading(true);    
    setMessage(false);
    const response = getQuestions(title, content, user.token);      
    const data = await response.json(); 
    changeLoading(false);
    if (response.status === 201) {
      setError(false);   
      setMessage(`Successfully added question!`);
      updateQuestion(data);
      ownProps.hide();
    }
    else{
      setError(true);
      setMessage(`${data.message}`);
    }    
  }

  const updateTitle = (event) => {
    setTitle(event.target.value);
  }

  const updateContent = (event) => {
    setContent(event.target.value);
  }

  return (
    <div>      
      {(returnMessage) && !error ? <SnackBar message={returnMessage} severity={'success'} /> : '' }
      {isLoggedIn ? <Dialog open={ownProps.show} onClose={ownProps.hide} aria-labelledby="form-dialog-title">
       {loading ? <Backdrop /> : ''}       
       <form onSubmit={postQuestion}>
        <DialogTitle id="form-dialog-title">Post Question</DialogTitle>
        <DialogContent>
         {(returnMessage) && error ? <SnackBar message={returnMessage} severity={'error'} /> : '' }
          <DialogContentText>
            Ask a new question here. Once approved it will be posted live so the online community can help answer it.
          </DialogContentText>
          <TextField
            margin="dense"
            id="title"
            label="Question Title"
            type="text"
            fullWidth
            value={title}
            onChange={updateTitle}
            required
          />
          <TextArea            
            margin="dense"
            id="question"
            label="Question"
            rowsMin={7}            
            value={content}
            onChange={updateContent}
            required
            placeholder="Your question here*."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ownProps.hide} color="primary">
            Cancel
          </Button>
          <Button type="submit"  color="primary">
            Post 
          </Button>
        </DialogActions>
        </form>
      </Dialog> : ``}
    </div>
  );
}


  //destructure count object from state as it may have other objects in the future
  const mapStateToProps = ( { isLoggedIn, user, questions }, ownProps) => {
    return { isLoggedIn, user , questions, ownProps: ownProps }
  }
  
 // dispatch function is provided to the component automatically, here we pass it to the mapDispatchToProps function first and return the increment 
 // action creator to dispatch a change to the state
  const mapDispatchToProps = dispatch => {
    return { updateQuestion: (newQuestion) => dispatch({ type: `ADDQUESTION`, payload: newQuestion }) }
  }

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)