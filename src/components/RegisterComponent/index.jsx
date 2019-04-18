import React, { useState } from "react";
import { connect } from "react-redux";

import {
	Button,
	Row,
	Input,
	Form,
	Icon,
	Select,
	Typography,
	Col
} from "antd";
import "antd/dist/antd.css";

const {
	Option
} = Select;

const {
	Title
} = Typography;

import {
	BUTTON_REGISTER,
	BUTTON_GOBACK,
	INPUT_USERNAME,
	INPUT_PASSWORD,
	INPUT_PASSWORD_CONFIRM,
	INPUT_PHONE_NUM,
	INPUT_VALIDATION_CODE,
	INPUT_FULLNAME,
	INPUT_MESSAGE_EMAIL,
	TITLE_REGISTER,
	INPUT_GET_VALIDATION_CODE,
	INPUT_EMAIL
} from "./../../constants/common.js";

import "./style.scss";

import API from "./../../utils/api.js";

// history 不用在mapStateToProps中
const RegisterComponent = ({ history, userInfo, form }) => {

	//引入getFieldDecorator函数
	const { getFieldDecorator } = form;

	//设置发送验证码按钮是否diabled
	let [disabledValidateButton, setDisabledValidateButton] = useState(false);

	// antd自带的label和输入框样式
	const formItemLayout = {
		labelCol: {
			span: 8
		},
		wrapperCol: {
			span: 10
		}
	};

	const goBackToLogin = () => {
		history.push("/");
	};

	let handleSubmit = e => {
		e.preventDefault();

		form.validateFieldsAndScroll((err, values) => {
			if(!err) {
				console.log("Received values of form: ", values);
			}
		});
	};

	let getValidationCode = () => {
		//令发送验证码按钮不可点击
		setDisabledValidateButton(true);

		form.validateFields(["phoneNum"]);

		let phone = form.getFieldValue("phoneNum");
		if(/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
			let data = {
				validateType: "telephone",
				receiver: phone
			};

			let phoneData = new FormData();
			phoneData.set("validateType","telephone");
			phoneData.set("receiver", phone);

			// let response = API.getValidationCode(phoneData);
			fetch("http://bosapi-demo.rickricks.com/boscenterservice/account/validateCode", {
				method: "POST",
				body: phoneData
			}).then( res => {
				console.log("res");
				console.log(res);
				if(res.status === 200 && res.ok) {
					//令发送验证码按钮可点击
					setDisabledValidateButton(false);
				}
			});

			// console.log("response");
			// console.log(response);
		} else {
			form.setFields({
				["phoneNum"]: {
					errors: ["Wrong Regular Expression!"]
				}
			});
		}
	};


	return(
		<React.Fragment>
			<Form
				className="form"
				onSubmit={handleSubmit}
			>


				{
					<Row>
						{
							<Col span={4}>
								<Icon
									type="arrow-left"
									style={{
										fontSize: "2rem"
									}}
									onClick={ () => goBackToLogin()}
								/>
							</Col>
						}

						{
							<Col span={18}>
								<Title
									level={4}
									style={{ cursor: "default" }}
								>{ TITLE_REGISTER }</Title>
							</Col>
						}
					</Row>
				}


				{/* 用户名输入框 */}
				{
					<Form.Item
						{ ...formItemLayout }
						label={ INPUT_USERNAME }
					>
						{
							getFieldDecorator("userName", {
								rules: [{
									required: true,
									message: "Please input your userName."
								}]
							})(
								<Input
									prefix={
										<Icon
											type="user"
											style={{ color: "rgba(0, 0, 0, 0.25)" }}
										/>
									}
									placeholder="Username"
									className="defaultInput"
								/>
							)
						}
					</Form.Item>
				}

				{/* 密码输入框 */}
				{
					<Form.Item
						{ ...formItemLayout }
						label={ INPUT_PASSWORD }
					>
						{
							getFieldDecorator("password", {
								rules: [{
									required: true,
									message: "Please input your Password."
								}]
							})(
								<Input
									prefix={
										<Icon
											type="lock"
											style={{ color: "rgba(0, 0, 0, 0.25)" }}
										/>
									}
									type="password"
									placeholder="Password"
									className="defaultInput"
								/>
							)
						}
					</Form.Item>
				}


				{/* 确认密码输入框 */}
				{
					<Form.Item
						{ ...formItemLayout }
						label={ INPUT_PASSWORD_CONFIRM }
					>
						{
							getFieldDecorator("passwordAgain", {
								rules: [{
									required: true,
									message: "Please input your Password again."
								}]
							})(
								<Input
									prefix={
										<Icon
											type="lock"
											style={{ color: "rgba(0, 0, 0, 0.25)" }}
										/>
									}
									type="password"
									placeholder="Password"
									className="defaultInput"
								/>
							)
						}
					</Form.Item>
				}

				{/* 手机号输入框 */}
				{
					<Form.Item
						{ ...formItemLayout }
						label={ INPUT_PHONE_NUM }
					>
						{
							getFieldDecorator("phoneNum", {
								rules: [{
									required: true,
									message: "Please input your Phone Number."
								}]
							})(
								<Input
									prefix={
										<Icon
											type="phone"
											style={{ color: "rgba(0, 0, 0, 0.25)" }}
										/>
									}
									placeholder="Phone Number"
									className="defaultInput"
								/>
							)
						}
					</Form.Item>
				}

				{/* 验证码输入框 */}
				{
					<Form.Item
						{ ...formItemLayout }
						label={ INPUT_VALIDATION_CODE }
					>
						<Row>
							<Col span={16}>
								{
									getFieldDecorator("validationCode", {
										rules: [{
											required: true,
											message: "Please input your Validation Code."
										}]
									})(
										<Input
											prefix={
												<Icon
													type="message"
													style={{ color: "rgba(0, 0, 0, 0.25)" }}
												/>
											}
											placeholder="Validation Code"
											className="defaultInput"
										/>
									)
								}
							</Col>

							<Col span={8}>
								{

									<Button
										type="primary"
										onClick={getValidationCode}
										disabled={ disabledValidateButton }
									>
										{ INPUT_GET_VALIDATION_CODE }
									</Button>
								}
							</Col>
						</Row>

					</Form.Item>
				}


				{/* 全名输入框 */}
				{
					<Form.Item
						{ ...formItemLayout }
						label={ INPUT_FULLNAME }
					>
						{
							getFieldDecorator("fullname", {
								rules: [{
									required: true,
									message: "Please input your Fullname."
								}]
							})(
								<Input
									prefix={
										<Icon
											type="usb"
											style={{ color: "rgba(0, 0, 0, 0.25)" }}
										/>
									}
									placeholder="Fullname"
									className="defaultInput"
								/>
							)
						}
					</Form.Item>
				}


				{/* 邮箱输入框 */}
				{
					<Form.Item
						{ ...formItemLayout }
						label={ INPUT_EMAIL }
					>
						{
							getFieldDecorator("email", {
								rules: [{
									type: "email",
									message: "The Input is not valid E-Mail!"
								},{
									required: true,
									message: "Please input your Fullname."
								}]
							})(
								<Input
									prefix={
										<Icon
											type="mail"
											style={{ color: "rgba(0, 0, 0, 0.25)" }}
										/>
									}
									placeholder="E-Mail"
									className="defaultInput"
								/>
							)
						}
					</Form.Item>
				}

				{
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
						>{ BUTTON_REGISTER }</Button>
					</Form.Item>
				}

			</Form>

		</React.Fragment>
	);
};

const WrappedRegisterForm = Form.create({
	name: "register"
})(RegisterComponent);

// history 不用在mapStateToProps中
const mapStateToProps = state => {
	let { userInfo } = state;
	return {
		userInfo
	};
}

export default connect(mapStateToProps)(WrappedRegisterForm);
