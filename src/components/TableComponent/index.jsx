import React from "react";

import {
	Table
} from "antd";

import "./style.scss";

class TableComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.handleResponseData = this.handleResponseData.bind(this);
	}

	componentDidMount() {
		let responsePromise = this.handleResponseData();
		responsePromise.then((res) => {
			console.log("res");
			console.log(res);

			this.setState({
				data: res
			});
		});
	}

	handleResponseData() {
		return new Promise( (resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open("GET", "http://47.106.132.253:8081/api/data", true);
			xhr.send();

			xhr.onreadystatechange = () => {
				if(xhr.readyState === 4) {
					if(xhr.status === 200) {
						let res = JSON.parse(xhr.responseText);
						resolve(res.userInfo);
					} else {
						reject("Failured Message!");
					}
				}
			};
		} );
	}


	render() {
		let data = this.state.data;

		return (
			<React.Fragment>
				<table
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
			</React.Fragment>
		);
	}
}

export default TableComponent;