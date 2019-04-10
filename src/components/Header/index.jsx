import React from "react";
import "./style.scss";

import {
	Link,
	Redirect
} from "react-router-dom";

import {
	Layout,
	Menu,
	Button,
	Icon
} from "antd";
import "antd/dist/antd.css";

import { SIGNOUT_BUTTON } from "./../../constants/todolist.jsx";

import "./style.scss";

const {
	Header
} = Layout;

// class HeaderComponent extends React.Component {
// 	render() {
// 		return(
// 				<Header className="header">
// 					<div className="logo" />

// 					{
// 						<span
// 							className="floatRight"
// 						>
// 							<Button
// 								type="primary"
// 								style={{ borderRadius: "0" }}
// 							>
// 								<Link to="/login">
// 									{ SIGNOUT_BUTTON }<Icon type="right" />
// 								</Link>
// 							</Button>
// 						</span>
// 					}
					

// 					{

// 						<Menu
// 							theme="dark"
// 							mode="horizontal"
// 							defaultSelectedKeys={["1"]}
// 							style={{ lineHeight: "64px" }}
// 						>
// 							<Menu.Item
// 								key="1"
// 							>
// 								<Link to="/table">Table</Link>
// 							</Menu.Item>

// 							<Menu.Item
// 								key="2"
// 							>
// 								<Link to="/images">Images</Link>
// 							</Menu.Item>

// 							<Menu.Item
// 								key="3"
// 							>
// 								<Link to="/todolist">Todo List</Link>
// 							</Menu.Item>
// 						</Menu>
// 					}
// 				</Header>
// 		);
// 	}
// }


const HeaderComponent = ({ match }) => {
	console.log("HeaderComponent - match: ");
	console.log(match);
	return(
		<Header className="header">
			<div className="header" />
			{

				<span
					className="floatRight"
				>
					<Button
						type="primary"
						style={{ borderRadius: "0" }}
					>
						<Link to="/">
							{ SIGNOUT_BUTTON }<Icon type="right" />
						</Link>
					</Button>
				</span>
			}

			{
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={["1"]}
					style={{ lineHeight: "64px" }}
				>
					<Menu.Item
						key="1"
					>
						<Link to={`${match.path}`}>Table</Link>
					</Menu.Item>

					<Menu.Item
						key="2"
					>
						<Link to={`${match.path}/images`}>Images</Link>
					</Menu.Item>

					<Menu.Item
						key="3"
					>
						<Link to={`${match.path}/todolist`}>Todo List</Link>
					</Menu.Item>
				</Menu>
			}
		</Header>
	);
};

export default HeaderComponent;