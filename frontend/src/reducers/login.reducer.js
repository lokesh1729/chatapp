import * as types from "../actions/types";

const initialState = {
    isAuthenticated:
        localStorage.getItem("authToken") !== "undefined" &&
        !!localStorage.getItem("authToken"),
    isLoading: false,
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
export default loginReducer;
