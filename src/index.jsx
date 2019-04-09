import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store.jsx";

import {
	Layout
} from "antd";
import "antd/dist/antd.css";

import {
	BrowserRouter,
	Route,
	Switch
} from "react-router-dom";

import HomepageComponent from "./components/HomepageComponent/index.jsx";
import LoginComponent from "./components/LoginComponent/index.jsx";

import "./styles/style.scss";

class App extends React.Component {
	render() {
		return(
			<React.Fragment>
				<Switch>
					<Route exact path="/" component={HomepageComponent}/>
					<Route path="/login" component={LoginComponent}/>
				</Switch>
			</React.Fragment>
		);
	}
}


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

