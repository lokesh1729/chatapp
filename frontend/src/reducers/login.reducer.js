import * as types from "../actions/types";
const Cookies = require("js-cookie");

const initialState = {
    isAuthenticated: !!Cookies.get("authToken"),
    isLoading: false,
    signupSuccess: false,
};

const loginSignupReducer = function(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            let token = action.payload.token;
            Cookies.set("authToken", token, {path: "/", expires: new Date(action.payload.expiry)});
            return {
                ...state,
                isAuthenticated: true,
            };
        case types.SIGNUP:
            return {
                ...state,
                signupSuccess: !state.signupSuccess
            };
        case types.HTTP_CALL_INITIATED:
            return {
                ...state,
                isLoading: true,
            };
        case types.HTTP_CALL_COMPLETED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
export default loginSignupReducer;
