import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
import history from "./utils/history";
import App from "./App";

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </>,
  document.getElementById("root")
);
