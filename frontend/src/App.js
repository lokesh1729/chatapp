import React, { Component, Fragment } from "react";
import Login from "./components/Login/login";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./App.scss";
import Alerts from "./components/common/Alerts";
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import store from "./store";
import Spinner from "./components/common/Spinner";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/home";
import RoomEnter from "./components/RoomEnter/RoomEnter";
import Room from "./components/Room/Room";
import {BASE_NAME} from "./constants";

const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE,
};

const WrappedLogin = (props) => {
    return (
        <Fragment>
            <Spinner />
            <Alerts />
            <Login {...props} />
        </Fragment>
    );
};

const WrappedRoom = (props) => {
  return (
    <Fragment>
      <Alerts/>
      <Room {...props} />
    </Fragment>
  )
};

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <CookiesProvider>
                  <AlertProvider template={AlertTemplate} {...options}>
                      <BrowserRouter basename={BASE_NAME}>
                          <Switch>
                              <Route path={"/"} exact component={Home} />
                              <Route path={"/login"} component={WrappedLogin} />
                              <Route path={"/room"} exact component={RoomEnter} />
                              <Route path={"/room/:roomName"} component={WrappedRoom} />
                          </Switch>
                      </BrowserRouter>
                  </AlertProvider>
                </CookiesProvider>
            </Provider>
        );
    }
}

export default App;
