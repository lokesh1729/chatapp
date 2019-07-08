import * as types from "../actions/types";

const initialState = {
    msg: {},
    status: "",
};
const errorReducer = (state = initialState, action) => {
    if (action.type === types.ERROR) {
        return { msg: action.payload.msg, status: action.payload.status };
    }
    return state;
};
export default errorReducer;
