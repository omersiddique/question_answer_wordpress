import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from "@material-ui/core/Chip"
import List from "@material-ui/core/List"
import TimeAgo from 'react-timeago'
import "./question.css"
import {categoryReducer} from "./category_reducer"
import Answer from "./answer/answer"
import NewAnswerForm from "./answer/new-answer-form"
import AnswerTabs from "./answer/answer-tabs.js"
import addHeartToDatabase from "./functions/hearts"
import {connect} from "react-redux"


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '1rem auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
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
  readMore:{
    fontSize: `0.7rem`,
  }
}));



function QuestionCard({ownProps,user,isLoggedIn}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [displayRead, setDispalyRead] = React.useState('block');
  const [enableHeart, changeHeart] = React.useState(false);
  var isAnswers = true;
  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (displayRead === 'block') {
      setDispalyRead('none');
    }
    else setDispalyRead('block');   
  };  
  let dateProper = ownProps.update + 'Z';

  // TODO: props.answers == undefined when a question is added from backend but and empty string wnen updated from backend
  if (typeof ownProps.answers === 'undefined' || ownProps.answers.length === 0 ){
    isAnswers = false;
  }

  async function addHeart(id,type){
    if (isLoggedIn){
       let result = await addHeartToDatabase(ownProps.title,type,id,user.token);
       changeHeart(true);
    }
    else{
      alert('You need to be logged in to heart!')
    }
   
  }

  function Categories(categories) {
    return Object.values(categories['categories']).map( (id) => {      
      id = parseInt(id);
        return(
        <Chip 
              label={categoryReducer(id)}
              className={`chip ${categoryReducer(id)}-color`}
              key={id}
          /> 
        )      
    })
  } 

  //console.log('PROPS>ANSWERS', props.answers);
  const allAnswers = (
    <CardContent>          
      <List>
        {
          (isAnswers) ? ownProps.answers.map( answer => (
            <Answer 
              key={answer.ID} 
              id={answer.ID}
              title={answer.title} 
              content={answer.content} 
              date={answer.date}
              author={answer.author} 
              hearts={answer.hearts} 
              heartCallback={addHeart}               
              enableHeart={enableHeart}
            /> 
          )) : 'No answers yet...be the first to post' 
        }
      </List>
    </CardContent>);

 

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
            <React.Fragment>
                <Categories categories={ownProps.categories} />
             </React.Fragment> 
        } 
        
        subheader={ <TimeAgo date={dateProper} live={false} /> } // Date Modified
      />
      <CardContent>
        {/* Question */}
        <Typography variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={ {__html: `<h2>${ownProps.title}</h2>  ${ownProps.question}`} }>
       
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={ function updateHeart() { addHeart(ownProps.questionID, 'question')} }
          disabled={enableHeart}
        >
          <FavoriteIcon 
          aria-label="add to favorites"  className={classes.heart} /> <span className={classes.heartNumber}>{ownProps.hearts}</span>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
         <small style={ {display: displayRead} } className={classes.readMore}>Click to see {ownProps.answers.length} answer{ownProps.answers.length === 1 ? '' : 's'} </small><ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <AnswerTabs answerForm={<NewAnswerForm questionID={ownProps.questionID} />} answers={allAnswers} />       
      </Collapse>
      
    </Card>
  );
}

const mapStateToProps = ({isLoggedIn, user}, ownProps) => {
  return {isLoggedIn, user, ownProps};
}

export default connect(mapStateToProps)(QuestionCard);