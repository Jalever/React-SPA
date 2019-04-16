import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { addUserInfo } from "./../../actions/index.jsx";

import Cookies from "js-cookie";

import {
	Input, 
	Button,
	message,
	Checkbox,
	Icon,
	Form
} from "antd";
import "antd/dist/antd.css";

import { 
	SUCCESS,
	USER_NO_EXIST,
	FORGOT_PASSWORD,
	APP_KEY,
	REMEMBER_CHECK_BOX
} from "./../../constants/common.js";

import { 
	Login_BUTTON,
	USERNAME_INPUT,
	REGISTER_NOW,
	PASSWORD_INPUT
} from "./../../constants/todolist.jsx";

import axios from "axios";
import qs from "qs";

import API from "./../../utils/api.js";

import "./style.scss";
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// axios.defaults.headers.post['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyS2V5IjoiNDEyMzVkZmFhM2JjNDU3ZmE4MTA3ZDZhNzIwZmY2ODciLCJ1c2VyTmFtZSI6ImphbGV2ZXIiLCJ1c2VyVHlwZSI6IjAiLCJhcHBLZXkiOiJsNzczMThhOTQ0MmM0MWI4YTE2NzkwMzQ0MWQ4Zjg4NCIsImFwcE5hbWUiOiJoZWxsb1dvcmxkIiwiYXBwRGIiOiJsNzczMThhOTQ0MmM0MWI4YTE2NzkwMzQ0MWQ4Zjg4NCIsImxvZ2luVGltZSI6IjE1NTQ3MTQ0MjA5NDUiLCJleHAiOjB9.hjGHeL72B7M3-tEDq2teifQ8X_3DvYs8aJF2woPeCes';

class LoginComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			val: "Please enter...",
			res: [],
			filedata: null,
			username: "",
			password: "",
			isChecked: false
		};

		this.fetchResponseData = this.fetchResponseData.bind(this);
		this.handleUploadFile = this.handleUploadFile.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {

	}

	fetchResponseData() {

	}

	handleUploadFile(e) {
		// console.log("this.files");
		// let file = e.target.files[0];
		// console.log(file);
		// this.setState({
		// 	filedata: file
		// });

		// setTimeout(() => {
		// 	let response = this.fetchResponseData();
		// 	response.then(function(res) {
		// 		console.log(res.data.data);
		// 	});
		// }, 1000);
	}

	handleChange(e, type) {
		switch(type) {
			case "username": {
				this.setState({
					username: e.target.value
				});
			}
			case "password": {
				this.setState({
					password: e.target.value
				});
			}
			case "checkbox": {
				this.setState({
					isChecked: e.target.checked
				});
			}
			default: 
				return new Error("There was some wrong in fn: handleChange");
		}
	}

	handleSubmit(e) {
		e.preventDefault();

		// let [cookies, setCookies] = useCookies(["userInfo"]);

		let { history } = this.props;
		
		let username = this.state.username,
			password = this.state.password,
			isChecked = this.state.isChecked;

		let BodyFormData = new FormData();
		BodyFormData.set("name", username);
		BodyFormData.set("password", password);
		BodyFormData.set("appKey", APP_KEY);
		BodyFormData.set("isRemember", isChecked);

		API.login(BodyFormData).then(res => {

			if(res.data.code === SUCCESS) {
				message.success(res.data.message);

				this.props.addUserInfo(res.data.data);
				// setCookies("userInfo", res.data.data);

				Cookies.set("userInfo", res.data.data);
			} else {
				message.error(res.data.message);
			}

		}).then(() => {
			console.log("this.props");
			console.log(this.props);
		}).then(() => {
			history.push("/home");
		});
	};

	render() {
		return(
			<div className="loginForm">
				<Form
					onSubmit={ this.handleSubmit } 
					style={{ width: "50vw" }}
				>
					<Form.Item>
						{
							<Input
								prefix={
									<Icon
										type="user"
										style={{ color: "rgba(0, 0, 0, 0.24)" }}
									/>
								}
								placeholder={ USERNAME_INPUT }
								onChange={ (e) => this.handleChange(e, "username") }
							/>
						}

						{
							<Input
								prefix={
									<Icon
										type="lock"
										style={{ color: "rgba(0, 0, 0, 0.24)" }}
									/>
								}
								placeholder={ PASSWORD_INPUT }
								onChange={ (e) => this.handleChange(e, "password") }
								type="password"
							/>
						}

						{
							<Checkbox
								onChange={ (e) => { this.handleChange(e, "checkbox") } }
							>{ REMEMBER_CHECK_BOX }</Checkbox>
						}

						{
							<a 
								href=""
								style={{ float: "right" }}>{ FORGOT_PASSWORD }</a>
						}

						{
							<Button
								type="primary"
								htmlType="submit"
								style={{ width: "100%" }}
							>{Login_BUTTON}</Button>
						}
						&nbsp;Or&nbsp;
						{
							<a 
								onClick={ () => { 
									this.props.history.push("/register");
								} }
							>{ REGISTER_NOW }</a>
						}
					</Form.Item>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	let { userInfo } = state;
	return { userInfo };
};	

export default connect(
	mapStateToProps, 
	{ addUserInfo }
)(LoginComponent);




