import React from "react";
import { connect } from "react-redux";

import {
	Row,
	Form,
	Input,
	Spin,
	Avatar,
	Col
} from "antd";

import "./style.scss";

const ProfileComponent = ({ determineItem, form }) => {

	console.log("determineItem");
	console.log(determineItem);

	let { getFieldDecorator } = form;

	let formItemLayout = {
      labelCol: {
        xs: { span: 5	 },
        sm: { span: 5	 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

	return(
		<React.Fragment>
			<Form
				className="formStyle"
				{...formItemLayout}
			>
				{
					<Avatar 
						style={{ width:"10vw",height:"10vw" }}
						src={determineItem.picture.medium}
					/>
				}

				{
					<Form.Item
						label={`Date`}
					>
						{
						 	getFieldDecorator('date', {
						 		rules: [{
						 			required: false,
						 			message: "Input Something"
						 		}]
						 	})(
						 		<Input 
						 			className="customInput"
						 			disabled
						 			placeholder={`${determineItem.dob.date}`}
						 		/>
						 	)
					      
						}
					</Form.Item>
				}
				{
					<Form.Item
						label={`Age`}
					>
						{
						 	getFieldDecorator('age', {
						 		rules: [{
						 			required: false,
						 			message: "Input Something"
						 		}]
						 	})(
						 		<Input 
						 			className="customInput"
						 			disabled
						 			placeholder={`${determineItem.dob.age}`}
						 		/>
						 	)
					      
						}
					</Form.Item>
				}
				{
					<Form.Item
						label={`Email`}
					>
						{
						 	getFieldDecorator('email', {
						 		rules: [{
						 			required: false,
						 			message: "Input Something"
						 		}]
						 	})(
						 		<Input 
						 			className="customInput"
						 			disabled
						 			placeholder={`${determineItem.email}`}
						 		/>
						 	)
					      
						}
					</Form.Item>
				}
			</Form>
		</React.Fragment>
	);
};

const WrappedProfileComponent = Form.create({
	name: "profile_component"
})(ProfileComponent);

const mapStateToProps = state => {
	let { determineItem } = state;
	return {
		determineItem
	};
};

export default connect(
	mapStateToProps
)(WrappedProfileComponent);