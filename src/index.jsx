import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store.jsx";
import { createBrowserHistory } from "history";
const customHistory = createBrowserHistory();

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
import RegisterComponent from "./components/RegisterComponent/index.jsx";

import "./styles/style.scss";

class App extends React.Component {

	componentDidMount() {
	}

	render() {
		return(
			<React.Fragment>
				<Switch>
					<Route exact path="/" component={LoginComponent}/>
					<Route path="/home" component={HomepageComponent}/>
					<Route path="/register" component={RegisterComponent}/>
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

