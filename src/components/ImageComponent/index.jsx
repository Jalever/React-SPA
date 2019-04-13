import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
	Table,
	Carousel,
	Button,
	Icon,
	Spin,
	List,
	Avatar,
	Card,
	Upload
} from "antd";
const { Meta } = Card;

import "./style.scss";

import { GET_RANDOM_USER } from "./../../constants/common.js";
import API from "./../../utils/api.js";
import {
	determineItem
} from "./../../actions/index.jsx";

const ImageComponent = ({determineItem}) => {

	let [response, setResponse] = useState(null);

	// let getUser = () => {
	// 	let res = API.getRandomUser(null);
	// 	res.then(data => {
	// 		setResponse(data);
	// 	})
	// };



	useEffect( () => {
		let res = API.getRandomUser(null);
		res.then(data => {
			console.log("data.results");
			console.log(data.results);
			setResponse(data.results);
		})
	}, [] );

	let getMoreUserData = () => {
		let res = API.getRandomUser(null);
		res.then(data => {
			setResponse(response.concat(data.results));
		});
	};

	// let handleDetermineItem = item => {
	// 	determineItem(item);
	// };

	// console.log("response");
	// console.log(response);

	let loadMore = (
		<div
			className="loadMoreItem"
			onClick={getMoreUserData}
		>
			{ <Icon type="plus" /> }
		</div>
	);

	let listItem = item => {
		return <List.Item>
			<Card
				actions={ [
					<Icon type="setting" />,
					<Link to={`/home/images/:${item.id.value}`}>
						<Icon 
							type="edit"
							onClick={() => determineItem(item)}
						/>
					</Link>,
					<Icon type="ellipsis" />
				] }
			>
				{
					<Meta 
						avatar={
							<Avatar 
								src={item.picture.medium}
							/>
						}
						title={ item.login.username }
					/>
				}

				{
					item.email
				}
			</Card>
		</List.Item>
	};

	let tableHead = [{
		title: "",
		dataIndex: "",
		key: ""
	}];

	return(
		<React.Fragment>
			{
				(response === null) && <Spin 
					tip="Loading..."
					className="spin"
				/>
			}

			{
				(response !== null) && 
				<List 
				    grid={{ gutter: 4, column: 4 }}
					dataSource={ response }
					renderItem={
						item => listItem(item)
					}
					loadMore={loadMore}
					className="listStyle"
				/>
			}
		</React.Fragment>
	);
};


const mapStateToProps = state => {
	let { determineItem } = state;
	console.log("determineItem");
	console.log(determineItem);
	return {
		determineItem
	};
};

export default connect(null, {
	determineItem
})(ImageComponent);