import * as types from "../actions/types";

const initialState = {
    isAuthenticated: false,
};

const loginReducer = function(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            let token = action.payload.token;
            localStorage.setItem("authToken", token);
            return {
                ...state,
                isAuthenticated: true,
            };
        default:
            return state;
    }
};
export default loginReducer;
