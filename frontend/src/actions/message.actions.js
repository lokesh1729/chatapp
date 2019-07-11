import * as types from "./types";
import { createErrors, createMessages } from "./error.actions";


export const alert = (message_type, message, status="") => (dispatch) => {
    if(message_type === types.ERROR){
      dispatch(createErrors(types.ERROR, message, status))
    }
    dispatch(createMessages(types.MESSAGE, message));
};
