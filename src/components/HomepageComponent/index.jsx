import React from "react";

import {
	Layout
} from "antd";
import "antd/dist/antd.css";

import {
	Route,
	Switch
} from "react-router-dom";

import HeaderComponent from "./../Header/index.jsx";
import FooterComponent from "./../Footer/index.jsx";
import ImageComponent from "./../ImageComponent/index.jsx";
import TodoContentComponent from "./../TodoContent/index.jsx";
import TableComponent from "./../TableComponent/index.jsx";

class HomepageComponent extends React.Component {
	render() {
		return(
			<React.Fragment>
				<Layout>
					<HeaderComponent />
					<Switch>
						<Route path="/" component={TableComponent}/>
						<Route path="/images" component={ImageComponent}/>
						<Route path="/todolist" component={TodoContentComponent}/>
					</Switch>
					<FooterComponent />
				</Layout>
			</React.Fragment>

		);
	}
}

export default HomepageComponent;