import axios from "axios";
import * as types from "./types";
import { createErrors, createMessages } from "./error.actions";

export const makeHttpCall = (url, body, successMsg, action_type, dispatch) => {
  const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
  axios
        .post(url, body, config)
        .then((response) => {
            // console.log(response);
            dispatch({
                type: types.HTTP_CALL_COMPLETED,
            });
            dispatch({
                type: action_type,
                payload: response.data,
            });
            dispatch(
                createMessages(types.MESSAGE, {
                    loginSuccess: successMsg,
                }),
            );
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
            if(err.status && err.statusText) {
              return dispatch(
                    createErrors(types.ERROR, err.statusText, err.status),
                );
            }
            return dispatch(createErrors(types.ERROR, err.message, 500));
        })
};
