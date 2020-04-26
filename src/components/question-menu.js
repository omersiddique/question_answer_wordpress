import React from 'react';
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import ActionButton from './floating-action-button';
import './question-menu.css';
import QuestionForm from './question-form';

 function QuestionMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showQuestionForm, toggleQuestionForm] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    toggleQuestionForm(true);
  };

  const handleCloseForm = () => {
    toggleQuestionForm(false);
  };

  return (
    <div>
     <QuestionForm show={showQuestionForm} hide={handleCloseForm} />
      <ActionButton onClick={handleClick} />
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Add a new Question</MenuItem>
      </Menu>
    </div>
  );
}

export default QuestionMenu;