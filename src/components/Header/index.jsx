import React from "react";
import { connect } from "react-redux";
import "./style.scss";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

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

const HeaderComponent = (state) => {

	const routes = [
		{
			pathname: "/home",
			itemname: "Home"
		},{
			pathname: "/home/images",
			itemname: "Images"
		},{
			pathname: "/home/todolist",
			itemname: "Todo List"
		},{
			pathname: "/home/bos",
			itemname: "BOS"
		}
	];


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
					<Link
						to="/home/userInfo"
					>
						<Avatar
							shape="square"
							size={45}
							icon="user"
							style={{ marginRight: "2rem",cursor: "pointer" }}
						/>
					</Link>

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
					style={{ lineHeight: "64px" }}
				>
					{/* 遍历出路由路径或名称 */}
					{
						routes.map((curVar, index) => {
							return <Menu.Item
								key={ curVar.pathname }
							>
								<Link to={curVar.pathname}> { curVar.itemname } </Link>
							</Menu.Item>;
						})
					}
				</Menu>
			}
		</Header>
	);
};

const mapStateToProps = state => {
	return state;
}

export default connect(mapStateToProps)(HeaderComponent);
