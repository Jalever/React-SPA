import React,{ useEffect } from "react";

import { connect } from "react-redux";

import {
	Upload,
	Button,
	Row,
	Col,
	Input,
	Form,
	Icon
} from "antd";

const { TextArea } = Input;

import Cookies from "js-cookie";


import API from "./../../utils/api.js";
import {
	CLICK_TO_UPLOAD,
	ACCESS_TOKEN,
	APP_KEY_LABEL,
	INPUT_PHONE_NUM,
	APP_KEY,
	INPUT_EMAIL,
	MODEL_DB,
	USER_EMAIL
} from "./../../constants/common.js";

import "./style.scss";

const UserInfoComponent = ({ userInfo }) => {

	let uploadRefs = React.createRef();

	let userInfoParse = JSON.parse(Cookies.get("userInfo"));

	useEffect(() => {
		// console.log("userInfo");
		// console.log(userInfo);
	});

	let handleUploadFile = e => {

	};

	let handleVanillaUpload = e => {
		// console.log("e");
		// console.log(e);

		// console.log("this.uploadRefs.current");
		// console.log(uploadRefs.current.files[0]);
	}


	let listTitle = [
		{
			title: "Access_Token"
		},{
			title: "modelDb"
		},{
			title: "User Email"
		}
	];

	let formItemLayout = {
		labelCol: {
			xs: {
				span: 24
			},
			sm: {
				span: 8
			}
		},
		wrapperCol: {
			xs: {
				span: 24
			},
			sm: {
				span: 16
			}
		}
	};

	return(
		<React.Fragment>
			<Row>
				<Col
					span={ 24 }
				>

				<Form
					{ ...formItemLayout }
				>
					{
						<Form.Item
							label={ ACCESS_TOKEN }
						>
							<TextArea
								autosize
								value={ userInfoParse.access_token }
								className="access_token_input"
							/>
						</Form.Item>
					}

				{/* appKey */}
				{
					<Form.Item
						label={ APP_KEY_LABEL }
					>
						<Input
							value={ APP_KEY }
						/>
					</Form.Item>
				}

				{/* Model DB */}
				{
					<Form.Item
						label={ MODEL_DB }
					>
						<Input
							value={ userInfoParse.modelDb[0] }
						/>
					</Form.Item>
				}

				{/* Email */}
				{
					<Form.Item
						label={ INPUT_EMAIL }
					>
						<Input
							value={ userInfoParse.user.email }
						/>
					</Form.Item>
				}

				{/* Telephone */}
				{
						<Form.Item
							label={ INPUT_PHONE_NUM }
						>
							<Input
								value={ userInfoParse.user.telephone }
							/>
						</Form.Item>
				}

				</Form>
				</Col>
			</Row>


		</React.Fragment>
	);
};

const mapStateToProps = state => {
	let { userInfo } = state;
	return {userInfo};
};

export default connect(mapStateToProps)(UserInfoComponent);
