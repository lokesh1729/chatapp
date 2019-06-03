import * as types from "../actions/types";

const initialState = {
    msg: {},
    status: "",
};
const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ERROR:
            return { msg: action.payload.msg, status: action.payload.status };
        default:
            return state;
    }
};
export default errorReducer;
