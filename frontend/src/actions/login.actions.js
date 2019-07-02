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
        .then((response) => {
            // console.log(response);
            if (response.status === 200) {
                dispatch({
                    type: types.LOGIN,
                    payload: response.data,
                });
                dispatch(
                    createMessages(types.MESSAGE, {
                        loginSuccess: "logged in successfully",
                    }),
                );
            } else {
                dispatch(
                    createErrors(types.ERROR, response.statusText, response.status),
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
            if(err.response) {
                dispatch(
                  createErrors(
                    types.ERROR,
                    err.response.data,
                    err.response.status,
                  ),
                );
            }
            console.log(err);
            dispatch(createErrors(types.ERROR, err.message, 500));
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
