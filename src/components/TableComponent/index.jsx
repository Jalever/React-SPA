import React from "react";
import { connect } from "react-redux";

import {
	Table,
	Spin
} from "antd";
import "antd/dist/antd.css";

import API from "./../../utils/api.js";

import "./style.scss";

class TableComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		};
		this.handleResponseData = this.handleResponseData.bind(this);
	}

	componentDidMount() {
		// let responsePromise = this.handleResponseData();
		// responsePromise.then((res) => {

		// 	this.setState({
		// 		data: res
		// 	});
		// });

		let resData = API.requestTabeData();
		resData.then( res => {

			this.setState({
				data: res.userInfo
			});
		} );


		console.log("this.props.userInfo");
		console.log(this.props.userInfo);
	}

	handleResponseData() {
		// return new Promise( (resolve, reject) => {
		// 	let xhr = new XMLHttpRequest();
		// 	xhr.open("GET", "http://47.106.132.253:8081/api/data", true);
		// 	xhr.send();

		// 	xhr.onreadystatechange = () => {
		// 		if(xhr.readyState === 4) {
		// 			if(xhr.status === 200) {
		// 				console.dir("xhr: ")
		// 				console.dir(xhr)
		// 				let res = JSON.parse(xhr.responseText);
		// 				resolve(res.userInfo);
		// 			} else {
		// 				reject("Failured Message!");
		// 			}
		// 		}
		// 	};
		// } );
	}


	render() {
		let data = this.state.data;
		let isShowLoading = data === null ? true : false;
		let tableHead = [];

		if(data !== null) {
			let oneofdata = data[0];
			for(let i in oneofdata) {
				tableHead.push({
					title: i,
					dataIndex: i,
					key: i,
					align: "center"
				});
			}
		}

		return (
			<React.Fragment>
				{/**
					(!isShowLoading) && <table
						className="customeTable"
					>
						<thead>
							<tr>
								<td>ID</td>
								<td>Name</td>
								<td>Province</td>
								<td>Phone</td>
								<td>Birth</td>
							</tr>
						</thead>
						<tbody>
							{
								data.map((curValue, index) => (
									<tr
										key={index}
									>
										<td>{ curValue.id }</td>
										<td>{ curValue.name }</td>
										<td>{ curValue.province }</td>
										<td>{ curValue.phone }</td>
										<td>{ curValue.birth }</td>
									</tr>
								)
								)
							}
						</tbody>
					</table>
				**/}

				{
					(!isShowLoading) && <Table 
						className="tableStyle"
						rowKey={ record => record.id }
						bordered
						columns={ tableHead }
						dataSource={ data }
						
					/>
				}

				{
					(isShowLoading) && <Spin 
						size="large"
						tip="Loading..." 
						className="spining"
					/>
				}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	let { userInfo } = state;
	return { userInfo };
};

export default connect(mapStateToProps)(TableComponent);