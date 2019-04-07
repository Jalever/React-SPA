import React from "react";
import "./style.scss";

import {
	Link
} from "react-router-dom";

import {
	Layout,
	Menu
} from "antd";
import "antd/dist/antd.css";


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
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={["1"]}
						style={{ lineHeight: "64px" }}
					>
						<Menu.Item
							key="1"
						>
							<Link to="/">Home</Link>
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