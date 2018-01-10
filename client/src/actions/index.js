import axios from "axios";
import { FETCH_USER } from "./types";

// const fetchUser = function() {
//     const request =axios.get("/api/current_user");
//     return {
//         type: FETCH_USER,
//         payload: request
//     };
// }

// export const fetchUser = function() {
//     // redux thunk auto passes dispatch to any returned function from action
//     return async function(dispatch) {
//         const response = await axios.get("/api/current_user");
//         dispatch({
//             type:FETCH_USER,
//             payload: response
//         });
//     }
// };

export const fetchUser = () => async dispatch => {
    const res = await axios.get("/api/current_user");
    dispatch({type: FETCH_USER, payload: res.data});
}

// after payment has been made, handle token
export const handleStripeToken = (token) => async dispatch => {
    const res = await axios.post("/api/handleStripeToken", token);

    // update user model
    dispatch({type: FETCH_USER, payload: res.data});
}
