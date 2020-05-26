import {createStore as reduxCreateStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import cloneDeep from 'lodash/cloneDeep'
import _ from 'lodash'
//import {composeWithDevTools } from 'remote-redux-devtools'

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 * Instead of mutating the state directly, you specify the mutations you want to happen with plain objects called actions. 
 * Then you write a special function called a reducer to decide how every action transforms the entire application's state.
 */

 
 // Accepts the current state and an action detailing what to do with it
const reducer = (state, action) => {

    if (action.type === `USERUPDATE`){
        let newState = {...state, user:{...action.payload}, isLoggedIn: true};
        return newState;
    }

    if (action.type === `QUESTIONUPDATE`){
        //  console.log(state);
         console.log('QUESTIONUPDATE', action.payload);
         let pages = action.payload.pop();
         pages = pages.post_count;
        // console.log('page_count', pages)
        // console.log('page_count', typeof pages)
         let newState;
         if (pages === false){
            newState = {...state, questions:{...action.payload}};
         }
         else{
            newState = {...state, questions:{...action.payload}, pages:pages };
         }
         
         console.log('QUESTION UPDAE NEW STATE', newState);
         console.log(newState.questions.length);
         // mainly to tackle search requests
         if (_.isEmpty(newState.questions)){
             newState.questions = "empty";
         }
         return newState;
    }

    if (action.type === `ADDQUESTION`){
        // let newQuestions = { ...state.questions };
        // // unshift adds to the beginning of the array
        // newQuestions.unshift(action.payload);

        let newState = {...state, questions: action.payload };
           console.log(newState);
           console.log(state);
        return newState;

    }

    if (action.type === `ADDANSWER`){
       console.log(state);
      let newState = cloneDeep(state);
       let questionToUpdate = Object.values(newState.questions).find(element => element.id === action.payload.question);
       questionToUpdate.answers.push(action.payload);
       console.log(newState);
       return newState;
    }

    // default case
    return state;
}


const initialState = {
    user: {},
    isLoggedIn: false,
    questions: false,
    pages: false,
}

// hooking up thunk to store
const createStore = () => reduxCreateStore(reducer, initialState, applyMiddleware(thunk)); // before redux dev tools
// redux devtools
// const composeEnhancers = composeWithDevTools({raltime: true, port:8000});
// const createStore = () => reduxCreateStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk) ) );
// end redux devtools
export default createStore;