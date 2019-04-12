import React,{ useEffect } from "react";

import { connect } from "react-redux";


const UserInfoComponent = ({ userInfo }) => {

	useEffect(() => {
		console.log("userInfo");
		console.log(userInfo);
	});

	return(
		<h1>User Info Component</h1>
	);
};

const mapStateToProps = state => {
	let { userInfo } = state;
	return {userInfo};
};

export default connect(mapStateToProps)(UserInfoComponent);

