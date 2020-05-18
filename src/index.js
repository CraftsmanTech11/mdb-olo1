import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./Styles/style1.css";
import "./Styles/fontAwesome.min.css";
import "./Styles/main.scss";
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
