import * as types from "../actions/types";
const Cookies = require("js-cookie");

const initialState = {
    isAuthenticated: !!Cookies.get("authToken"),
    currentUser: JSON.parse(localStorage.getItem("currentUser")),
    isLoading: false,
    signupSuccess: false,
};

const loginSignupReducer = function(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            let token = action.payload.token;
            Cookies.set("authToken", token, {path: "/", expires: new Date(action.payload.expiry)});
            localStorage.setItem("currentUser", JSON.stringify(action.payload.user));
            return {
                ...state,
                isAuthenticated: true,
                currentUser: action.payload.user
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
