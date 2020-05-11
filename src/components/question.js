import React from 'react';
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
}));

export default function QuestionCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  var isAnswers = true;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // TODO: props.answers == undefined when a question is added from backend but and empty string wnen updated from backend
  if (typeof props.answers === 'undefined' || props.answers === ''){
    isAnswers = false;
  }

  function Categories(categories) {
    return props.categories.map( (id) => {
        return(
        <Chip 
              label={categoryReducer(id)}
              className={`chip ${categoryReducer(id)}-color`}
              key={id}
          /> 
        )      
    })
  } 

  const allAnswers = (
    <CardContent>          
      <List>
        {
          (isAnswers) ? props.answers.map( answer => (
            (answer.post_status === 'publish') ? <Answer key={answer.ID} title={answer.post_title} content={answer.post_content} /> : '' 
          )) : '' 
        }
      </List>
    </CardContent>);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
            <React.Fragment>
                <Categories categories={props.categories} />
             </React.Fragment> 
        } 
        
        subheader={ <TimeAgo date={props.update} live={false} /> } // Date Modified
      />
      <CardContent>
        {/* Question */}
        <Typography variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={ {__html: `<h2>${props.title}</h2>  ${props.question}`} }>
       
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <AnswerTabs answerForm={<NewAnswerForm questionID={props.questionID} />} answers={allAnswers} />       
      </Collapse>
      
    </Card>
  );
}