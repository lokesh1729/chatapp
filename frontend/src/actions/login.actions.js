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

    axios
        .post("/auth/login/", body, config)
        .then((user) => {
            dispatch(
                createMessages(types.MESSAGE, {
                    loginSuccess: "logged in successfully",
                }),
            );
            dispatch({
                type: types.LOGIN,
                payload: user,
            });
        })
        .catch((err) => {
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
