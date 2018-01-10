import { FETCH_USER } from "../actions/types";

// auth will be null, false, or user
export default function(state = null, action) {
    //console.log(action);
    switch(action.type) {
        case FETCH_USER:
            // action.payload is object or empty string
            // make sure empty string is false
            // '' == false
            // if empty string or false, return false
            // if action.payload is an empty string or false, return false
            // if action.payload is not falsie return action payload,
            // if false, return false
            return action.payload || false;
        default:
            return state;
    }
}
