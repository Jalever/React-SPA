import React from "react";
import { connect } from "react-redux";

import { compareHeight } from "./../../actions/index.jsx";

import {
	Menu,
	Button,
	Icon,
	Layout
} from "antd";
import "antd/dist/antd.css";

const {
	Header
} = Layout;

import {
	Route,
	Link,
	Switch
} from "react-router-dom";

import HeaderComponent from "./../Header/index.jsx";
import FooterComponent from "./../Footer/index.jsx";
import ImageComponent from "./../ImageComponent/index.jsx";
import TodoContentComponent from "./../TodoContent/index.jsx";
import TableComponent from "./../TableComponent/index.jsx";
import BOSComponent from "./../BOSComponent/index.jsx";

import { SIGNOUT_BUTTON } from "./../../constants/todolist.jsx";

import "./style.scss";

const HomepageComponent = ({ clientHeight, scrollHeight }) => {
	
	// let cHeight = document.documentElement.clientHeight;
	// let sHeight = document.body.scrollHeight;
	// console.log("clientHeight: " + clientHeight);
	// console.log("scrollHeight: " + scrollHeight);

	// console.log("HomepageComponent - clientHeight");
	// console.log(cHeight);
	// console.log("HomepageComponent - scrollHeight");
	// console.log(sHeight);
	// console.log("\n");

	return(
		<React.Fragment>
			<Layout
			>
				{/**
					<HeaderComponent />
				**/}
				
				{/**
					<Switch>
						<Route exact path="/home" component={TableComponent}/>
						<Route exact path="/home/images" component={ImageComponent}/>
						<Route exact path="/home/todolist" component={TodoContentComponent}/>
						<Route path="/home/bos" component={BOSComponent}/>
					</Switch>
				**/}

				{/**
					<FooterComponent />
					
				**/}

			</Layout>

			<div className="homepage">
				<div className="header">
					<HeaderComponent />
				</div>

				<div className="content">
					<Switch>
						<Route exact path="/home" component={TableComponent}/>
						<Route exact path="/home/images" component={ImageComponent}/>
						<Route exact path="/home/todolist" component={TodoContentComponent}/>
						<Route path="/home/bos" component={BOSComponent}/>
					</Switch>
				</div>

				<div className="footer">
					React Single Page Application
				</div>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	let { clientHeight, scrollHeight } = state.compareHeight;
	// return {
	// 	clientHeight,
	// 	scrollHeight
	// };
	return { clientHeight, scrollHeight };
};

export default connect(mapStateToProps, { compareHeight })(HomepageComponent);