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

class HeaderComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	render() {
		return(
				<Header className="header">
					<div className="logo" />

					{
						<span
							className="floatRight"
						>
							<Button
								type="primary"
								style={{ borderRadius: "0" }}
							>
								<Link to="/login">
									{ SIGNOUT_BUTTON }<Icon type="right" />
								</Link>
							</Button>
						</span>
					}
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={["1"]}
						style={{ lineHeight: "64px" }}
					>
						<Menu.Item
							key="1"
						>
							<Link to="/table">Table</Link>
						</Menu.Item>

						<Menu.Item
							key="2"
						>
							<Link to="/images">Images</Link>
						</Menu.Item>

						<Menu.Item
							key="3"
						>
							<Link to="/todolist">Todo List</Link>
						</Menu.Item>
					</Menu>
				</Header>
		);
	}
}

export default HeaderComponent;