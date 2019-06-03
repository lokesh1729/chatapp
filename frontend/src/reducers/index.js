import { combineReducers } from "redux";
import login from "./login.reducer";
import errors from "./error.reducer";
import messages from "./message.reducer";

export default combineReducers({ login, errors, messages });
