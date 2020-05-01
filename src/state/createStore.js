import {createStore as reduxCreateStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

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
        return {...state, questions:{...action.payload}};
    }

    if (action.type === `ADDQUESTION`){
        let newQuestions = { ...state.questions };
        newQuestions[0].unshift(action.payload);

        let newState = {...state, questions: newQuestions };
        // console.log(newState.questions);
        // console.log(state.questions);
        return newState;

    }
    // default case
    return state;
}


const initialState = {
    user: {
        token: '',
        user_email: '',
        user_nicename: '',
        user_display_name: '',
    },
    isLoggedIn: false,
    questions: false,
}

// hooking up thunk to store
const createStore = () => reduxCreateStore(reducer, initialState, applyMiddleware(thunk));
export default createStore;