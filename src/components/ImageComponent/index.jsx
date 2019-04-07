import React from "react";

import {
	Table
} from "antd";

import "./style.scss";

class ImageComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.handleResponseImage = this.handleResponseImage.bind(this);
	}

	componentDidMount() {
		let responsePromise = this.handleResponseImage();
		responsePromise.then((res) => {
			// console.log("res");
			// console.log(res);

			this.setState({
				data: res
			});
		});
	}

	handleResponseImage() {
		return new Promise( (resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open("GET", "http://47.106.132.253:8081/api/images", true);
			xhr.send();

			xhr.onreadystatechange = () => {
				if(xhr.readyState === 4) {
					if(xhr.status === 200) {
						let res = JSON.parse(xhr.responseText);
						resolve(res);
					} else {
						reject("Failured Message!");
					}
				}
			};
		} );
	}


	render() {
		let img = this.state.data;

		return (
			<React.Fragment>
				<img 
					src={img} 
					className="customImage"
				/>
			</React.Fragment>
		);
	}
}

export default ImageComponent;