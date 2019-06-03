import * as types from "../actions/types";

const initialState = {
    msg: {},
};
const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.MESSAGE:
            return (state = action.payload);
        default:
            return state;
    }
};
export default messageReducer;
