import React, { Component } from "react";
import Login from "./components/Login/login";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./App.scss";
import Alerts from "./components/common/Alerts";
import { Provider } from "react-redux";
import store from "./store";

const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE,
};

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...options}>
                    <Alerts />
                    <Login />
                </AlertProvider>
            </Provider>
        );
    }
}

export default App;
