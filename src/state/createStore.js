import {createStore as reduxCreateStore} from 'redux';

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
    if (action.type === `INCREMENT`){
        return Object.assign( {}, state, {count: state.count + action.payload}); // Declare an empty object, copy the state into it, then copy and replace the count variable in the state object
    
    }
    // default case
    return state;
}

const initialState = {count:0}

const createStore = () => reduxCreateStore(reducer, initialState);
export default createStore;