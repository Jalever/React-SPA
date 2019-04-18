import React,{ useEffect, useState } from "react";
import { connect } from "react-redux";
import DOC from "./DocumentManagement/DOC.jsx";

import {
	Tabs,
	Skeleton
} from "antd";

const TabPane = Tabs.TabPane;

import "antd/dist/antd.css";

import {
	MANAGEMENT_PROGRESS,
	MANAGEMENT_DOC,
	MANAGEMENT_SPACE_TREE
} from "./../../constants/common.js";

import "./style.scss";

const BOSComponent = ({ directoryTreeReducers, directoryTreeState }) => {
	//数据没返回之前，skeleton遮罩
	let [showSkeleton, setShowSkeleton] = useState(true);

	useEffect(() => {
		console.log("directoryTreeState");
		console.log(directoryTreeState);
	});

	return(
		<div
			className="content"
			style={{ backgroundColor: "#fff" }}
		>
			<Tabs
				style={{ width:"100%" }}
			>
				{
					<TabPane
						tab={ MANAGEMENT_DOC }
						key = { MANAGEMENT_DOC }
					>
						{
							<DOC />
						}

					</TabPane>
				}

				{
					<TabPane
						tab={ MANAGEMENT_SPACE_TREE }
						key = { MANAGEMENT_SPACE_TREE }
					>
						{
							"Content of Tab Pane 2"
						}
					</TabPane>
				}

				{
					<TabPane
						tab={ MANAGEMENT_PROGRESS }
						key = { MANAGEMENT_PROGRESS }
					>
						{
							"Content of Tab Pane 3"
						}
					</TabPane>
				}
			</Tabs>
		</div>
	);
};

const mapStateToProps = state => {
	let { directoryTreeReducers, directoryTreeState } = state;
	return {
		directoryTreeReducers,
		directoryTreeState
	};
};

export default connect(
	mapStateToProps
)(BOSComponent);
