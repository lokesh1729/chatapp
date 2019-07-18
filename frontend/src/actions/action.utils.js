import axios from "axios";
import * as types from "./types";
import { createErrors, createMessages } from "./error.actions";

export const makeHttpCall = (url, body, successMsg, dispatch) => {
  const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
  axios
        .post(url, body, config)
        .then((response) => {
            // console.log(response);
            if (response.status === 200) {
                dispatch({
                    type: types.LOGIN,
                    payload: response.data,
                });
                dispatch(
                    createMessages(types.MESSAGE, {
                        loginSuccess: successMsg,
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
                return dispatch(
                  createErrors(
                    types.ERROR,
                    err.response.data,
                    err.response.status,
                  ),
                );
            }
            return dispatch(createErrors(types.ERROR, err.message, 500));
        })
        .catch((err) =>
            dispatch(
                createErrors(
                    types.ERROR,
                    err,
                    500,
                ),
            ),
        );
};
