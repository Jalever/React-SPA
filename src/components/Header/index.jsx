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
	Avatar,
	Icon
} from "antd";
import "antd/dist/antd.css";

import { SIGNOUT_BUTTON } from "./../../constants/todolist.jsx";

import "./style.scss";

const {
	Header
} = Layout;

const HeaderComponent = () => {
	// console.log("HeaderComponent - match: ");
	// console.log(match);

	return(
		<Header 
			className="header"
			style={{ width: "100vw" }}
		>
			<div className="logo" />
		

			{
				<span
					className="floatRight"
				>
					<Avatar
						shape="square"
						size={45}
						icon="user"
						style={{ marginRight: "2rem",cursor: "pointer" }}
					/>

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
						<Link to="/home">Table</Link>
					</Menu.Item>

					<Menu.Item
						key="2"
					>
						<Link to="/home/images">Images</Link>
					</Menu.Item>

					<Menu.Item
						key="3"
					>
						<Link to="/home/todolist">Todo List</Link>
					</Menu.Item>

					{

						<Menu.Item
							key="4"
						>
							<Link to="/home/bos">BOS</Link>
						</Menu.Item>
					}
				</Menu>
			}
		</Header>
	);
};

export default HeaderComponent;