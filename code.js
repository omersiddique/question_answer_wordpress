/*
Hold Elements
<Link to={`/iman-shield/question/${document.node.strapiId}`}>{document.node.question}</Link>


*/

  {/* {data.allStrapiQuestion.edges.map( document => (               
                    <QuestionCard question={document.node.question} categories={document.node.categories} update={document.node.updated_at} key={document.node.strapiId} />                  
                )
            )} */}

            <h3>{data.strapiQuestion.question}</h3>
            <h6>{data.strapiQuestion.updated_at}</h6>


// export const pageQuery = graphql`
// query questionQuery{
//     allStrapiQuestion {
//       edges {
//         node {
//           question
//           strapiId
//           is_approved
//           updated_at(fromNow: true)
//           categories{
//             name
//             id
//           }
//         }
//       }
//     }
//   }  
// `


import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import {connect} from "react-redux"

import Menu from "./menu"

// accept the const state and the increment dispatch function
const AppBarFilled = ({count, increment}) => (
    <AppBar position="static" color="primary">
        <Toolbar>
            <IconButton edge="start"  color="primary" aria-label="menu">
            </IconButton>
            <Typography component="h6" >
                Hikmah Sessions
            </Typography>
            <Menu />
            <Button variant="contained" color="primary" onClick={increment}>Login {count} times</Button>
        </Toolbar>
    </AppBar>
)

// destructure count object from state as it may have other objects in the future
const mapStateToProps = ( { count } ) => {
    return { count }
}

// dispatch function is provided to the component automatically, here we pass it to the mapDispatchToProps function first and return the increment 
// action creator to dispatch a change to the state
const mapDispatchToProps = dispatch => {
    return { increment: () => dispatch({ type: `INCREMENT`, payload: 5 }) }
}

// here we use the connect function to name two functions one for handling the received state and one provide the dispatch function
export default  connect(mapStateToProps, mapDispatchToProps)(AppBarFilled)


<Alert severity="error">This is an error message!</Alert>
<Alert severity="warning">This is a warning message!</Alert>
<Alert severity="info">This is an information message!</Alert>
<Alert severity="success">This is a success message!</Alert>



  
useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  autoHideDuration={5000}



  import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const styles = {
  rootSnack :{
    zIndex: `2000 !important`,
    fontSize: `50px`,
  }
}

export default withStyles(styles)(class SnackBar extends React.Component {
   
    constructor(props){
      super(props);
      this.state = {
        open: true,
      };
    }

    render(props){     
      const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }     
      
  
      const handleClick = () => {
       this.setState({open: true});
      };
    
      const handleClose = (event, reason) => {
       // console.log('Clicked');
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({open: false});
      };

      return (
          <div className={`message-snackbar`}>
            <Snackbar className={this.props.classes.root} open={this.state.open} autoHideDuration={3000}  onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {this.props.message}
              </Alert>
            </Snackbar>
          </div>
        );
    }
})



