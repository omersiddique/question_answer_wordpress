import React from 'react';
import {connect} from "react-redux"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextArea from '@material-ui/core/TextareaAutosize'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box'
import Typo from "@material-ui/core/Typography";
import SnackBar from '../snackbar';
import Backdrop from '../backdrop';
import "../login-form.css"
import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import getQuestions from "../getQuestions"

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
    const login_url = `https://hikmahsessions.com/control-panelz/wp-json/iman-shield/v1/answers`;
    const login_data = {
      post_title: title,
      post_content: content,
      question_ID : String(ownProps.questionID),
    }
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(login_data),
    }
    const response = await fetch(login_url, requestOptions);
    const data = await response.json(); 
    if (response.status === 200) {
      setError(false);   
      setMessage(`Successfully added question!`);

      const questionsRequest = await getQuestions({isNewQuestion: false});
      console.log(questionsRequest);
      if (questionsRequest.status === 200){
        const questionData = await questionsRequest.json();
        //console.log(questionData);
        updateQuestion([questionData]);
      }
      else{
        setError(true);
        setMessage(`Error getting questions`);
      }     
    changeLoading(false);
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
    <div className=''>      
      {(returnMessage) && !error ? <SnackBar message={returnMessage} severity={'success'} /> : '' }
      {loading ? <Backdrop /> : ''}  
      {isLoggedIn ?            
       <form onSubmit={postQuestion}>         
        <Box paddingTop={3} />
      <Typo variant="body2" color="black" className="small-instruction" component="p">Enter a short title and type in your answer below:</Typo>
        <Box marginTop={3} />
        <FormControl  fullWidth variant="outlined">                       
         
         <InputLabel htmlFor="outlined-adornment-answerTitle">Title</InputLabel> 
         <OutlinedInput
              id="outlined-adornment-answerTitle"
              rowsMin={7}
              value={title}
              onChange={updateTitle}
              labelWidth={60}
              required
              startAdornment={<InputAdornment position="start"></InputAdornment>}
         />         
      </FormControl> 
        <Box marginTop={3} />
        <FormControl  fullWidth variant="outlined">                       
         
           <InputLabel htmlFor="outlined-adornment-answer">Answer</InputLabel> 
           <OutlinedInput
                id="outlined-adornment-answer"
                inputComponent="textarea"
                rowsMin={7}
                value={content}
                onChange={updateContent}
                labelWidth={60}
                required
                startAdornment={<InputAdornment position="start"></InputAdornment>}
           />         
        </FormControl> 
        
        <DialogActions>
          <Button onClick={ownProps.hide} color="primary">
            Cancel
          </Button>
          <Button type="submit"  color="primary">
            Post 
          </Button>
        </DialogActions>
      </form>   : <span className='small-instruction'>Login to post an answer</span> }

    </div>
  );
}

  //destructure count object from state as it may have other objects in the future
  const mapStateToProps = ( { isLoggedIn, user, questions }, ownProps) => {
    return { isLoggedIn, user , questions, ownProps }
  }
  
 // dispatch function is provided to the component automatically, here we pass it to the mapDispatchToProps function first and return the increment 
 // action creator to dispatch a change to the state
  const mapDispatchToProps = dispatch => {
    return { updateQuestion: (newQuestion) => dispatch({ type: `QUESTIONUPDATE`, payload: newQuestion }) }
  }

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)