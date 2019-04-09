import React from "react";
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

		// this.uploadRef = React.createRef();

		this.fetchResponseData = this.fetchResponseData.bind(this);
		this.handleUploadFile = this.handleUploadFile.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		// this.fetchResponseData("POST", "http://bosapi-demo.rickricks.com/boscenterservice/account/login");
		// let response = this.fetchResponseData();
		// response.then(function(res) {
		// 	console.log(res.data.data);
		// });

		// let uploadValue = this.uploadRef.current;
		// let response = this.fetchResponseData();
		// response.then(function(res) {
		// 	console.log(res.data.data);
		// });
	}

	fetchResponseData() {
		//login: 
		// return axios.post("http://bosapi-demo.rickricks.com/boscenterservice/account/login", qs.stringify({
		// 	name: "jalever",
		// 	password: "jalever123",
		// 	appKey: "l77318a9442c41b8a167903441d8f884",
		// 	isRemember: "false"
		// })).catch(function(err) {
		// 	console.log(err);
		// });

		//upload file
		// let bodyFormData = new FormData();
		// let file = this.state.file;

		// bodyFormData.set("gmodelType", "IFC");
		// bodyFormData.set("gpriority", "1");
		// bodyFormData.set("gmodelDB", "o16f3b64e7b6425faaac86de57f73703");
		// bodyFormData.append("file", file);

		// return axios.post("http://bosapi-demo.rickricks.com/bosdocumentservice/l77318a9442c41b8a167903441d8f884/files", bodyFormData, {
		// 	headers: {
		// 		'Authorization': "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyS2V5IjoiNDEyMzVkZmFhM2JjNDU3ZmE4MTA3ZDZhNzIwZmY2ODciLCJ1c2VyTmFtZSI6ImphbGV2ZXIiLCJ1c2VyVHlwZSI6IjAiLCJhcHBLZXkiOiJsNzczMThhOTQ0MmM0MWI4YTE2NzkwMzQ0MWQ4Zjg4NCIsImFwcE5hbWUiOiJoZWxsb1dvcmxkIiwiYXBwRGIiOiJsNzczMThhOTQ0MmM0MWI4YTE2NzkwMzQ0MWQ4Zjg4NCIsImxvZ2luVGltZSI6IjE1NTQ3MTQ0MjA5NDUiLCJleHAiOjB9.hjGHeL72B7M3-tEDq2teifQ8X_3DvYs8aJF2woPeCes"
		// 	}
		// });

		//create Scene
		// let data = JSON.stringify({
		// 	modelKey: "M1554686110975"
		// });
		
		// return axios.post("http://bos3d-demo.rickricks.com/api/o16f3b64e7b6425faaac86de57f73703/scenes", data, {
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	}
		// });


	}

	handleUploadFile(e) {
		console.log("this.files");
		let file = e.target.files[0];
		console.log(file);
		this.setState({
			filedata: file
		});

		setTimeout(() => {
			let response = this.fetchResponseData();
			response.then(function(res) {
				console.log(res.data.data);
			});
		}, 1000);
	}

	handleChange(e, type) {
		// console.log("type");
		// console.log(type);
		// console.log("e.target.value");
		// console.log(e.target.value);
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
				// console.log("e.target.checked");
				// console.log(e.target.checked);
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
			} else {
				message.error(res.data.message);
			}
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
							<a href="/register">{ REGISTER_NOW }</a>
						}
					</Form.Item>
				</Form>
			</div>

		);
	}
}


export default LoginComponent;




