import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./styles/tailwind.css";
import * as serviceWorker from "./serviceWorker";

import Raven from "raven-js";

if (process.env.NODE_ENV === "production") {
    Raven.config(process.env.REACT_APP_SENTRY_URL).install();
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
if (module.hot && process.env.NODE_ENV === "development") {
    module.hot.accept("./App", () => {
        const NextRoot = require("./App").default;
        ReactDOM.render(<NextRoot />, rootElement);
    });
}

serviceWorker.unregister();
