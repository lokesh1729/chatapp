import axios from "axios";
import * as types from "./types";
import * as constants from "./constants";
import { createErrors, createMessages } from "./error.actions";

export const login = (username, password) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ username, password });
    dispatch({
        type: types.HTTP_CALL_INITIATED,
    });
    axios
        .post("/api/auth/login/", body, config)
        .then((user) => {
            console.log(user);
            if (user.status === 200) {
                dispatch({
                    type: types.LOGIN,
                    payload: user.data,
                });
                dispatch(
                    createMessages(types.MESSAGE, {
                        loginSuccess: "logged in successfully",
                    }),
                );
            } else {
                dispatch(
                    createErrors(types.ERROR, user.statusText, user.status),
                );
            }
            dispatch({
                type: types.HTTP_CALL_COMPLETED,
            });
        })
        .catch((err) => {
            dispatch({
                type: types.HTTP_CALL_COMPLETED,
            });
            dispatch(
                createErrors(
                    types.ERROR,
                    err.response.data,
                    err.response.status,
                ),
            );
        })
        .catch((err) =>
            dispatch(
                createErrors(
                    types.ERROR,
                    constants.GENERIC_ERROR_MESSAGE,
                    err.response.status,
                ),
            ),
        );
};
