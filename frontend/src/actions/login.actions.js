import * as types from "./types";
import { makeHttpCall } from "./action.utils";

export const login = (username, password) => (dispatch) => {
    const body = JSON.stringify({ username, password });
    dispatch({
        type: types.HTTP_CALL_INITIATED,
    });
    makeHttpCall("/api/auth/login/", body, "logged in successfully", dispatch);
};
