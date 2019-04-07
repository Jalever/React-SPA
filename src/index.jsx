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

import HeaderComponent from "./components/Header/index.jsx";
import FooterComponent from "./components/Footer/index.jsx";
import TableComponent from "./components/TableComponent/index.jsx";
import ImageComponent from "./components/ImageComponent/index.jsx";
import TodoContentComponent from "./components/TodoContent/index.jsx";

import "./styles/style.scss";

class App extends React.Component {
	render() {
		return(
			<React.Fragment>
				<Layout>
					<HeaderComponent />
					<Switch>
						<Route exact path="/" component={TableComponent}/>
						<Route path="/images" component={ImageComponent}/>
						<Route path="/todolist" component={TodoContentComponent}/>
					</Switch>
					<FooterComponent />
				</Layout>
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

