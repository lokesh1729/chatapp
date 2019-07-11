import * as types from "../actions/types";

const initialState = {
    msg: {},
};
const messageReducer = (state = initialState, action) => {
    if (action.type === types.MESSAGE) {
        return (state = action.payload);
    }
    return state;
};
export default messageReducer;
