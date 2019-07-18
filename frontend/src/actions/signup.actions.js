import * as types from "./types";
import { makeHttpCall } from "./action.utils";

export const signup = (username, password, first_name, last_name, security_question1, security_answer1, security_question2, security_answer2) => (dispatch) => {
  const body = JSON.stringify({
    username,
    password,
    first_name,
    last_name,
    security_question1,
    security_answer1,
    security_question2,
    security_answer2,
  });
  dispatch({
        type: types.HTTP_CALL_INITIATED,
    });
  makeHttpCall("/api/auth/register/", body, "signup successful. please login now", types.SIGNUP, dispatch);
};
