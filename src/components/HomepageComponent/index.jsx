import React from "react";

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

// class HomepageComponent extends React.Component {
// 	componentDidMount() {
// 		console.log("this.props");
// 		console.log(this.props);
// 	}

// 	render() {
// 		return(
// 			<React.Fragment>
// 				<Layout>
// 					<HeaderComponent />
// 					<Switch>
// 						<Route exact path={this.props.match.path} component={TableComponent}/>
// 						<Route path={`${this.props.match.path}/images`} component={ImageComponent}/>
// 						<Route path={`${this.props.match.path}/todolist`} component={TodoContentComponent}/>
// 					</Switch>
// 					<FooterComponent />
// 				</Layout>
// 			</React.Fragment>

// 		);
// 	}
// }



const HomepageComponent = ({match}) => {

	console.log("match");
	console.log(match);
	return(
		<React.Fragment>
			<Layout
				style={{ height: "100%" }}
			>
				<HeaderComponent match={match}/>
				<Switch>
					<Route exact path="/home" component={TableComponent}/>
					<Route exact path="/home/images" component={ImageComponent}/>
					<Route exact path="/home/todolist" component={TodoContentComponent}/>
					<Route path="/home/bos" component={BOSComponent}/>
				</Switch>
				<FooterComponent />
			</Layout>
		</React.Fragment>
	);
};

export default HomepageComponent;